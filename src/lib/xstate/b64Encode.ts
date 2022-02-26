import { b64Encode } from '$lib/base64';
import { defaultEncoderInput, defaultEncoderOutput, defaultOutputChunk } from '$lib/constants';
import { validateEncoderInput } from '$lib/dataPrep';
import type { Base64Encoding, EncoderInput, EncoderOutput, OutputChunk, StringEncoding } from '$lib/types';
import { assign, createMachine } from 'xstate';

export interface EncodingContext {
	autoplay: boolean;
	chunkIndex: number;
	currentChunk: OutputChunk;
	remainingChunks: number;
	input: EncoderInput;
	output: EncoderOutput;
}

export type EncodingEvent =
	| { type: 'RESET' }
	| { type: 'VALIDATE_INPUT'; inputText: string; inputEncoding: StringEncoding; outputEncoding: Base64Encoding }
	| { type: 'GO_TO_FIRST_STEP' }
	| { type: 'GO_TO_PREV_STEP' }
	| { type: 'GO_TO_NEXT_STEP' }
	| { type: 'GO_TO_LAST_STEP' }
	| { type: 'START_AUTO_PLAY'; inputText: string; inputEncoding: StringEncoding; outputEncoding: Base64Encoding }
	| { type: 'STOP_AUTO_PLAY' };

export type EncodingTypeState =
	| {
			value: 'inactive';
			context: EncodingContext;
	  }
	| {
			value: 'validateInputText';
			context: EncodingContext;
	  }
	| {
			value: 'inputTextError';
			context: EncodingContext;
	  }
	| {
			value: 'createBinaryChunks';
			context: EncodingContext;
	  }
	| {
			value: 'mapChunkBytesToBase64';
			context: EncodingContext;
	  }
	| {
			value: { mapChunkBytesToBase64: 'idle' };
			context: EncodingContext;
	  }
	| {
			value: { mapChunkBytesToBase64: 'autoPlayMapSingleChunk' };
			context: EncodingContext;
	  }
	| {
			value: { mapChunkBytesToBase64: 'mapSingleChunk' };
			context: EncodingContext;
	  }
	| {
			value: { mapChunkBytesToBase64: 'mapLastPaddedChunk' };
			context: EncodingContext;
	  }
	| {
			value: { mapChunkBytesToBase64: 'mappingComplete' };
			context: EncodingContext;
	  }
	| {
			value: 'finished';
			context: EncodingContext;
	  }
	| {
			value: 'teardown';
			context: EncodingContext;
	  };

export const encodingMachine = createMachine<EncodingContext, EncodingEvent, EncodingTypeState>(
	{
		id: 'b64Encode',
		initial: 'inactive',
		context: {
			autoplay: false,
			chunkIndex: 0,
			currentChunk: defaultOutputChunk,
			remainingChunks: 0,
			input: defaultEncoderInput,
			output: defaultEncoderOutput
		},
		states: {
			inactive: {
				entry: ['stopAutoPlay'],
				id: 'inactive',
				on: {
					START_AUTO_PLAY: { target: 'validateInputText', actions: ['validate', 'startAutoPlay'] },
					VALIDATE_INPUT: { target: 'validateInputText', actions: 'validate' }
				}
			},
			validateInputText: {
				always: [{ target: 'inputTextError', cond: 'inputTextIsInvalid' }, { target: 'createBinaryChunks' }]
			},
			inputTextError: {
				entry: ['stopAutoPlay'],
				on: {
					START_AUTO_PLAY: { target: 'validateInputText', actions: ['validate', 'startAutoPlay'] },
					VALIDATE_INPUT: { target: 'validateInputText', actions: 'validate' },
					RESET: { target: 'inactive', actions: 'reset', cond: 'autoPlayDisabled' }
				}
			},
			createBinaryChunks: {
				id: 'createBinaryChunks',
				after: {
					3000: { target: 'mapChunkBytesToBase64', cond: 'autoPlayEnabled' }
				},
				on: {
					START_AUTO_PLAY: { target: 'mapChunkBytesToBase64', actions: 'startAutoPlay', cond: 'autoPlayDisabled' },
					STOP_AUTO_PLAY: { actions: 'stopAutoPlay', cond: 'autoPlayEnabled' },
					RESET: { target: 'inactive', actions: 'reset', cond: 'autoPlayDisabled' },
					GO_TO_FIRST_STEP: { target: 'inactive', cond: 'autoPlayDisabled' },
					GO_TO_PREV_STEP: { target: 'inactive', cond: 'autoPlayDisabled' },
					GO_TO_NEXT_STEP: { target: 'mapChunkBytesToBase64', cond: 'autoPlayDisabled' },
					GO_TO_LAST_STEP: { target: 'finished', cond: 'autoPlayDisabled' }
				}
			},
			mapChunkBytesToBase64: {
				entry: ['encode'],
				initial: 'idle',
				states: {
					idle: {
						entry: ['resetRemainingChunks'],
						after: {
							3000: { target: 'autoPlayMapSingleChunk', cond: 'autoPlayEnabled' }
						},
						on: {
							START_AUTO_PLAY: {
								target: 'autoPlayMapSingleChunk',
								actions: 'startAutoPlay',
								cond: 'autoPlayDisabled'
							},
							STOP_AUTO_PLAY: { actions: 'stopAutoPlay', cond: 'autoPlayEnabled' },
							GO_TO_FIRST_STEP: { target: '#inactive', cond: 'autoPlayDisabled' },
							GO_TO_PREV_STEP: { target: '#createBinaryChunks', cond: 'autoPlayDisabled' },
							GO_TO_NEXT_STEP: { target: 'mapSingleChunk', cond: 'autoPlayDisabled' },
							GO_TO_LAST_STEP: { target: 'mappingComplete', cond: 'autoPlayDisabled' }
						}
					},
					autoPlayMapSingleChunk: {
						entry: ['getCurrentChunk'],
						after: {
							3000: [
								{
									target: 'autoPlayMapSingleChunk',
									actions: 'mapNextChunk',
									cond: 'chunksRemaining'
								},
								{
									target: 'mapLastPaddedChunk',
									actions: 'mapNextChunk',
									cond: 'finalPaddedChunkRemaining'
								},
								{ target: 'mappingComplete', cond: 'noChunksRemaining' }
							]
						},
						on: {
							START_AUTO_PLAY: {
								target: 'autoPlayMapSingleChunk',
								actions: 'startAutoPlay',
								cond: 'autoPlayDisabled'
							},
							STOP_AUTO_PLAY: { actions: 'stopAutoPlay', cond: 'autoPlayEnabled' },
							RESET: { target: '#inactive', actions: 'reset', cond: 'autoPlayDisabled' },
							GO_TO_FIRST_STEP: { target: '#inactive', cond: 'autoPlayDisabled' },
							GO_TO_PREV_STEP: { target: '#createBinaryChunks', cond: 'autoPlayDisabled' },
							GO_TO_NEXT_STEP: { target: 'mapSingleChunk', cond: 'autoPlayDisabled' },
							GO_TO_LAST_STEP: { target: 'mappingComplete', cond: 'autoPlayDisabled' }
						}
					},
					mapSingleChunk: {
						entry: ['getCurrentChunk'],
						on: {
							START_AUTO_PLAY: {
								target: 'autoPlayMapSingleChunk',
								actions: 'startAutoPlay',
								cond: 'autoPlayDisabled'
							},
							STOP_AUTO_PLAY: { actions: 'stopAutoPlay', cond: 'autoPlayEnabled' },
							RESET: { target: '#inactive', actions: 'reset', cond: 'autoPlayDisabled' },
							GO_TO_FIRST_STEP: { target: '#inactive', cond: 'autoPlayDisabled' },
							GO_TO_PREV_STEP: [
								{ target: 'mapSingleChunk', actions: 'mapPreviousChunk', cond: 'hasPreviousChunk' },
								{ target: 'idle', cond: 'allChunksRemaining' }
							],
							GO_TO_NEXT_STEP: [
								{ target: 'mapSingleChunk', actions: 'mapNextChunk', cond: 'chunksRemaining' },
								{ target: 'mapLastPaddedChunk', actions: 'mapNextChunk', cond: 'finalPaddedChunkRemaining' },
								{ target: 'mappingComplete', cond: 'noChunksRemaining' }
							],
							GO_TO_LAST_STEP: { target: 'mappingComplete', cond: 'autoPlayDisabled' }
						}
					},
					mapLastPaddedChunk: {
						entry: ['getCurrentChunk'],
						after: {
							5000: { target: 'mappingComplete', actions: 'mapNextChunk', cond: 'autoPlayEnabled' }
						},
						on: {
							START_AUTO_PLAY: {
								target: 'mappingComplete',
								actions: 'startAutoPlay',
								cond: 'autoPlayDisabled'
							},
							STOP_AUTO_PLAY: { actions: 'stopAutoPlay', cond: 'autoPlayEnabled' },
							RESET: { target: '#inactive', actions: 'reset', cond: 'autoPlayDisabled' },
							GO_TO_FIRST_STEP: { target: '#inactive', cond: 'autoPlayDisabled' },
							GO_TO_PREV_STEP: [
								{ target: 'mapSingleChunk', actions: 'mapPreviousChunk', cond: 'hasPreviousChunk' },
								{ target: 'idle', cond: 'allChunksRemaining' }
							],
							GO_TO_NEXT_STEP: { target: 'mappingComplete', cond: 'autoPlayDisabled' },
							GO_TO_LAST_STEP: { target: 'mappingComplete', cond: 'autoPlayDisabled' }
						}
					},
					mappingComplete: {
						entry: ['zeroRemainingChunks'],
						type: 'final'
					}
				},
				onDone: 'finished'
			},
			finished: {
				entry: ['stopAutoPlay'],
				on: {
					START_AUTO_PLAY: { target: 'validateInputText', actions: 'startAutoPlay', cond: 'autoPlayDisabled' },
					RESET: { target: '#inactive', actions: 'reset', cond: 'autoPlayDisabled' },
					GO_TO_FIRST_STEP: { target: '#inactive', cond: 'autoPlayDisabled' },
					GO_TO_PREV_STEP: { target: 'mapChunkBytesToBase64', cond: 'autoPlayDisabled' }
				}
			}
		}
	},
	{
		actions: {
			reset: assign({
				autoplay: (_: EncodingContext) => false,
				chunkIndex: (_: EncodingContext) => 0,
				currentChunk: (_: EncodingContext) => defaultOutputChunk,
				remainingChunks: (_: EncodingContext) => 0,
				input: (_: EncodingContext) => defaultEncoderInput,
				output: (_: EncodingContext) => defaultEncoderOutput
			}),
			startAutoPlay: assign({ autoplay: (_) => true }),
			stopAutoPlay: assign({ autoplay: (_) => false }),
			validate: assign({
				input: (_: EncodingContext, event: EncodingEvent) => {
					if (event.type === 'VALIDATE_INPUT' || event.type === 'START_AUTO_PLAY') {
						return validateEncoderInput(event.inputText, event.inputEncoding, event.outputEncoding);
					}
				}
			}),
			encode: assign({
				chunkIndex: (_: EncodingContext) => 0,
				remainingChunks: (context: EncodingContext) => context.input.totalChunks,
				output: (context: EncodingContext) => {
					if (context.input.validationResult.success) {
						return b64Encode(context.input);
					}
				}
			}),
			getCurrentChunk: assign({
				currentChunk: (context: EncodingContext) => context.output.chunks[context.chunkIndex]
			}),
			resetRemainingChunks: assign({
				chunkIndex: (_: EncodingContext) => 0,
				currentChunk: (_: EncodingContext) => defaultOutputChunk,
				remainingChunks: (context: EncodingContext) => context.input.totalChunks - 1
			}),
			mapNextChunk: assign({
				chunkIndex: (context: EncodingContext) => context.chunkIndex + 1,
				remainingChunks: (context: EncodingContext) => context.remainingChunks - 1
			}),
			mapPreviousChunk: assign({
				chunkIndex: (context: EncodingContext) => context.chunkIndex - 1,
				remainingChunks: (context: EncodingContext) => context.remainingChunks + 1
			}),
			zeroRemainingChunks: assign({
				chunkIndex: (_: EncodingContext) => 0,
				currentChunk: (_: EncodingContext) => defaultOutputChunk,
				remainingChunks: (_: EncodingContext) => 0
			})
		},
		guards: {
			autoPlayEnabled: (context: EncodingContext) => context.autoplay,
			autoPlayDisabled: (context: EncodingContext) => !context.autoplay,
			inputTextIsInvalid: (context: EncodingContext) => !context.input.validationResult.success,
			chunksRemaining: (context: EncodingContext) =>
				(context.remainingChunks > 0 && !context.input.lastChunkPadded) ||
				(context.remainingChunks > 1 && context.input.lastChunkPadded),
			finalPaddedChunkRemaining: (context: EncodingContext) =>
				context.remainingChunks === 1 && context.input.lastChunkPadded,
			noChunksRemaining: (context: EncodingContext) => context.remainingChunks === 0,
			allChunksRemaining: (context: EncodingContext) => context.remainingChunks + 1 === context.input.totalChunks,
			hasPreviousChunk: (context: EncodingContext) => context.chunkIndex > 0
		}
	}
);
