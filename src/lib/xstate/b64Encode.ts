/* eslint-disable @typescript-eslint/no-unused-vars */
import { b64Encode } from '$lib/base64';
import {
	defaultBase64ByteMap,
	defaultEncoderInput,
	defaultEncoderInputChunk,
	defaultEncoderOutput,
	defaultHexByteMap,
	defaultOutputChunk
} from '$lib/constants';
import { validateEncoderInput } from '$lib/dataPrep';
import type {
	Base64ByteMap,
	Base64Encoding,
	EncoderInput,
	EncoderInputChunk,
	EncoderOutput,
	HexByteMap,
	OutputChunk,
	StringEncoding
} from '$lib/types';
import { assign, createMachine } from 'xstate';

export interface EncodingContext {
	autoplay: boolean;
	skipDemo: boolean;
	byteMaps: HexByteMap[];
	byteIndex: number;
	updatedByteMaps: HexByteMap[];
	currentByte: HexByteMap;
	remainingBytes: number;
	updatedInputChunks: EncoderInputChunk[];
	inputChunkIndex: number;
	currentInputChunk: EncoderInputChunk;
	remainingInputChunks: number;
	updatedOutputChunks: OutputChunk[];
	outputChunkIndex: number;
	currentOutputChunk: OutputChunk;
	remainingOutputChunks: number;
	base64Maps: Base64ByteMap[];
	updatedBase64Maps: Base64ByteMap[];
	base64CharIndex: number;
	currentBase64Char: Base64ByteMap;
	remainingBase64Chars: number;
	input: EncoderInput;
	output: EncoderOutput;
}

export type EncodingEvent =
	| { type: 'RESET' }
	| { type: 'UPDATE_TEXT'; inputText: string; inputEncoding: StringEncoding; outputEncoding: Base64Encoding }
	| { type: 'VALIDATE_TEXT'; inputText: string; inputEncoding: StringEncoding; outputEncoding: Base64Encoding }
	| { type: 'START_AUTOPLAY'; inputText: string; inputEncoding: StringEncoding; outputEncoding: Base64Encoding }
	| { type: 'SKIP_DEMO'; inputText: string; inputEncoding: StringEncoding; outputEncoding: Base64Encoding }
	| { type: 'GO_TO_FIRST_STEP' }
	| { type: 'GO_TO_PREV_STEP' }
	| { type: 'GO_TO_NEXT_STEP' }
	| { type: 'GO_TO_LAST_STEP' }
	| { type: 'RESUME_AUTO_PLAY' }
	| { type: 'STOP_AUTO_PLAY' };

export type EncodingTypeState = {
	value: 'inactive' | 'validateInputText' | {
		validateInputText: 'validate'
	} | {
		validateInputText: 'error'
	} | {
		validateInputText: 'success'
	} | {
		validateInputText: 'validationComplete'
	} | 'encodeInput' | {
		encodeInput: 'idle'
	} | {
		encodeInput: 'autoPlayEncodeByte'
	} | {
		encodeInput: 'encodeByte'
	} | {
		encodeInput: 'explainByteMapping'
	} | {
		encodeInput: 'encodingComplete'
	} | 'createInputChunks' | {
		createInputChunks: 'idle'
	} | {
		createInputChunks: 'autoPlayIdle'
	} | {
		createInputChunks: 'autoPlayCreateInputChunk'
	} | {
		createInputChunks: 'createInputChunk'
	} | {
		createInputChunks: 'explainLastPaddedChunk'
	} | {
		createInputChunks: 'explainPadCharacter'
	} | {
		createInputChunks: 'createLastPaddedChunk'
	} | {
		createInputChunks: 'createdAllInputChunks'
	} | 'createOutputChunks' | {
		createOutputChunks: 'idle'
	} | {
		createOutputChunks: 'autoPlayCreateOutputChunk'
	} | {
		createOutputChunks: 'createOutputChunk'
	} | {
		createOutputChunks: 'createdAllOutputChunks'
	} | 'encodeOutput' | {
		encodeOutput: 'idle'
	} | {
		encodeOutput: 'autoPlayEncodeBase64'
	} | {
		encodeOutput: 'encodeBase64'
	} | {
		encodeOutput: 'encodingComplete'
	} | 'finished';
	context: EncodingContext
}

export const encodingMachine = createMachine<EncodingContext, EncodingEvent, EncodingTypeState>(
	{
		id: 'b64Encode',
		schema: {
			context: {} as EncodingContext,
			events: {} as EncodingEvent,
		},
		initial: 'inactive',
		context: {
			autoplay: false,
			skipDemo: false,
			byteMaps: [defaultHexByteMap],
			byteIndex: 0,
			currentByte: defaultHexByteMap,
			updatedByteMaps: [],
			remainingBytes: 0,
			updatedInputChunks: [],
			inputChunkIndex: 0,
			currentInputChunk: defaultEncoderInputChunk,
			remainingInputChunks: 0,
			updatedOutputChunks: [],
			outputChunkIndex: 0,
			currentOutputChunk: defaultOutputChunk,
			remainingOutputChunks: 0,
			base64Maps: [defaultBase64ByteMap],
			updatedBase64Maps: [],
			base64CharIndex: 0,
			currentBase64Char: defaultBase64ByteMap,
			remainingBase64Chars: 0,
			input: defaultEncoderInput,
			output: defaultEncoderOutput,
		},
		states: {
			inactive: {
				entry: ['stopAutoPlay', 'resetContext'],
				id: 'inactive',
				on: {
					START_AUTOPLAY: {
						target: 'validateInputText',
						actions: 'startAutoPlay',
					},
					VALIDATE_TEXT: { target: 'validateInputText' },
					UPDATE_TEXT: { actions: 'validate' },
					SKIP_DEMO: { target: 'validateInputText', actions: 'setFlagSkipDemo' },
					RESET: { target: 'inactive', actions: 'resetInput' },
				},
			},
			validateInputText: {
				initial: 'validate',
				id: 'validateInputText',
				states: {
					validate: {
						entry: ['validate'],
						always: [
							{ target: 'error', cond: 'inputTextIsInvalid' },
							{ target: 'success', actions: ['encode', 'generateBase64Maps', 'generateByteMaps'] },
						],
					},
					error: {
						after: {
							1000: { target: '#inactive' },
						},
					},
					success: {
						id: 'success',
						after: {
							1000: { target: 'validationComplete', cond: 'autoPlayEnabled' },
						},
						on: {
							RESUME_AUTO_PLAY: {
								target: 'validationComplete',
								actions: 'startAutoPlay',
								cond: 'autoPlayDisabled',
							},
							RESET: { target: '#inactive', actions: 'resetInput', cond: 'autoPlayDisabled' },
							GO_TO_FIRST_STEP: { target: '#inactive', cond: 'autoPlayDisabled' },
							GO_TO_PREV_STEP: { target: '#inactive', cond: 'autoPlayDisabled' },
							GO_TO_NEXT_STEP: { target: 'validationComplete', cond: 'autoPlayDisabled' },
							GO_TO_LAST_STEP: { target: 'validationComplete', actions: 'setFlagSkipDemo', cond: 'autoPlayDisabled' },
						},
					},
					validationComplete: { type: 'final' },
				},
				onDone: [
					{ target: 'finished', cond: 'yesSkipDemo' },
					{ target: 'encodeInput' }
				]
			},
			encodeInput: {
				initial: 'idle',
				id: 'encodeInput',
				states: {
					idle: {
						entry: ['resetRemainingBytes'],
						after: {
							1000: { target: 'autoPlayEncodeByte', cond: 'autoPlayEnabled' },
						},
						on: {
							RESUME_AUTO_PLAY: {
								target: 'autoPlayEncodeByte',
								actions: 'startAutoPlay',
								cond: 'autoPlayDisabled',
							},
							STOP_AUTO_PLAY: { actions: 'stopAutoPlay', cond: 'autoPlayEnabled' },
							RESET: { target: '#inactive', actions: 'resetInput', cond: 'autoPlayDisabled' },
							GO_TO_FIRST_STEP: { target: '#inactive', cond: 'autoPlayDisabled' },
							GO_TO_PREV_STEP: { target: '#validateInputText.success', cond: 'autoPlayDisabled' },
							GO_TO_NEXT_STEP: { target: 'encodeByte', cond: 'autoPlayDisabled' },
							GO_TO_LAST_STEP: { target: 'encodingComplete', actions: 'setFlagSkipDemo', cond: 'autoPlayDisabled' },
						},
					},
					autoPlayEncodeByte: {
						entry: ['getCurrentByte'],
						after: {
						1000: [
								{
									target: 'autoPlayEncodeByte',
									actions: 'mapNextByte',
									cond: 'bytesRemaining',
								},
								{ target: 'explainByteMapping', cond: 'noBytesRemaining' },
							],
						},
						on: { STOP_AUTO_PLAY: { target: 'encodeByte', actions: 'stopAutoPlay', cond: 'autoPlayEnabled' } },
					},
					encodeByte: {
						entry: ['getCurrentByte'],
						on: {
							RESUME_AUTO_PLAY: {
								target: 'autoPlayEncodeByte',
								actions: 'startAutoPlay',
								cond: 'autoPlayDisabled',
							},
							RESET: { target: '#inactive', actions: 'resetInput', cond: 'autoPlayDisabled' },
							GO_TO_FIRST_STEP: { target: '#inactive', cond: 'autoPlayDisabled' },
							GO_TO_PREV_STEP: [
								{ target: 'encodeByte', actions: 'mapPreviousByte', cond: 'hasPreviousByte' },
								{ target: 'idle', cond: 'allBytesRemaining' },
							],
							GO_TO_NEXT_STEP: [
								{ target: 'encodeByte', actions: 'mapNextByte', cond: 'bytesRemaining' },
								{ target: 'explainByteMapping', cond: 'noBytesRemaining' },
							],
							GO_TO_LAST_STEP: { target: 'encodingComplete', actions: 'setFlagSkipDemo', cond: 'autoPlayDisabled' },
						},
					},
					explainByteMapping: {
						after: {
							1000: { target: 'encodingComplete', cond: 'autoPlayEnabled' },
						},
						on: {
							RESUME_AUTO_PLAY: {
								target: 'encodingComplete',
								actions: 'startAutoPlay',
								cond: 'autoPlayDisabled',
							},
							RESET: { target: '#inactive', actions: 'resetInput', cond: 'autoPlayDisabled' },
							GO_TO_FIRST_STEP: { target: '#inactive', cond: 'autoPlayDisabled' },
							GO_TO_PREV_STEP: { target: 'encodeByte' },
							GO_TO_NEXT_STEP: { target: 'encodingComplete', cond: 'autoPlayDisabled' },
							GO_TO_LAST_STEP: { target: 'encodingComplete', actions: 'setFlagSkipDemo', cond: 'autoPlayDisabled' },
						},
					},
					encodingComplete: {
						type: 'final',
					},
				},
				onDone: [
					{ target: 'finished', cond: 'yesSkipDemo' },
					{ target: 'createInputChunks' }
				],
			},
			createInputChunks: {
				id: 'createInputChunks',
				initial: 'idle',
				states: {
					idle: {
						entry: ['resetRemainingInputChunks'],
						after: {
							100: { target: 'autoPlayIdle', cond: 'autoPlayEnabled' }
						},
						on: {
							RESUME_AUTO_PLAY: { target: 'autoPlayCreateInputChunk', actions: 'startAutoPlay' },
							RESET: { target: '#inactive', actions: 'resetInput' },
							GO_TO_FIRST_STEP: { target: '#inactive' },
							GO_TO_PREV_STEP: { target: '#encodeInput.explainByteMapping', actions: 'resetNoBytesRemaining' },
							GO_TO_NEXT_STEP: [
								{ target: 'explainLastPaddedChunk', cond: 'onlyOnePaddedChunk' },
								{ target: 'createInputChunk', cond: 'autoPlayDisabled' },
							],
							GO_TO_LAST_STEP: { target: 'createdAllInputChunks', actions: 'setFlagSkipDemo' },
						},
					},
					autoPlayIdle: {
						after: {
							1000: [
								{ target: 'explainLastPaddedChunk', cond: 'onlyOnePaddedChunk' },
								{ target: 'autoPlayCreateInputChunk' }
							],
						},
						on: {
							STOP_AUTO_PLAY: [
								{ target: 'explainLastPaddedChunk', cond: 'onlyOnePaddedChunk' },
								{ target: 'createInputChunk' },
							],
						}
					},
					autoPlayCreateInputChunk: {
						entry: ['getCurrentInputChunk'],
						after: {
							1000: [
								{
									target: 'autoPlayCreateInputChunk',
									actions: 'mapNextInputChunk',
									cond: 'inputChunksRemaining',
								},
								{ target: 'explainLastPaddedChunk', actions: 'mapNextInputChunk', cond: 'finalPaddedChunkRemaining' },
								{ target: 'createdAllInputChunks', cond: 'noInputChunksRemaining' },
							],
						},
						on: { STOP_AUTO_PLAY: { target: 'createInputChunk', actions: 'stopAutoPlay', cond: 'autoPlayEnabled' } },
					},
					createInputChunk: {
						entry: ['getCurrentInputChunk'],
						on: {
							RESUME_AUTO_PLAY: {
								target: 'autoPlayCreateInputChunk',
								actions: 'startAutoPlay',
								cond: 'autoPlayDisabled',
							},
							RESET: { target: '#inactive', actions: 'resetInput', cond: 'autoPlayDisabled' },
							GO_TO_FIRST_STEP: { target: '#inactive', cond: 'autoPlayDisabled' },
							GO_TO_PREV_STEP: [
								{ target: 'createInputChunk', actions: 'mapPreviousInputChunk', cond: 'hasPreviousInputChunk' },
								{ target: 'idle', cond: 'allInputChunksRemaining' },
							],
							GO_TO_NEXT_STEP: [
								{ target: 'createInputChunk', actions: 'mapNextInputChunk', cond: 'inputChunksRemaining' },
								{ target: 'explainLastPaddedChunk', actions: 'mapNextInputChunk', cond: 'finalPaddedChunkRemaining' },
								{ target: 'createdAllInputChunks', cond: 'noInputChunksRemaining' },
							],
							GO_TO_LAST_STEP: { target: 'createdAllInputChunks', actions: 'setFlagSkipDemo', cond: 'autoPlayDisabled' },
						},
					},
					explainLastPaddedChunk: {
						entry: ['getCurrentInputChunk'],
						after: {
							1000: { target: 'explainPadCharacter', cond: 'autoPlayEnabled' },
						},
						on: {
							RESUME_AUTO_PLAY: {
								target: 'explainPadCharacter',
								actions: 'startAutoPlay',
								cond: 'autoPlayDisabled',
							},
							RESET: { target: '#inactive', actions: 'resetInput', cond: 'autoPlayDisabled' },
							GO_TO_FIRST_STEP: { target: '#inactive', cond: 'autoPlayDisabled' },
							GO_TO_PREV_STEP: [
								{ target: 'createInputChunk', actions: 'mapPreviousInputChunk', cond: 'hasPreviousInputChunk' },
								{ target: 'idle', cond: 'allInputChunksRemaining' },
							],
							GO_TO_NEXT_STEP: { target: 'explainPadCharacter', cond: 'autoPlayDisabled' },
							GO_TO_LAST_STEP: { target: 'createdAllInputChunks', actions: 'setFlagSkipDemo', cond: 'autoPlayDisabled' },
						},
					},
					explainPadCharacter: {
						after: {
							1000: { target: 'createLastPaddedChunk', cond: 'autoPlayEnabled' },
						},
						on: {
							RESUME_AUTO_PLAY: {
								target: 'createLastPaddedChunk',
								actions: 'startAutoPlay',
								cond: 'autoPlayDisabled',
							},
							RESET: { target: '#inactive', actions: 'resetInput', cond: 'autoPlayDisabled' },
							GO_TO_FIRST_STEP: { target: '#inactive', cond: 'autoPlayDisabled' },
							GO_TO_PREV_STEP: { target: 'explainLastPaddedChunk' },
							GO_TO_NEXT_STEP: { target: 'createLastPaddedChunk', cond: 'autoPlayDisabled' },
							GO_TO_LAST_STEP: { target: 'createdAllInputChunks', actions: 'setFlagSkipDemo', cond: 'autoPlayDisabled' },
						},
					},
					createLastPaddedChunk: {
						after: {
							1000: { target: 'createdAllInputChunks', actions: 'mapNextInputChunk', cond: 'autoPlayEnabled' },
						},
						on: {
							RESUME_AUTO_PLAY: {
								target: 'createdAllInputChunks',
								actions: 'startAutoPlay',
								cond: 'autoPlayDisabled',
							},
							STOP_AUTO_PLAY: { actions: 'stopAutoPlay', cond: 'autoPlayEnabled' },
							RESET: { target: '#inactive', actions: 'resetInput', cond: 'autoPlayDisabled' },
							GO_TO_FIRST_STEP: { target: '#inactive', cond: 'autoPlayDisabled' },
							GO_TO_PREV_STEP: [
								{ target: 'explainPadCharacter', cond: 'lastChunkIsPadded' },
								{ target: 'idle', cond: 'allInputChunksRemaining' },
							],
							GO_TO_NEXT_STEP: { target: 'createdAllInputChunks', cond: 'autoPlayDisabled' },
							GO_TO_LAST_STEP: { target: 'createdAllInputChunks', actions: 'setFlagSkipDemo', cond: 'autoPlayDisabled' },
						},
					},
					createdAllInputChunks: {
						type: 'final',
					},
				},
				onDone: [
					{ target: 'finished', cond: 'yesSkipDemo' },
					{ target: 'createOutputChunks' }
				],
			},

			createOutputChunks: {
				id: 'createOutputChunks',
				initial: 'idle',
				states: {
					idle: {
						entry: ['resetRemainingOutputChunks'],
						after: {
							1000: { target: 'autoPlayCreateOutputChunk', cond: 'autoPlayEnabled' },
						},
						on: {
							RESUME_AUTO_PLAY: {
								target: 'autoPlayCreateOutputChunk',
								actions: 'startAutoPlay',
								cond: 'autoPlayDisabled',
							},
							STOP_AUTO_PLAY: { actions: 'stopAutoPlay', cond: 'autoPlayEnabled' },
							RESET: { target: '#inactive', actions: 'resetInput', cond: 'autoPlayDisabled' },
							GO_TO_FIRST_STEP: { target: '#inactive', cond: 'autoPlayDisabled' },
							GO_TO_PREV_STEP: [
								{
									target: '#createInputChunks.createLastPaddedChunk',
									actions: 'resetNoInputChunksRemaining',
									cond: 'currentChunkIsPadded',
								},
								{
									target: '#createInputChunks.createInputChunk',
									actions: 'resetNoInputChunksRemaining',
									cond: 'autoPlayDisabled',
								},
							],
							GO_TO_NEXT_STEP: { target: 'createOutputChunk', cond: 'autoPlayDisabled' },
							GO_TO_LAST_STEP: { target: 'createdAllOutputChunks', actions: 'setFlagSkipDemo', cond: 'autoPlayDisabled' },
						},
					},
					autoPlayCreateOutputChunk: {
						entry: ['getCurrentOutputChunk'],
						after: {
							1000: [
								{
									target: 'autoPlayCreateOutputChunk',
									actions: 'mapNextOutputChunk',
									cond: 'outputChunksRemaining',
								},
								{ target: 'createdAllOutputChunks', cond: 'noOutputChunksRemaining' },
							],
						},
						on: { STOP_AUTO_PLAY: { target: 'createOutputChunk', actions: 'stopAutoPlay', cond: 'autoPlayEnabled' } },
					},
					createOutputChunk: {
						entry: ['getCurrentOutputChunk'],
						on: {
							RESUME_AUTO_PLAY: {
								target: 'autoPlayCreateOutputChunk',
								actions: 'startAutoPlay',
								cond: 'autoPlayDisabled',
							},
							RESET: { target: '#inactive', actions: 'resetInput', cond: 'autoPlayDisabled' },
							GO_TO_FIRST_STEP: { target: '#inactive', cond: 'autoPlayDisabled' },
							GO_TO_PREV_STEP: [
								{ target: 'createOutputChunk', actions: 'mapPreviousOutputChunk', cond: 'hasPreviousOutputChunk' },
								{ target: 'idle', cond: 'allOutputChunksRemaining' },
							],
							GO_TO_NEXT_STEP: [
								{ target: 'createOutputChunk', actions: 'mapNextOutputChunk', cond: 'outputChunksRemaining' },
								{ target: 'createdAllOutputChunks', cond: 'noOutputChunksRemaining' },
							],
							GO_TO_LAST_STEP: { target: 'createdAllOutputChunks', actions: 'setFlagSkipDemo', cond: 'autoPlayDisabled' },
						},
					},
					createdAllOutputChunks: {
						type: 'final',
					},
				},
				onDone: [
					{ target: 'finished', cond: 'yesSkipDemo' },
					{ target: 'encodeOutput' }
				],
			},
			encodeOutput: {
				initial: 'idle',
				states: {
					idle: {
						entry: ['resetRemainingBase64Chars'],
						after: {
							1000: { target: 'autoPlayEncodeBase64', cond: 'autoPlayEnabled' },
						},
						on: {
							RESUME_AUTO_PLAY: {
								target: 'autoPlayEncodeBase64',
								actions: 'startAutoPlay',
								cond: 'autoPlayDisabled',
							},
							STOP_AUTO_PLAY: { actions: 'stopAutoPlay', cond: 'autoPlayEnabled' },
							RESET: { target: '#inactive', actions: 'resetInput', cond: 'autoPlayDisabled' },
							GO_TO_FIRST_STEP: { target: '#inactive', cond: 'autoPlayDisabled' },
							GO_TO_PREV_STEP: {
								target: '#createOutputChunks.createOutputChunk',
								actions: 'resetNoOutputChunksRemaining',
								cond: 'autoPlayDisabled',
							},
							GO_TO_NEXT_STEP: { target: 'encodeBase64', cond: 'autoPlayDisabled' },
							GO_TO_LAST_STEP: { target: 'encodingComplete', actions: 'setFlagSkipDemo', cond: 'autoPlayDisabled' },
						},
					},
					autoPlayEncodeBase64: {
						entry: ['getCurrentBase64Char'],
						after: {
							1000: [
								{
									target: 'autoPlayEncodeBase64',
									actions: 'mapNextBase64Char',
									cond: 'base64CharsRemaining',
								},
								{ target: 'encodingComplete', cond: 'noBase64CharsRemaining' },
							],
						},
						on: { STOP_AUTO_PLAY: { target: 'encodeBase64', actions: 'stopAutoPlay', cond: 'autoPlayEnabled' } },
					},
					encodeBase64: {
						entry: ['getCurrentBase64Char'],
						on: {
							RESUME_AUTO_PLAY: {
								target: 'autoPlayEncodeBase64',
								actions: 'startAutoPlay',
								cond: 'autoPlayDisabled',
							},
							RESET: { target: '#inactive', actions: 'resetInput', cond: 'autoPlayDisabled' },
							GO_TO_FIRST_STEP: { target: '#inactive', cond: 'autoPlayDisabled' },
							GO_TO_PREV_STEP: [
								{ target: 'encodeBase64', actions: 'mapPreviousBase64Char', cond: 'hasPreviousBase64Char' },
								{ target: 'idle', cond: 'allBase64CharsRemaining' },
							],
							GO_TO_NEXT_STEP: [
								{ target: 'encodeBase64', actions: 'mapNextBase64Char', cond: 'base64CharsRemaining' },
								{ target: 'encodingComplete', cond: 'noBase64CharsRemaining' },
							],
							GO_TO_LAST_STEP: { target: 'encodingComplete', actions: 'setFlagSkipDemo', cond: 'autoPlayDisabled' },
						},
					},
					encodingComplete: {
						type: 'final',
					},
				},
				onDone: 'finished',
			},
			finished: {
				id: 'finished',
				entry: ['stopAutoPlay', 'updateContextForLastStep'],
				on: {
					RESET: { target: 'inactive', actions: 'resetInput', cond: 'autoPlayDisabled' },
					GO_TO_FIRST_STEP: { target: 'inactive', cond: 'autoPlayDisabled' },
					GO_TO_PREV_STEP: {
						target: 'encodeOutput.encodeBase64',
						actions: 'resetNoBase64CharsRemaining',
						cond: 'autoPlayDisabled',
					},
				},
			},
		},
	},
	{
		actions: {
			resetContext: assign({
				autoplay: (_: EncodingContext) => false,
				skipDemo: (_: EncodingContext) => false,
				byteMaps: (_: EncodingContext) => [defaultHexByteMap],
				updatedByteMaps: (_: EncodingContext) => [],
				byteIndex: (_: EncodingContext) => 0,
				currentByte: (_: EncodingContext) => defaultHexByteMap,
				remainingBytes: (_: EncodingContext) => 0,
				updatedInputChunks: (_: EncodingContext) => [],
				inputChunkIndex: (_: EncodingContext) => 0,
				currentInputChunk: (_: EncodingContext) => defaultEncoderInputChunk,
				remainingInputChunks: (_: EncodingContext) => 0,
				updatedOutputChunks: (_: EncodingContext) => [],
				outputChunkIndex: (_: EncodingContext) => 0,
				currentOutputChunk: (_: EncodingContext) => defaultOutputChunk,
				remainingOutputChunks: (_: EncodingContext) => 0,
				base64Maps: (_: EncodingContext) => [defaultBase64ByteMap],
				updatedBase64Maps: (_: EncodingContext) => [],
				base64CharIndex: (_: EncodingContext) => 0,
				currentBase64Char: (_: EncodingContext) => defaultBase64ByteMap,
				remainingBase64Chars: (_: EncodingContext) => 0,
				input: (context: EncodingContext) => context.input,
				output: (_: EncodingContext) => defaultEncoderOutput,
			}),
			resetInput: assign({ input: (_) => defaultEncoderInput }),
			startAutoPlay: assign({ autoplay: (_) => true }),
			stopAutoPlay: assign({ autoplay: (_) => false }),
			setFlagSkipDemo: assign({ skipDemo: (_) => true }),
			validate: assign({
				input: (_: EncodingContext, event: EncodingEvent) => {
					if (
						event.type === 'VALIDATE_TEXT' ||
						event.type === 'UPDATE_TEXT' ||
						event.type === 'START_AUTOPLAY' ||
						event.type === 'SKIP_DEMO'
					) {
						return validateEncoderInput(event.inputText, event.inputEncoding, event.outputEncoding);
					}
				},
			}),
			encode: assign({
				inputChunkIndex: (_: EncodingContext) => 0,
				remainingInputChunks: (context: EncodingContext) => context.input.totalChunks,
				output: (context: EncodingContext) => {
					if (context.input.validationResult.success) {
						return b64Encode(context.input);
					}
				},
			}),
			getCurrentByte: assign({
				currentByte: (context: EncodingContext) => context.byteMaps[context.byteIndex],
				updatedByteMaps: (context: EncodingContext) => context.byteMaps.slice(0, context.byteIndex + 1),
			}),
			generateByteMaps: assign({
				byteMaps: (context: EncodingContext) =>
					context.input.chunks.map((chunk) => chunk.inputMap.map((map) => map)).flat(),
				updatedByteMaps: (_: EncodingContext) => [],
			}),
			resetRemainingBytes: assign({
				byteIndex: (_: EncodingContext) => 0,
				updatedByteMaps: (_: EncodingContext) => [],
				currentByte: (_: EncodingContext) => defaultHexByteMap,
				remainingBytes: (context: EncodingContext) => context.byteMaps.length - 1,
			}),
			resetNoBytesRemaining: assign({
				byteIndex: (context: EncodingContext) => context.byteMaps.length - 1,
				remainingBytes: (_: EncodingContext) => 0,
			}),
			mapNextByte: assign({
				byteIndex: (context: EncodingContext) => context.byteIndex + 1,
				remainingBytes: (context: EncodingContext) => context.remainingBytes - 1,
			}),
			mapPreviousByte: assign({
				byteIndex: (context: EncodingContext) => context.byteIndex - 1,
				remainingBytes: (context: EncodingContext) => context.remainingBytes + 1,
			}),
			getCurrentInputChunk: assign({
				currentInputChunk: (context: EncodingContext) => context.input.chunks[context.inputChunkIndex],
				updatedInputChunks: (context: EncodingContext) => context.input.chunks.slice(0, context.inputChunkIndex + 1),
			}),
			resetRemainingInputChunks: assign({
				updatedInputChunks: (_: EncodingContext) => [],
				inputChunkIndex: (_: EncodingContext) => 0,
				currentInputChunk: (_: EncodingContext) => defaultEncoderInputChunk,
				remainingInputChunks: (context: EncodingContext) => context.input.totalChunks - 1,
			}),
			resetNoInputChunksRemaining: assign({
				inputChunkIndex: (context: EncodingContext) => context.input.totalChunks - 1,
				remainingInputChunks: (_: EncodingContext) => 0,
			}),
			mapNextInputChunk: assign({
				inputChunkIndex: (context: EncodingContext) => context.inputChunkIndex + 1,
				remainingInputChunks: (context: EncodingContext) => context.remainingInputChunks - 1,
			}),
			mapPreviousInputChunk: assign({
				inputChunkIndex: (context: EncodingContext) => context.inputChunkIndex - 1,
				remainingInputChunks: (context: EncodingContext) => context.remainingInputChunks + 1,
			}),
			getCurrentOutputChunk: assign({
				currentOutputChunk: (context: EncodingContext) => context.output.chunks[context.outputChunkIndex],
				updatedOutputChunks: (context: EncodingContext) => context.output.chunks.slice(0, context.outputChunkIndex + 1),
			}),
			resetRemainingOutputChunks: assign({
				updatedOutputChunks: (_: EncodingContext) => [],
				outputChunkIndex: (_: EncodingContext) => 0,
				currentOutputChunk: (_: EncodingContext) => defaultOutputChunk,
				remainingOutputChunks: (context: EncodingContext) => context.input.totalChunks - 1,
			}),
			resetNoOutputChunksRemaining: assign({
				outputChunkIndex: (context: EncodingContext) => context.input.totalChunks - 1,
				remainingOutputChunks: (_: EncodingContext) => 0,
			}),
			mapNextOutputChunk: assign({
				outputChunkIndex: (context: EncodingContext) => context.outputChunkIndex + 1,
				remainingOutputChunks: (context: EncodingContext) => context.remainingOutputChunks - 1,
			}),
			mapPreviousOutputChunk: assign({
				outputChunkIndex: (context: EncodingContext) => context.outputChunkIndex - 1,
				remainingOutputChunks: (context: EncodingContext) => context.remainingOutputChunks + 1,
			}),
			getCurrentBase64Char: assign({
				currentBase64Char: (context: EncodingContext) => context.base64Maps[context.base64CharIndex],
				updatedBase64Maps: (context: EncodingContext) => context.base64Maps.slice(0, context.base64CharIndex + 1),
			}),
			generateBase64Maps: assign({
				base64Maps: (context: EncodingContext) =>
					context.output.chunks.map((chunk) => chunk.base64Map.map((map) => map)).flat(),
				updatedBase64Maps: (_: EncodingContext) => [],
			}),
			resetRemainingBase64Chars: assign({
				base64CharIndex: (_: EncodingContext) => 0,
				updatedBase64Maps: (_: EncodingContext) => [],
				currentBase64Char: (_: EncodingContext) => defaultBase64ByteMap,
				remainingBase64Chars: (context: EncodingContext) => context.base64Maps.length - 1,
			}),
			resetNoBase64CharsRemaining: assign({
				base64CharIndex: (context: EncodingContext) => context.base64Maps.length - 1,
				remainingBase64Chars: (_: EncodingContext) => 0,
			}),
			mapNextBase64Char: assign({
				base64CharIndex: (context: EncodingContext) => context.base64CharIndex + 1,
				remainingBase64Chars: (context: EncodingContext) => context.remainingBase64Chars - 1,
			}),
			mapPreviousBase64Char: assign({
				base64CharIndex: (context: EncodingContext) => context.base64CharIndex - 1,
				remainingBase64Chars: (context: EncodingContext) => context.remainingBase64Chars + 1,
			}),
			updateContextForLastStep: assign({
				updatedByteMaps: (context: EncodingContext) => context.byteMaps.slice(0),
				updatedInputChunks: (context: EncodingContext) => context.input.chunks.slice(0),
				updatedOutputChunks: (context: EncodingContext) => context.output.chunks.slice(0),
				updatedBase64Maps: (context: EncodingContext) => context.base64Maps.slice(0),
				byteIndex: (context: EncodingContext) => context.byteMaps.length - 1,
				inputChunkIndex: (context: EncodingContext) => context.input.chunks.length - 1,
				outputChunkIndex: (context: EncodingContext) => context.output.chunks.length - 1,
				base64CharIndex: (context: EncodingContext) => context.base64Maps.length - 1,
				currentByte: (context: EncodingContext) => context.byteMaps[context.byteMaps.length - 1],
				currentInputChunk: (context: EncodingContext) => context.input.chunks[context.input.chunks.length - 1],
				currentOutputChunk: (context: EncodingContext) => context.output.chunks[context.output.chunks.length - 1],
				currentBase64Char: (context: EncodingContext) => context.base64Maps[context.base64Maps.length - 1],
				remainingInputChunks: (_: EncodingContext) => 0,
			})
		},
		guards: {
			autoPlayEnabled: (context: EncodingContext) => context.autoplay,
			autoPlayDisabled: (context: EncodingContext) => !context.autoplay,
			yesSkipDemo: (context: EncodingContext) => context.skipDemo,
			inputTextIsInvalid: (context: EncodingContext) => !context.input.validationResult.success,
			bytesRemaining: (context: EncodingContext) => context.remainingBytes > 0,
			noBytesRemaining: (context: EncodingContext) => context.remainingBytes === 0,
			allBytesRemaining: (context: EncodingContext) => context.remainingBytes + 1 === context.byteMaps.length,
			hasPreviousByte: (context: EncodingContext) => context.byteIndex > 0,
			inputChunksRemaining: (context: EncodingContext) => context.input.lastChunkPadded ? context.remainingInputChunks > 1 : context.remainingInputChunks > 0,
			lastChunkIsPadded: (context: EncodingContext) => context.input.lastChunkPadded,
			finalPaddedChunkRemaining: (context: EncodingContext) =>
				context.remainingInputChunks === 1 && context.input.lastChunkPadded || false,
			onlyOnePaddedChunk: (context: EncodingContext) => context.input.totalChunks === 1 && context.input.lastChunkPadded,
			noInputChunksRemaining: (context: EncodingContext) => context.remainingInputChunks === 0,
			allInputChunksRemaining: (context: EncodingContext) => context.remainingInputChunks + 1 === context.input.totalChunks,
			currentChunkIsPadded: (context: EncodingContext) => context.currentInputChunk.bytes.length !== 3,
			hasPreviousInputChunk: (context: EncodingContext) => context.inputChunkIndex > 0,
			outputChunksRemaining: (context: EncodingContext) => context.remainingOutputChunks > 0,
			noOutputChunksRemaining: (context: EncodingContext) => context.remainingOutputChunks === 0,
			allOutputChunksRemaining: (context: EncodingContext) => context.remainingOutputChunks + 1 === context.input.totalChunks,
			hasPreviousOutputChunk: (context: EncodingContext) => context.outputChunkIndex > 0,
			base64CharsRemaining: (context: EncodingContext) => context.remainingBase64Chars > 0,
			noBase64CharsRemaining: (context: EncodingContext) => context.remainingBase64Chars === 0,
			allBase64CharsRemaining: (context: EncodingContext) =>
				context.remainingBase64Chars + 1 === context.base64Maps.length,
			hasPreviousBase64Char: (context: EncodingContext) => context.base64CharIndex > 0,
		},
	},
);
