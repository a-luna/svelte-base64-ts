/* eslint-disable @typescript-eslint/no-unused-vars */
import { b64Encode } from '$lib/base64';
import {
	defaultBase64ByteMap,
	defaultEncoderInput,
	defaultEncoderOutput,
	defaultHexByteMap,
	defaultOutputChunk
} from '$lib/constants';
import { validateEncoderInput } from '$lib/dataPrep';
import type {
	Base64ByteMap,
	Base64Encoding,
	EncoderInput,
	EncoderOutput,
	HexByteMap,
	OutputChunk,
	StringEncoding
} from '$lib/types';
import { assign, createMachine } from 'xstate';

export interface EncodingContext {
	autoplay: boolean;
	byteMaps: HexByteMap[];
	byteIndex: number;
	currentByte: HexByteMap;
	remainingBytes: number;
	chunkIndex: number;
	currentChunk: OutputChunk;
	remainingChunks: number;
	base64Maps: Base64ByteMap[];
	base64CharIndex: number;
	currentBase64Char: Base64ByteMap;
	remainingBase64Chars: number;
	input: EncoderInput;
	output: EncoderOutput;
}

export type EncodingEvent =
	| { type: 'RESET' }
	| { type: 'UPDATE_INPUT_TEXT'; inputText: string; inputEncoding: StringEncoding; outputEncoding: Base64Encoding }
	| { type: 'VALIDATE_INPUT'; inputText: string; inputEncoding: StringEncoding; outputEncoding: Base64Encoding }
	| { type: 'VALIDATE_INPUT_AUTO'; inputText: string; inputEncoding: StringEncoding; outputEncoding: Base64Encoding }
	| { type: 'ENCODE_INPUT_TEXT'; inputText: string; inputEncoding: StringEncoding; outputEncoding: Base64Encoding }
	| { type: 'GO_TO_FIRST_STEP' }
	| { type: 'GO_TO_PREV_STEP' }
	| { type: 'GO_TO_NEXT_STEP' }
	| { type: 'GO_TO_LAST_STEP' }
	| { type: 'START_AUTO_PLAY' }
	| { type: 'STOP_AUTO_PLAY' };

export type EncodingTypeState =
	| { value: 'inactive'; context: EncodingContext }
	| { value: 'validateInputText'; context: EncodingContext }
	| { value: 'inputTextError'; context: EncodingContext }
	| { value: 'encodeInputText'; context: EncodingContext }
	| { value: { encodeInputText: 'idle' }; context: EncodingContext }
	| { value: { encodeInputText: 'autoPlayEncodeByte' }; context: EncodingContext }
	| { value: { encodeInputText: 'encodeByte' }; context: EncodingContext }
	| { value: { encodeInputText: 'encodingComplete' }; context: EncodingContext }
	| { value: 'createInputChunks'; context: EncodingContext }
	| { value: { createInputChunks: 'idle' }; context: EncodingContext }
	| { value: { createInputChunks: 'autoPlayCreateInputChunk' }; context: EncodingContext }
	| { value: { createInputChunks: 'createInputChunk' }; context: EncodingContext }
	| { value: { createInputChunks: 'createLastPaddedChunk' }; context: EncodingContext }
	| { value: { createInputChunks: 'createdAllInputChunks' }; context: EncodingContext }
	| { value: 'encodeOutputText'; context: EncodingContext }
	| { value: { encodeOutputText: 'idle' }; context: EncodingContext }
	| { value: { encodeOutputText: 'autoPlayEncodeBase64' }; context: EncodingContext }
	| { value: { encodeOutputText: 'encodeBase64' }; context: EncodingContext }
	| { value: { encodeOutputText: 'encodingComplete' }; context: EncodingContext }
	| { value: 'finished'; context: EncodingContext };

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
			byteMaps: [defaultHexByteMap],
			byteIndex: 0,
			currentByte: defaultHexByteMap,
			remainingBytes: 0,
			chunkIndex: 0,
			currentChunk: defaultOutputChunk,
			remainingChunks: 0,
			base64Maps: [defaultBase64ByteMap],
			base64CharIndex: 0,
			currentBase64Char: defaultBase64ByteMap,
			remainingBase64Chars: 0,
			input: defaultEncoderInput,
			output: defaultEncoderOutput,
		},
		states: {
			inactive: {
				entry: ['stopAutoPlay'],
				id: 'inactive',
				on: {
					VALIDATE_INPUT_AUTO: {
						target: 'validateInputText',
						actions: ['resetContext', 'validate', 'startAutoPlay'],
					},
					VALIDATE_INPUT: { target: 'validateInputText', actions: ['resetContext', 'validate'] },
					UPDATE_INPUT_TEXT: { target: 'inactive', actions: ['resetContext', 'validate'] },
					ENCODE_INPUT_TEXT: { target: 'skipDemoSteps', actions: ['resetContext', 'validate'] },
					RESET: { target: 'inactive', actions: 'resetInput', cond: 'autoPlayDisabled' },
				},
			},
			validateInputText: {
				always: [
					{ target: 'inputTextError', cond: 'inputTextIsInvalid' },
					{ target: 'encodeInputText', actions: ['encode', 'generateBase64Maps', 'generateByteMaps'] },
				],
			},
			skipDemoSteps: {
				always: [
					{ target: 'inputTextError', cond: 'inputTextIsInvalid' },
					{ target: 'finished', actions: ['encode', 'generateBase64Maps', 'generateByteMaps'] },
				],
			},
			inputTextError: {
				entry: ['stopAutoPlay'],
				on: {
					VALIDATE_INPUT_AUTO: { target: 'validateInputText', actions: ['validate', 'startAutoPlay'] },
					VALIDATE_INPUT: { target: 'validateInputText', actions: 'validate' },
					UPDATE_INPUT_TEXT: { target: 'inactive', actions: 'validate' },
					ENCODE_INPUT_TEXT: [
						{ actions: ['validate'] },
						{
							target: 'finished',
							actions: ['encode', 'generateBase64Maps', 'generateByteMaps'],
							cond: 'inputTextIsValid',
						},
						{ target: 'inputTextError' },
					],
					RESET: { target: 'inactive', actions: 'resetInput', cond: 'autoPlayDisabled' },
					GO_TO_FIRST_STEP: { target: 'inactive', actions: 'resetInput', cond: 'autoPlayDisabled' },
					GO_TO_PREV_STEP: { target: 'inactive', actions: 'resetInput', cond: 'autoPlayDisabled' },
				},
			},
			encodeInputText: {
				initial: 'idle',
				id: 'encodeInputText',
				states: {
					idle: {
						entry: ['resetRemainingBytes'],
						after: {
							1000: { target: 'autoPlayEncodeByte', cond: 'autoPlayEnabled' },
						},
						on: {
							START_AUTO_PLAY: {
								target: 'autoPlayEncodeByte',
								actions: 'startAutoPlay',
								cond: 'autoPlayDisabled',
							},
							STOP_AUTO_PLAY: { actions: 'stopAutoPlay', cond: 'autoPlayEnabled' },
							RESET: { target: '#inactive', actions: 'resetInput', cond: 'autoPlayDisabled' },
							GO_TO_FIRST_STEP: { target: '#inactive', cond: 'autoPlayDisabled' },
							GO_TO_PREV_STEP: { target: '#inactive', cond: 'autoPlayDisabled' },
							GO_TO_NEXT_STEP: { target: 'encodeByte', cond: 'bytesRemaining' },
							GO_TO_LAST_STEP: { target: '#finished', cond: 'autoPlayDisabled' },
						},
					},
					autoPlayEncodeByte: {
						entry: ['getCurrentByte'],
						after: {
							500: [
								{
									target: 'autoPlayEncodeByte',
									actions: 'mapNextByte',
									cond: 'bytesRemaining',
								},
								{ target: 'encodingComplete', cond: 'noBytesRemaining' },
							],
						},
						on: { STOP_AUTO_PLAY: { target: 'encodeByte', actions: 'stopAutoPlay', cond: 'autoPlayEnabled' } },
					},
					encodeByte: {
						entry: ['getCurrentByte'],
						on: {
							START_AUTO_PLAY: {
								target: 'autoPlayEncodeByte',
								actions: 'startAutoPlay',
								cond: 'autoPlayDisabled',
							},
							RESET: { target: '#inactive', actions: 'resetInput', cond: 'autoPlayDisabled' },
							GO_TO_FIRST_STEP: { target: '#inactive', cond: 'autoPlayDisabled' },
							GO_TO_PREV_STEP: [
								{ target: 'encodeByte', actions: 'mapPreviousByte', cond: 'hasPreviousByte' },
								{ target: '#inactive', cond: 'allBytesRemaining' },
							],
							GO_TO_NEXT_STEP: [
								{ target: 'encodeByte', actions: 'mapNextByte', cond: 'bytesRemaining' },
								{ target: 'encodingComplete', cond: 'noBytesRemaining' },
							],
							GO_TO_LAST_STEP: { target: '#finished', cond: 'autoPlayDisabled' },
						},
					},
					encodingComplete: {
						type: 'final',
					},
				},
				onDone: 'createInputChunks',
			},
			createInputChunks: {
				id: 'createInputChunks',
				initial: 'idle',
				states: {
					idle: {
						entry: ['resetRemainingChunks'],
						after: {
							1000: { target: 'autoPlayCreateInputChunk', cond: 'autoPlayEnabled' },
						},
						on: {
							START_AUTO_PLAY: {
								target: 'autoPlayCreateInputChunk',
								actions: 'startAutoPlay',
								cond: 'autoPlayDisabled',
							},
							STOP_AUTO_PLAY: { actions: 'stopAutoPlay', cond: 'autoPlayEnabled' },
							RESET: { target: '#inactive', actions: 'resetInput', cond: 'autoPlayDisabled' },
							GO_TO_FIRST_STEP: { target: '#inactive', cond: 'autoPlayDisabled' },
							GO_TO_PREV_STEP: {
								target: '#encodeInputText.encodeByte',
								actions: 'resetNoBytesRemaining',
								cond: 'autoPlayDisabled',
							},
							GO_TO_NEXT_STEP: { target: 'createInputChunk', cond: 'autoPlayDisabled' },
							GO_TO_LAST_STEP: { target: '#finished', cond: 'autoPlayDisabled' },
						},
					},
					autoPlayCreateInputChunk: {
						entry: ['getCurrentChunk'],
						after: {
							500: [
								{
									target: 'autoPlayCreateInputChunk',
									actions: 'mapNextChunk',
									cond: 'inputChunksRemaining',
								},
								{
									target: 'createLastPaddedChunk',
									actions: 'mapNextChunk',
									cond: 'finalPaddedChunkRemaining',
								},
								{ target: 'createdAllInputChunks', cond: 'noChunksRemaining' },
							],
						},
						on: { STOP_AUTO_PLAY: { target: 'createInputChunk', actions: 'stopAutoPlay', cond: 'autoPlayEnabled' } },
					},
					createInputChunk: {
						entry: ['getCurrentChunk'],
						on: {
							START_AUTO_PLAY: {
								target: 'autoPlayCreateInputChunk',
								actions: 'startAutoPlay',
								cond: 'autoPlayDisabled',
							},
							RESET: { target: '#inactive', actions: 'resetInput', cond: 'autoPlayDisabled' },
							GO_TO_FIRST_STEP: { target: 'idle', cond: 'autoPlayDisabled' },
							GO_TO_PREV_STEP: [
								{ target: 'createInputChunk', actions: 'mapPreviousChunk', cond: 'hasPreviousChunk' },
								{ target: 'idle', cond: 'allChunksRemaining' },
							],
							GO_TO_NEXT_STEP: [
								{ target: 'createInputChunk', actions: 'mapNextChunk', cond: 'inputChunksRemaining' },
								{ target: 'createLastPaddedChunk', actions: 'mapNextChunk', cond: 'finalPaddedChunkRemaining' },
								{ target: 'createdAllInputChunks', cond: 'noChunksRemaining' },
							],
							GO_TO_LAST_STEP: { target: '#finished', cond: 'autoPlayDisabled' },
						},
					},
					createLastPaddedChunk: {
						entry: ['getCurrentChunk'],
						after: {
							500: { target: 'createdAllInputChunks', actions: 'mapNextChunk', cond: 'autoPlayEnabled' },
						},
						on: {
							START_AUTO_PLAY: {
								target: 'createdAllInputChunks',
								actions: 'startAutoPlay',
								cond: 'autoPlayDisabled',
							},
							STOP_AUTO_PLAY: { actions: 'stopAutoPlay', cond: 'autoPlayEnabled' },
							RESET: { target: '#inactive', actions: 'resetInput', cond: 'autoPlayDisabled' },
							GO_TO_FIRST_STEP: { target: 'idle', cond: 'autoPlayDisabled' },
							GO_TO_PREV_STEP: [
								{ target: 'createInputChunk', actions: 'mapPreviousChunk', cond: 'hasPreviousChunk' },
								{ target: 'idle', cond: 'allChunksRemaining' },
							],
							GO_TO_NEXT_STEP: { target: 'createdAllInputChunks', cond: 'autoPlayDisabled' },
							GO_TO_LAST_STEP: { target: '#finished', cond: 'autoPlayDisabled' },
						},
					},
					createdAllInputChunks: {
						type: 'final',
					},
				},
				onDone: 'encodeOutputText',
			},
			encodeOutputText: {
				initial: 'idle',
				states: {
					idle: {
						entry: ['resetRemainingBase64Chars'],
						after: {
							1000: { target: 'autoPlayEncodeBase64', cond: 'autoPlayEnabled' },
						},
						on: {
							START_AUTO_PLAY: {
								target: 'autoPlayEncodeBase64',
								actions: 'startAutoPlay',
								cond: 'autoPlayDisabled',
							},
							STOP_AUTO_PLAY: { actions: 'stopAutoPlay', cond: 'autoPlayEnabled' },
							RESET: { target: '#inactive', actions: 'resetInput', cond: 'autoPlayDisabled' },
							GO_TO_FIRST_STEP: { target: '#inactive', cond: 'autoPlayDisabled' },
							GO_TO_PREV_STEP: [
								{
									target: '#createInputChunks.createLastPaddedChunk',
									actions: 'resetNoChunksRemaining',
									cond: 'currentChunkIsPadded',
								},
								{
									target: '#createInputChunks.createInputChunk',
									actions: 'resetNoChunksRemaining',
									cond: 'autoPlayDisabled',
								},
							],
							GO_TO_NEXT_STEP: { target: 'encodeBase64', cond: 'autoPlayDisabled' },
							GO_TO_LAST_STEP: { target: '#finished', cond: 'autoPlayDisabled' },
						},
					},
					autoPlayEncodeBase64: {
						entry: ['getCurrentBase64Char'],
						after: {
							500: [
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
							START_AUTO_PLAY: {
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
							GO_TO_LAST_STEP: { target: '#finished', cond: 'autoPlayDisabled' },
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
				entry: ['stopAutoPlay'],
				on: {
					START_AUTO_PLAY: { target: 'validateInputText', actions: 'startAutoPlay', cond: 'autoPlayDisabled' },
					RESET: { target: 'inactive', actions: 'resetInput', cond: 'autoPlayDisabled' },
					GO_TO_FIRST_STEP: { target: 'inactive', cond: 'autoPlayDisabled' },
					GO_TO_PREV_STEP: {
						target: 'encodeOutputText.encodeBase64',
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
				byteMaps: (_: EncodingContext) => [defaultHexByteMap],
				byteIndex: (_: EncodingContext) => 0,
				currentByte: (_: EncodingContext) => defaultHexByteMap,
				remainingBytes: (_: EncodingContext) => 0,
				chunkIndex: (_: EncodingContext) => 0,
				currentChunk: (_: EncodingContext) => defaultOutputChunk,
				remainingChunks: (_: EncodingContext) => 0,
				base64Maps: (_: EncodingContext) => [defaultBase64ByteMap],
				base64CharIndex: (_: EncodingContext) => 0,
				currentBase64Char: (_: EncodingContext) => defaultBase64ByteMap,
				remainingBase64Chars: (_: EncodingContext) => 0,
				input: (context: EncodingContext) => context.input,
				output: (_: EncodingContext) => defaultEncoderOutput,
			}),
			resetInput: assign({ input: (_: EncodingContext) => defaultEncoderInput }),
			resetOutput: assign({ output: (_: EncodingContext) => defaultEncoderOutput }),
			startAutoPlay: assign({ autoplay: (_) => true }),
			stopAutoPlay: assign({ autoplay: (_) => false }),
			validate: assign({
				input: (_: EncodingContext, event: EncodingEvent) => {
					if (
						event.type === 'VALIDATE_INPUT' ||
						event.type === 'UPDATE_INPUT_TEXT' ||
						event.type === 'VALIDATE_INPUT_AUTO' ||
						event.type === 'ENCODE_INPUT_TEXT'
					) {
						return validateEncoderInput(event.inputText, event.inputEncoding, event.outputEncoding);
					}
				},
			}),
			encode: assign({
				chunkIndex: (_: EncodingContext) => 0,
				remainingChunks: (context: EncodingContext) => context.input.totalChunks,
				output: (context: EncodingContext) => {
					if (context.input.validationResult.success) {
						return b64Encode(context.input);
					}
				},
			}),
			getCurrentByte: assign({
				currentByte: (context: EncodingContext) => context.byteMaps[context.byteIndex],
			}),
			generateByteMaps: assign({
				byteMaps: (context: EncodingContext) =>
					context.input.chunks.map((chunk) => chunk.inputMap.map((map) => map)).flat(),
			}),
			resetRemainingBytes: assign({
				byteIndex: (_: EncodingContext) => 0,
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
			getCurrentChunk: assign({
				currentChunk: (context: EncodingContext) => context.output.chunks[context.chunkIndex],
			}),
			resetRemainingChunks: assign({
				chunkIndex: (_: EncodingContext) => 0,
				currentChunk: (_: EncodingContext) => defaultOutputChunk,
				remainingChunks: (context: EncodingContext) => context.input.totalChunks - 1,
			}),
			resetNoChunksRemaining: assign({
				chunkIndex: (context: EncodingContext) => context.input.totalChunks - 1,
				remainingChunks: (_: EncodingContext) => 0,
			}),
			mapNextChunk: assign({
				chunkIndex: (context: EncodingContext) => context.chunkIndex + 1,
				remainingChunks: (context: EncodingContext) => context.remainingChunks - 1,
			}),
			mapPreviousChunk: assign({
				chunkIndex: (context: EncodingContext) => context.chunkIndex - 1,
				remainingChunks: (context: EncodingContext) => context.remainingChunks + 1,
			}),
			getCurrentBase64Char: assign({
				currentBase64Char: (context: EncodingContext) => context.base64Maps[context.base64CharIndex],
			}),
			generateBase64Maps: assign({
				base64Maps: (context: EncodingContext) =>
					context.output.chunks.map((chunk) => chunk.base64Map.map((map) => map)).flat(),
			}),
			resetRemainingBase64Chars: assign({
				base64CharIndex: (_: EncodingContext) => 0,
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
		},
		guards: {
			autoPlayEnabled: (context: EncodingContext) => context.autoplay,
			autoPlayDisabled: (context: EncodingContext) => !context.autoplay,
			inputTextIsInvalid: (context: EncodingContext) => !context.input.validationResult.success,
			inputTextIsValid: (context: EncodingContext) => context.input.validationResult.success,
			bytesRemaining: (context: EncodingContext) => context.remainingBytes > 0,
			noBytesRemaining: (context: EncodingContext) => context.remainingBytes === 0,
			allBytesRemaining: (context: EncodingContext) => context.remainingBytes + 1 === context.byteMaps.length,
			hasPreviousByte: (context: EncodingContext) => context.byteIndex > 0,
			inputChunksRemaining: (context: EncodingContext) =>
				(context.remainingChunks > 0 && !context.input.lastChunkPadded) ||
				(context.remainingChunks > 1 && context.input.lastChunkPadded) || false,
			outputChunksRemaining: (context: EncodingContext) => context.remainingChunks > 0,
			finalPaddedChunkRemaining: (context: EncodingContext) =>
				context.remainingChunks === 1 && context.input.lastChunkPadded || false,
			noChunksRemaining: (context: EncodingContext) => context.remainingChunks === 0,
			allChunksRemaining: (context: EncodingContext) => context.remainingChunks + 1 === context.input.totalChunks,
			currentChunkIsPadded: (context: EncodingContext) => context.currentChunk.bytes.length !== 3,
			hasPreviousChunk: (context: EncodingContext) => context.chunkIndex > 0,
			base64CharsRemaining: (context: EncodingContext) => context.remainingBase64Chars > 0,
			noBase64CharsRemaining: (context: EncodingContext) => context.remainingBase64Chars === 0,
			allBase64CharsRemaining: (context: EncodingContext) =>
				context.remainingBase64Chars + 1 === context.base64Maps.length,
			hasPreviousBase64Char: (context: EncodingContext) => context.base64CharIndex > 0,
		},
	},
);
