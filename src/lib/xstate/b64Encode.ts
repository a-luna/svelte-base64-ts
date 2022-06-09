/* eslint-disable @typescript-eslint/no-unused-vars */
import { b64Encode } from '$lib/base64';
import {
	defaultBase64ByteMap,
	defaultEncoderInput,
	defaultEncoderInputChunk,
	defaultEncoderOutput,
	defaultHexByteMap,
	defaultOutputChunk,
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
	StringEncoding,
} from '$lib/types';
import type {
	BaseActionObject,
	MachineConfig,
	MachineOptions,
	ResolveTypegenMeta,
	ServiceMap,
	TypegenDisabled,
} from 'xstate';
import { assign } from 'xstate';

export interface EncodingContext {
	resetForm: boolean;
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

const initialEncodingContext: EncodingContext = {
	resetForm: false,
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
};

export interface EncodingSchema {
	states: {
		inactive: Record<string, unknown>;
		validateInputText: {
			states: {
				validate: Record<string, unknown>;
				error: Record<string, unknown>;
				success: Record<string, unknown>;
				validationComplete: Record<string, unknown>;
			};
		};
		encodeInput: {
			states: {
				idle: Record<string, unknown>;
				autoPlayEncodeByte: Record<string, unknown>;
				encodeByte: Record<string, unknown>;
				explainByteMapping: Record<string, unknown>;
				encodingComplete: Record<string, unknown>;
			};
		};
		createInputChunks: {
			states: {
				idle: Record<string, unknown>;
				autoPlayIdle: Record<string, unknown>;
				regularIdle: Record<string, unknown>;
				autoPlayCreateInputChunk: Record<string, unknown>;
				createInputChunk: Record<string, unknown>;
				explainLastPaddedChunk: Record<string, unknown>;
				createLastPaddedChunk: Record<string, unknown>;
				createdAllInputChunks: Record<string, unknown>;
			};
		};
		createOutputChunks: {
			states: {
				idle: Record<string, unknown>;
				autoPlayIdle: Record<string, unknown>;
				regularIdle: Record<string, unknown>;
				autoPlayCreateOutputChunk: Record<string, unknown>;
				createOutputChunk: Record<string, unknown>;
				explainLastPaddedChunk: Record<string, unknown>;
				explainPadCharacter: Record<string, unknown>;
				createLastPaddedChunk: Record<string, unknown>;
				createdAllOutputChunks: Record<string, unknown>;
			};
		};
		encodeOutput: {
			states: {
				idle: Record<string, unknown>;
				autoPlayEncodeBase64: Record<string, unknown>;
				encodeBase64: Record<string, unknown>;
				encodingComplete: Record<string, unknown>;
			};
		};
		finished: Record<string, unknown>;
	};
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

export type EncodingTypeStates = {
	value:
		| 'inactive'
		| 'validateInputText'
		| { validateInputText: 'validate' }
		| { validateInputText: 'error' }
		| { validateInputText: 'success' }
		| { validateInputText: 'validationComplete' }
		| 'encodeInput'
		| { encodeInput: 'idle' }
		| { encodeInput: 'autoPlayEncodeByte' }
		| { encodeInput: 'encodeByte' }
		| { encodeInput: 'explainByteMapping' }
		| { encodeInput: 'encodingComplete' }
		| 'createInputChunks'
		| { createInputChunks: 'idle' }
		| { createInputChunks: 'regularIdle' }
		| { createInputChunks: 'autoPlayIdle' }
		| { createInputChunks: 'autoPlayCreateInputChunk' }
		| { createInputChunks: 'createInputChunk' }
		| { createInputChunks: 'explainLastPaddedChunk' }
		| { createInputChunks: 'createLastPaddedChunk' }
		| { createInputChunks: 'createdAllInputChunks' }
		| 'createOutputChunks'
		| { createOutputChunks: 'idle' }
		| { createOutputChunks: 'regularIdle' }
		| { createOutputChunks: 'autoPlayIdle' }
		| { createOutputChunks: 'autoPlayCreateOutputChunk' }
		| { createOutputChunks: 'createOutputChunk' }
		| { createOutputChunks: 'explainLastPaddedChunk' }
		| { createOutputChunks: 'explainPadCharacter' }
		| { createOutputChunks: 'createLastPaddedChunk' }
		| { createOutputChunks: 'createdAllOutputChunks' }
		| 'encodeOutput'
		| { encodeOutput: 'idle' }
		| { encodeOutput: 'autoPlayEncodeBase64' }
		| { encodeOutput: 'encodeBase64' }
		| { encodeOutput: 'encodingComplete' }
		| 'finished';
	context: EncodingContext;
};

export const encodingMachineConfig: MachineConfig<EncodingContext, EncodingSchema, EncodingEvent> = {
	context: initialEncodingContext,
	schema: { context: {} as EncodingContext, events: {} as EncodingEvent },
	id: 'b64Encode',
	initial: 'inactive',
	states: {
		inactive: {
			entry: ['stopAutoPlay', 'resetContext'],
			after: {
				10: { actions: 'clearResetFlag', cond: 'formResetRequested' },
			},
			on: {
				START_AUTOPLAY: {
					actions: 'startAutoPlay',
					target: 'validateInputText',
				},
				VALIDATE_TEXT: {
					target: 'validateInputText',
				},
				UPDATE_TEXT: {
					actions: 'validate',
				},
				SKIP_DEMO: {
					actions: 'setFlagSkipDemo',
					target: 'validateInputText',
				},
				RESET: {
					actions: 'resetInput',
					cond: 'defaultSettingsChanged',
					target: 'inactive',
					internal: false,
				},
			},
		},
		validateInputText: {
			initial: 'validate',
			states: {
				validate: {
					entry: 'validate',
					always: [
						{
							cond: 'inputTextIsInvalid',
							target: 'error',
						},
						{
							actions: ['encode', 'generateBase64Maps', 'generateByteMaps'],
							cond: 'yesSkipDemo',
							target: 'validationComplete',
						},
						{
							actions: ['encode', 'generateBase64Maps', 'generateByteMaps'],
							target: 'success',
						},
					],
				},
				error: {
					after: {
						'1000': {
							target: '#b64Encode.inactive',
						},
					},
					on: {
						RESET: {
							actions: 'resetInput',
							target: '#b64Encode.inactive',
						},
						GO_TO_FIRST_STEP: {
							cond: 'autoPlayDisabled',
							target: '#b64Encode.inactive',
						},
						GO_TO_PREV_STEP: {
							cond: 'autoPlayDisabled',
							target: '#b64Encode.inactive',
						},
					},
				},
				success: {
					after: {
						'1000': {
							cond: 'autoPlayEnabled',
							target: 'validationComplete',
						},
					},
					on: {
						RESUME_AUTO_PLAY: {
							actions: 'startAutoPlay',
							cond: 'autoPlayDisabled',
							target: 'validationComplete',
						},
						RESET: {
							actions: 'resetInput',
							cond: 'autoPlayDisabled',
							target: '#b64Encode.inactive',
						},
						GO_TO_FIRST_STEP: {
							cond: 'autoPlayDisabled',
							target: '#b64Encode.inactive',
						},
						GO_TO_PREV_STEP: {
							cond: 'autoPlayDisabled',
							target: '#b64Encode.inactive',
						},
						GO_TO_NEXT_STEP: {
							cond: 'autoPlayDisabled',
							target: 'validationComplete',
						},
						GO_TO_LAST_STEP: {
							actions: 'setFlagSkipDemo',
							cond: 'autoPlayDisabled',
							target: 'validationComplete',
						},
					},
				},
				validationComplete: {
					type: 'final',
				},
			},
			onDone: [
				{
					cond: 'yesSkipDemo',
					target: 'finished',
				},
				{
					target: 'encodeInput',
				},
			],
		},
		encodeInput: {
			initial: 'idle',
			states: {
				idle: {
					entry: 'resetRemainingBytes',
					after: {
						'1000': {
							cond: 'autoPlayEnabled',
							target: 'autoPlayEncodeByte',
						},
					},
					on: {
						RESUME_AUTO_PLAY: {
							actions: 'startAutoPlay',
							cond: 'autoPlayDisabled',
							target: 'autoPlayEncodeByte',
						},
						STOP_AUTO_PLAY: {
							actions: 'stopAutoPlay',
							cond: 'autoPlayEnabled',
						},
						RESET: {
							actions: 'resetInput',
							cond: 'autoPlayDisabled',
							target: '#b64Encode.inactive',
						},
						GO_TO_FIRST_STEP: {
							cond: 'autoPlayDisabled',
							target: '#b64Encode.inactive',
						},
						GO_TO_PREV_STEP: {
							cond: 'autoPlayDisabled',
							target: '#b64Encode.validateInputText.success',
						},
						GO_TO_NEXT_STEP: {
							cond: 'autoPlayDisabled',
							target: 'encodeByte',
						},
						GO_TO_LAST_STEP: {
							actions: 'setFlagSkipDemo',
							cond: 'autoPlayDisabled',
							target: 'encodingComplete',
						},
					},
				},
				autoPlayEncodeByte: {
					entry: 'getCurrentByte',
					after: {
						'1000': [
							{
								actions: 'mapNextByte',
								cond: 'bytesRemaining',
								target: 'autoPlayEncodeByte',
								internal: false,
							},
							{
								cond: 'noBytesRemaining',
								target: 'explainByteMapping',
							},
						],
					},
					on: {
						STOP_AUTO_PLAY: {
							actions: 'stopAutoPlay',
							cond: 'autoPlayEnabled',
							target: 'encodeByte',
						},
					},
				},
				encodeByte: {
					entry: 'getCurrentByte',
					on: {
						RESUME_AUTO_PLAY: {
							actions: 'startAutoPlay',
							cond: 'autoPlayDisabled',
							target: 'autoPlayEncodeByte',
						},
						RESET: {
							actions: 'resetInput',
							cond: 'autoPlayDisabled',
							target: '#b64Encode.inactive',
						},
						GO_TO_FIRST_STEP: {
							cond: 'autoPlayDisabled',
							target: '#b64Encode.inactive',
						},
						GO_TO_PREV_STEP: [
							{
								actions: 'mapPreviousByte',
								cond: 'hasPreviousByte',
								target: 'encodeByte',
								internal: false,
							},
							{
								cond: 'allBytesRemaining',
								target: 'idle',
							},
						],
						GO_TO_NEXT_STEP: [
							{
								actions: 'mapNextByte',
								cond: 'bytesRemaining',
								target: 'encodeByte',
								internal: false,
							},
							{
								cond: 'noBytesRemaining',
								target: 'explainByteMapping',
							},
						],
						GO_TO_LAST_STEP: {
							actions: 'setFlagSkipDemo',
							cond: 'autoPlayDisabled',
							target: 'encodingComplete',
						},
					},
				},
				explainByteMapping: {
					after: {
						'1000': {
							cond: 'autoPlayEnabled',
							target: 'encodingComplete',
						},
					},
					on: {
						RESUME_AUTO_PLAY: {
							actions: 'startAutoPlay',
							cond: 'autoPlayDisabled',
							target: 'encodingComplete',
						},
						STOP_AUTO_PLAY: {
							actions: 'stopAutoPlay',
							cond: 'autoPlayEnabled',
						},
						RESET: {
							actions: 'resetInput',
							cond: 'autoPlayDisabled',
							target: '#b64Encode.inactive',
						},
						GO_TO_FIRST_STEP: {
							cond: 'autoPlayDisabled',
							target: '#b64Encode.inactive',
						},
						GO_TO_PREV_STEP: {
							cond: 'autoPlayDisabled',
							target: 'encodeByte',
						},
						GO_TO_NEXT_STEP: {
							cond: 'autoPlayDisabled',
							target: 'encodingComplete',
						},
						GO_TO_LAST_STEP: {
							actions: 'setFlagSkipDemo',
							cond: 'autoPlayDisabled',
							target: 'encodingComplete',
						},
					},
				},
				encodingComplete: {
					type: 'final',
				},
			},
			onDone: [
				{
					cond: 'yesSkipDemo',
					target: 'finished',
				},
				{
					target: 'createInputChunks',
				},
			],
		},
		createInputChunks: {
			initial: 'idle',
			states: {
				idle: {
					entry: 'resetRemainingInputChunks',
					always: [{ cond: 'autoPlayEnabled', target: 'autoPlayIdle' }, { target: 'regularIdle' }],
				},
				autoPlayIdle: {
					after: {
						'1000': [
							{
								cond: 'onlyOnePaddedChunk',
								target: 'explainLastPaddedChunk',
							},
							{
								target: 'autoPlayCreateInputChunk',
							},
						],
					},
					on: {
						STOP_AUTO_PLAY: [
							{
								cond: 'onlyOnePaddedChunk',
								target: 'explainLastPaddedChunk',
							},
							{
								target: 'createInputChunk',
							},
						],
					},
				},
				regularIdle: {
					on: {
						RESUME_AUTO_PLAY: {
							actions: 'startAutoPlay',
							cond: 'autoPlayDisabled',
							target: 'autoPlayCreateInputChunk',
						},
						STOP_AUTO_PLAY: {
							actions: 'stopAutoPlay',
							cond: 'autoPlayEnabled',
						},
						RESET: {
							actions: 'resetInput',
							cond: 'autoPlayDisabled',
							target: '#b64Encode.inactive',
						},
						GO_TO_FIRST_STEP: {
							cond: 'autoPlayDisabled',
							target: '#b64Encode.inactive',
						},
						GO_TO_PREV_STEP: {
							actions: 'resetNoBytesRemaining',
							cond: 'autoPlayDisabled',
							target: '#b64Encode.encodeInput.explainByteMapping',
						},
						GO_TO_NEXT_STEP: [
							{
								cond: 'onlyOnePaddedChunk',
								target: 'explainLastPaddedChunk',
							},
							{
								cond: 'autoPlayDisabled',
								target: 'createInputChunk',
							},
						],
						GO_TO_LAST_STEP: {
							actions: 'setFlagSkipDemo',
							cond: 'autoPlayDisabled',
							target: 'createdAllInputChunks',
						},
					},
				},
				autoPlayCreateInputChunk: {
					entry: 'getCurrentInputChunk',
					after: {
						'1000': [
							{
								actions: 'mapNextInputChunk',
								cond: 'inputChunksRemaining',
								target: 'autoPlayCreateInputChunk',
								internal: false,
							},
							{
								actions: 'mapNextInputChunk',
								cond: 'finalPaddedInputChunkRemaining',
								target: 'explainLastPaddedChunk',
							},
							{
								cond: 'noInputChunksRemaining',
								target: 'createdAllInputChunks',
							},
						],
					},
					on: {
						STOP_AUTO_PLAY: {
							actions: 'stopAutoPlay',
							cond: 'autoPlayEnabled',
							target: 'createInputChunk',
						},
					},
				},
				createInputChunk: {
					entry: 'getCurrentInputChunk',
					on: {
						RESUME_AUTO_PLAY: {
							actions: 'startAutoPlay',
							cond: 'autoPlayDisabled',
							target: 'autoPlayCreateInputChunk',
						},
						RESET: {
							actions: 'resetInput',
							cond: 'autoPlayDisabled',
							target: '#b64Encode.inactive',
						},
						GO_TO_FIRST_STEP: {
							cond: 'autoPlayDisabled',
							target: '#b64Encode.inactive',
						},
						GO_TO_PREV_STEP: [
							{
								actions: 'mapPreviousInputChunk',
								cond: 'hasPreviousInputChunk',
								target: 'createInputChunk',
								internal: false,
							},
							{
								cond: 'allInputChunksRemaining',
								target: 'idle',
							},
						],
						GO_TO_NEXT_STEP: [
							{
								actions: 'mapNextInputChunk',
								cond: 'inputChunksRemaining',
								target: 'createInputChunk',
								internal: false,
							},
							{
								actions: 'mapNextInputChunk',
								cond: 'finalPaddedInputChunkRemaining',
								target: 'explainLastPaddedChunk',
							},
							{
								cond: 'noInputChunksRemaining',
								target: 'createdAllInputChunks',
							},
						],
						GO_TO_LAST_STEP: {
							actions: 'setFlagSkipDemo',
							cond: 'autoPlayDisabled',
							target: 'createdAllInputChunks',
						},
					},
				},
				explainLastPaddedChunk: {
					entry: 'getCurrentInputChunk',
					after: {
						'1000': {
							cond: 'autoPlayEnabled',
							target: 'createLastPaddedChunk',
						},
					},
					on: {
						RESUME_AUTO_PLAY: {
							actions: 'startAutoPlay',
							cond: 'autoPlayDisabled',
							target: 'createLastPaddedChunk',
						},
						STOP_AUTO_PLAY: {
							actions: 'stopAutoPlay',
							cond: 'autoPlayEnabled',
						},
						RESET: {
							actions: 'resetInput',
							cond: 'autoPlayDisabled',
							target: '#b64Encode.inactive',
						},
						GO_TO_FIRST_STEP: {
							cond: 'autoPlayDisabled',
							target: '#b64Encode.inactive',
						},
						GO_TO_PREV_STEP: [
							{
								actions: 'mapPreviousInputChunk',
								cond: 'hasPreviousInputChunk',
								target: 'createInputChunk',
							},
							{
								cond: 'allInputChunksRemaining',
								target: 'idle',
							},
						],
						GO_TO_NEXT_STEP: {
							cond: 'autoPlayDisabled',
							target: 'createLastPaddedChunk',
						},
						GO_TO_LAST_STEP: {
							actions: 'setFlagSkipDemo',
							cond: 'autoPlayDisabled',
							target: 'createdAllInputChunks',
						},
					},
				},
				createLastPaddedChunk: {
					after: {
						'1000': {
							cond: 'autoPlayEnabled',
							target: 'createdAllInputChunks',
						},
					},
					on: {
						RESUME_AUTO_PLAY: {
							actions: 'startAutoPlay',
							cond: 'autoPlayDisabled',
							target: 'createdAllInputChunks',
						},
						STOP_AUTO_PLAY: {
							actions: 'stopAutoPlay',
							cond: 'autoPlayEnabled',
						},
						RESET: {
							actions: 'resetInput',
							cond: 'autoPlayDisabled',
							target: '#b64Encode.inactive',
						},
						GO_TO_FIRST_STEP: {
							cond: 'autoPlayDisabled',
							target: '#b64Encode.inactive',
						},
						GO_TO_PREV_STEP: [
							{
								cond: 'lastChunkIsPadded',
								target: 'explainLastPaddedChunk',
							},
							{
								cond: 'allInputChunksRemaining',
								target: 'idle',
							},
						],
						GO_TO_NEXT_STEP: {
							cond: 'autoPlayDisabled',
							target: 'createdAllInputChunks',
						},
						GO_TO_LAST_STEP: {
							actions: 'setFlagSkipDemo',
							cond: 'autoPlayDisabled',
							target: 'createdAllInputChunks',
						},
					},
				},
				createdAllInputChunks: {
					type: 'final',
				},
			},
			onDone: [
				{
					cond: 'yesSkipDemo',
					target: 'finished',
				},
				{
					target: 'createOutputChunks',
				},
			],
		},
		createOutputChunks: {
			initial: 'idle',
			states: {
				idle: {
					entry: 'resetRemainingOutputChunks',
					always: [{ cond: 'autoPlayEnabled', target: 'autoPlayIdle' }, { target: 'regularIdle' }],
				},
				autoPlayIdle: {
					after: {
						'1000': [
							{
								cond: 'onlyOnePaddedChunk',
								target: 'explainLastPaddedChunk',
							},
							{
								target: 'autoPlayCreateOutputChunk',
							},
						],
					},
					on: {
						STOP_AUTO_PLAY: [
							{
								cond: 'onlyOnePaddedChunk',
								target: 'explainLastPaddedChunk',
							},
							{
								target: 'createOutputChunk',
							},
						],
					},
				},
				regularIdle: {
					on: {
						RESUME_AUTO_PLAY: {
							actions: 'startAutoPlay',
							cond: 'autoPlayDisabled',
							target: 'autoPlayCreateOutputChunk',
						},
						STOP_AUTO_PLAY: {
							actions: 'stopAutoPlay',
							cond: 'autoPlayEnabled',
						},
						RESET: {
							actions: 'resetInput',
							cond: 'autoPlayDisabled',
							target: '#b64Encode.inactive',
						},
						GO_TO_FIRST_STEP: {
							cond: 'autoPlayDisabled',
							target: '#b64Encode.inactive',
						},
						GO_TO_PREV_STEP: [
							{
								actions: 'resetNoInputChunksRemaining',
								cond: 'currentInputChunkIsPadded',
								target: '#b64Encode.createInputChunks.createLastPaddedChunk',
							},
							{
								actions: 'resetNoInputChunksRemaining',
								cond: 'autoPlayDisabled',
								target: '#b64Encode.createInputChunks.createInputChunk',
							},
						],
						GO_TO_NEXT_STEP: [
							{
								cond: 'onlyOnePaddedChunk',
								target: 'explainLastPaddedChunk',
							},
							{
								cond: 'autoPlayDisabled',
								target: 'createOutputChunk',
							},
						],
						GO_TO_LAST_STEP: {
							actions: 'setFlagSkipDemo',
							cond: 'autoPlayDisabled',
							target: 'createdAllOutputChunks',
						},
					},
				},
				autoPlayCreateOutputChunk: {
					entry: 'getCurrentOutputChunk',
					after: {
						'1000': [
							{
								actions: 'mapNextOutputChunk',
								cond: 'outputChunksRemaining',
								target: 'autoPlayCreateOutputChunk',
								internal: false,
							},
							{
								actions: 'mapNextOutputChunk',
								cond: 'finalPaddedOutputChunkRemaining',
								target: 'explainLastPaddedChunk',
							},
							{
								cond: 'noOutputChunksRemaining',
								target: 'createdAllOutputChunks',
							},
						],
					},
					on: {
						STOP_AUTO_PLAY: {
							actions: 'stopAutoPlay',
							cond: 'autoPlayEnabled',
							target: 'createOutputChunk',
						},
					},
				},
				createOutputChunk: {
					entry: 'getCurrentOutputChunk',
					on: {
						RESUME_AUTO_PLAY: {
							actions: 'startAutoPlay',
							cond: 'autoPlayDisabled',
							target: 'autoPlayCreateOutputChunk',
						},
						RESET: {
							actions: 'resetInput',
							cond: 'autoPlayDisabled',
							target: '#b64Encode.inactive',
						},
						GO_TO_FIRST_STEP: {
							cond: 'autoPlayDisabled',
							target: '#b64Encode.inactive',
						},
						GO_TO_PREV_STEP: [
							{
								actions: 'mapPreviousOutputChunk',
								cond: 'hasPreviousOutputChunk',
								target: 'createOutputChunk',
								internal: false,
							},
							{
								cond: 'allOutputChunksRemaining',
								target: 'idle',
							},
						],
						GO_TO_NEXT_STEP: [
							{
								actions: 'mapNextOutputChunk',
								cond: 'outputChunksRemaining',
								target: 'createOutputChunk',
								internal: false,
							},
							{
								actions: 'mapNextOutputChunk',
								cond: 'finalPaddedOutputChunkRemaining',
								target: 'explainLastPaddedChunk',
							},
							{
								cond: 'noOutputChunksRemaining',
								target: 'createdAllOutputChunks',
							},
						],
						GO_TO_LAST_STEP: {
							actions: 'setFlagSkipDemo',
							cond: 'autoPlayDisabled',
							target: 'createdAllOutputChunks',
						},
					},
				},
				explainLastPaddedChunk: {
					entry: 'getCurrentOutputChunk',
					after: {
						'1000': {
							cond: 'autoPlayEnabled',
							target: 'explainPadCharacter',
						},
					},
					on: {
						RESUME_AUTO_PLAY: {
							actions: 'startAutoPlay',
							cond: 'autoPlayDisabled',
							target: 'explainPadCharacter',
						},
						STOP_AUTO_PLAY: {
							actions: 'stopAutoPlay',
							cond: 'autoPlayEnabled',
						},
						RESET: {
							actions: 'resetInput',
							cond: 'autoPlayDisabled',
							target: '#b64Encode.inactive',
						},
						GO_TO_FIRST_STEP: {
							cond: 'autoPlayDisabled',
							target: '#b64Encode.inactive',
						},
						GO_TO_PREV_STEP: [
							{
								actions: 'mapPreviousOutputChunk',
								cond: 'hasPreviousOutputChunk',
								target: 'createOutputChunk',
							},
							{
								cond: 'allOutputChunksRemaining',
								target: 'idle',
							},
						],
						GO_TO_NEXT_STEP: {
							cond: 'autoPlayDisabled',
							target: 'explainPadCharacter',
						},
						GO_TO_LAST_STEP: {
							actions: 'setFlagSkipDemo',
							cond: 'autoPlayDisabled',
							target: 'createdAllOutputChunks',
						},
					},
				},
				explainPadCharacter: {
					after: {
						'1000': {
							cond: 'autoPlayEnabled',
							target: 'createLastPaddedChunk',
						},
					},
					on: {
						RESUME_AUTO_PLAY: {
							actions: 'startAutoPlay',
							cond: 'autoPlayDisabled',
							target: 'createLastPaddedChunk',
						},
						STOP_AUTO_PLAY: {
							actions: 'stopAutoPlay',
							cond: 'autoPlayEnabled',
						},
						RESET: {
							actions: 'resetInput',
							cond: 'autoPlayDisabled',
							target: '#b64Encode.inactive',
						},
						GO_TO_FIRST_STEP: {
							cond: 'autoPlayDisabled',
							target: '#b64Encode.inactive',
						},
						GO_TO_PREV_STEP: {
							cond: 'autoPlayDisabled',
							target: 'explainLastPaddedChunk',
						},
						GO_TO_NEXT_STEP: {
							cond: 'autoPlayDisabled',
							target: 'createLastPaddedChunk',
						},
						GO_TO_LAST_STEP: {
							actions: 'setFlagSkipDemo',
							cond: 'autoPlayDisabled',
							target: 'createdAllOutputChunks',
						},
					},
				},
				createLastPaddedChunk: {
					after: {
						'1000': {
							cond: 'autoPlayEnabled',
							target: 'createdAllOutputChunks',
						},
					},
					on: {
						RESUME_AUTO_PLAY: {
							actions: 'startAutoPlay',
							cond: 'autoPlayDisabled',
							target: 'createdAllOutputChunks',
						},
						STOP_AUTO_PLAY: {
							actions: 'stopAutoPlay',
							cond: 'autoPlayEnabled',
						},
						RESET: {
							actions: 'resetInput',
							cond: 'autoPlayDisabled',
							target: '#b64Encode.inactive',
						},
						GO_TO_FIRST_STEP: {
							cond: 'autoPlayDisabled',
							target: '#b64Encode.inactive',
						},
						GO_TO_PREV_STEP: [
							{
								cond: 'lastChunkIsPadded',
								target: 'explainPadCharacter',
							},
							{
								cond: 'allOutputChunksRemaining',
								target: 'idle',
							},
						],
						GO_TO_NEXT_STEP: {
							cond: 'autoPlayDisabled',
							target: 'createdAllOutputChunks',
						},
						GO_TO_LAST_STEP: {
							actions: 'setFlagSkipDemo',
							cond: 'autoPlayDisabled',
							target: 'createdAllOutputChunks',
						},
					},
				},
				createdAllOutputChunks: {
					type: 'final',
				},
			},
			onDone: [
				{
					cond: 'yesSkipDemo',
					target: 'finished',
				},
				{
					target: 'encodeOutput',
				},
			],
		},
		encodeOutput: {
			initial: 'idle',
			states: {
				idle: {
					entry: 'resetRemainingBase64Chars',
					after: {
						'1000': {
							cond: 'autoPlayEnabled',
							target: 'autoPlayEncodeBase64',
						},
					},
					on: {
						RESUME_AUTO_PLAY: {
							actions: 'startAutoPlay',
							cond: 'autoPlayDisabled',
							target: 'autoPlayEncodeBase64',
						},
						STOP_AUTO_PLAY: {
							actions: 'stopAutoPlay',
							cond: 'autoPlayEnabled',
						},
						RESET: {
							actions: 'resetInput',
							cond: 'autoPlayDisabled',
							target: '#b64Encode.inactive',
						},
						GO_TO_FIRST_STEP: {
							cond: 'autoPlayDisabled',
							target: '#b64Encode.inactive',
						},
						GO_TO_PREV_STEP: [
							{
								actions: 'resetNoOutputChunksRemaining',
								cond: 'currentOutputChunkIsPadded',
								target: '#b64Encode.createOutputChunks.createLastPaddedChunk',
							},
							{
								actions: 'resetNoOutputChunksRemaining',
								cond: 'autoPlayDisabled',
								target: '#b64Encode.createOutputChunks.createOutputChunk',
							},
						],
						GO_TO_NEXT_STEP: {
							cond: 'autoPlayDisabled',
							target: 'encodeBase64',
						},
						GO_TO_LAST_STEP: {
							actions: 'setFlagSkipDemo',
							cond: 'autoPlayDisabled',
							target: 'encodingComplete',
						},
					},
				},
				autoPlayEncodeBase64: {
					entry: 'getCurrentBase64Char',
					after: {
						'1000': [
							{
								actions: 'mapNextBase64Char',
								cond: 'base64CharsRemaining',
								target: 'autoPlayEncodeBase64',
								internal: false,
							},
							{
								cond: 'noBase64CharsRemaining',
								target: 'encodingComplete',
							},
						],
					},
					on: {
						STOP_AUTO_PLAY: {
							actions: 'stopAutoPlay',
							cond: 'autoPlayEnabled',
							target: 'encodeBase64',
						},
					},
				},
				encodeBase64: {
					entry: 'getCurrentBase64Char',
					on: {
						RESUME_AUTO_PLAY: {
							actions: 'startAutoPlay',
							cond: 'autoPlayDisabled',
							target: 'autoPlayEncodeBase64',
						},
						RESET: {
							actions: 'resetInput',
							cond: 'autoPlayDisabled',
							target: '#b64Encode.inactive',
						},
						GO_TO_FIRST_STEP: {
							cond: 'autoPlayDisabled',
							target: '#b64Encode.inactive',
						},
						GO_TO_PREV_STEP: [
							{
								actions: 'mapPreviousBase64Char',
								cond: 'hasPreviousBase64Char',
								target: 'encodeBase64',
								internal: false,
							},
							{
								cond: 'allBase64CharsRemaining',
								target: 'idle',
							},
						],
						GO_TO_NEXT_STEP: [
							{
								actions: 'mapNextBase64Char',
								cond: 'base64CharsRemaining',
								target: 'encodeBase64',
								internal: false,
							},
							{
								cond: 'noBase64CharsRemaining',
								target: 'encodingComplete',
							},
						],
						GO_TO_LAST_STEP: {
							actions: 'setFlagSkipDemo',
							cond: 'autoPlayDisabled',
							target: 'encodingComplete',
						},
					},
				},
				encodingComplete: {
					type: 'final',
				},
			},
			onDone: {
				target: 'finished',
			},
		},
		finished: {
			entry: ['updateContextForLastStep'],
			after: {
				10: { actions: 'stopAutoPlay', cond: 'autoPlayEnabled' },
			},
			on: {
				RESET: {
					actions: 'resetInput',
					cond: 'autoPlayDisabled',
					target: 'inactive',
				},
				GO_TO_FIRST_STEP: {
					cond: 'autoPlayDisabled',
					target: 'inactive',
				},
				GO_TO_PREV_STEP: {
					actions: 'resetNoBase64CharsRemaining',
					cond: 'autoPlayDisabled',
					target: '#b64Encode.encodeOutput.encodeBase64',
				},
			},
		},
	},
};

export const encodingMachineOptions: MachineOptions<
	EncodingContext,
	EncodingEvent,
	BaseActionObject,
	ServiceMap,
	ResolveTypegenMeta<TypegenDisabled, EncodingEvent, BaseActionObject, ServiceMap>
> = {
	actions: {
		resetContext: assign({
			resetForm: (context: EncodingContext) => context.resetForm,
			autoplay: false,
			skipDemo: false,
			byteMaps: [defaultHexByteMap],
			updatedByteMaps: [],
			byteIndex: 0,
			currentByte: defaultHexByteMap,
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
			input: (context: EncodingContext) => context.input,
			output: defaultEncoderOutput,
		}),
		resetInput: assign({
			resetForm: (_) => true,
			input: (_) => defaultEncoderInput,
		}),
		clearResetFlag: assign({ resetForm: (_) => false }),
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
			inputChunkIndex: 0,
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
			updatedByteMaps: (_) => [],
		}),
		resetRemainingBytes: assign({
			byteIndex: (_) => 0,
			updatedByteMaps: (_) => [],
			currentByte: (_) => defaultHexByteMap,
			remainingBytes: (context: EncodingContext) => context.byteMaps.length - 1,
		}),
		resetNoBytesRemaining: assign({
			byteIndex: (context: EncodingContext) => context.byteMaps.length - 1,
			remainingBytes: (_) => 0,
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
			updatedInputChunks: (_) => [],
			inputChunkIndex: (_) => 0,
			currentInputChunk: (_) => defaultEncoderInputChunk,
			remainingInputChunks: (context: EncodingContext) => context.input.totalChunks - 1,
		}),
		resetNoInputChunksRemaining: assign({
			inputChunkIndex: (context: EncodingContext) => context.input.totalChunks - 1,
			remainingInputChunks: (_) => 0,
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
			updatedOutputChunks: (_) => [],
			outputChunkIndex: (_) => 0,
			currentOutputChunk: (_) => defaultOutputChunk,
			remainingOutputChunks: (context: EncodingContext) => context.input.totalChunks - 1,
		}),
		resetNoOutputChunksRemaining: assign({
			outputChunkIndex: (context: EncodingContext) => context.input.totalChunks - 1,
			remainingOutputChunks: (_) => 0,
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
			updatedBase64Maps: (_) => [],
		}),
		resetRemainingBase64Chars: assign({
			base64CharIndex: (_) => 0,
			updatedBase64Maps: (_) => [],
			currentBase64Char: (_) => defaultBase64ByteMap,
			remainingBase64Chars: (context: EncodingContext) => context.base64Maps.length - 1,
		}),
		resetNoBase64CharsRemaining: assign({
			base64CharIndex: (context: EncodingContext) => context.base64Maps.length - 1,
			remainingBase64Chars: (_) => 0,
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
			remainingInputChunks: (_) => 0,
		}),
	},
	guards: {
		defaultSettingsChanged: (context: EncodingContext) =>
			context.input.inputText !== '' ||
			context.input.inputEncoding !== 'ASCII' ||
			context.input.outputEncoding !== 'base64',
		formResetRequested: (context: EncodingContext) => context.resetForm,
		autoPlayEnabled: (context: EncodingContext) => context.autoplay,
		autoPlayDisabled: (context: EncodingContext) => !context.autoplay,
		yesSkipDemo: (context: EncodingContext) => context.skipDemo,
		inputTextIsInvalid: (context: EncodingContext) => !context.input.validationResult.success,
		bytesRemaining: (context: EncodingContext) => context.remainingBytes > 0,
		noBytesRemaining: (context: EncodingContext) => context.remainingBytes === 0,
		allBytesRemaining: (context: EncodingContext) => context.remainingBytes + 1 === context.byteMaps.length,
		hasPreviousByte: (context: EncodingContext) => context.byteIndex > 0,
		inputChunksRemaining: (context: EncodingContext) =>
			context.input.lastChunkPadded ? context.remainingInputChunks > 1 : context.remainingInputChunks > 0,
		lastChunkIsPadded: (context: EncodingContext) => !context.autoplay && context.input.lastChunkPadded,
		finalPaddedInputChunkRemaining: (context: EncodingContext) =>
			(context.remainingInputChunks === 1 && context.input.lastChunkPadded) || false,
		onlyOnePaddedChunk: (context: EncodingContext) => context.input.totalChunks === 1 && context.input.lastChunkPadded,
		noInputChunksRemaining: (context: EncodingContext) => context.remainingInputChunks === 0,
		allInputChunksRemaining: (context: EncodingContext) =>
			context.remainingInputChunks + 1 === context.input.totalChunks,
		currentInputChunkIsPadded: (context: EncodingContext) =>
			!context.autoplay && context.currentInputChunk.bytes.length !== 3,
		hasPreviousInputChunk: (context: EncodingContext) => !context.autoplay && context.inputChunkIndex > 0,
		outputChunksRemaining: (context: EncodingContext) =>
			context.input.lastChunkPadded ? context.remainingOutputChunks > 1 : context.remainingOutputChunks > 0,
		finalPaddedOutputChunkRemaining: (context: EncodingContext) =>
			(context.remainingOutputChunks === 1 && context.input.lastChunkPadded) || false,
		noOutputChunksRemaining: (context: EncodingContext) => context.remainingOutputChunks === 0,
		allOutputChunksRemaining: (context: EncodingContext) =>
			!context.autoplay && context.remainingOutputChunks + 1 === context.input.totalChunks,
		currentOutputChunkIsPadded: (context: EncodingContext) =>
			!context.autoplay && context.currentOutputChunk.bytes.length !== 3,
		hasPreviousOutputChunk: (context: EncodingContext) => !context.autoplay && context.outputChunkIndex > 0,
		base64CharsRemaining: (context: EncodingContext) => context.remainingBase64Chars > 0,
		noBase64CharsRemaining: (context: EncodingContext) => context.remainingBase64Chars === 0,
		allBase64CharsRemaining: (context: EncodingContext) =>
			context.remainingBase64Chars + 1 === context.base64Maps.length,
		hasPreviousBase64Char: (context: EncodingContext) => context.base64CharIndex > 0,
	},
};
