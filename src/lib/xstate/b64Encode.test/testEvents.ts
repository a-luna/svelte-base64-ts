/* c8 ignore start */
import type { TestFunctionInputData } from '$lib/xstate/b64Encode.test/types';

const asciiHappyPathEvents: TestFunctionInputData = {
	scriptName: 'asciiHappyPath',
	description: 'encode ascii string, execute all steps manually',
	type: 'fast',
	events: [
		{
			event: {
				type: 'UPDATE_TEXT',
				inputText: 't',
				inputEncoding: 'ASCII',
				outputEncoding: 'base64',
			},
			expectedState: {
				state: 'inactive',
				substate: 'none',
			},
		},
		{
			event: {
				type: 'UPDATE_TEXT',
				inputText: 'te',
				inputEncoding: 'ASCII',
				outputEncoding: 'base64',
			},
			expectedState: {
				state: 'inactive',
				substate: 'none',
			},
		},
		{
			event: {
				type: 'UPDATE_TEXT',
				inputText: 'tes',
				inputEncoding: 'ASCII',
				outputEncoding: 'base64',
			},
			expectedState: {
				state: 'inactive',
				substate: 'none',
			},
		},
		{
			event: {
				type: 'UPDATE_TEXT',
				inputText: 'test',
				inputEncoding: 'ASCII',
				outputEncoding: 'base64',
			},
			expectedState: {
				state: 'inactive',
				substate: 'none',
			},
		},
		{
			event: {
				type: 'VALIDATE_TEXT',
				inputText: 'test',
				inputEncoding: 'ASCII',
				outputEncoding: 'base64',
			},
			expectedState: {
				state: 'validateInputText',
				substate: 'success',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'idle',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'explainByteMapping',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createInputChunks',
				substate: 'regularIdle',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createInputChunks',
				substate: 'createInputChunk',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createInputChunks',
				substate: 'explainLastPaddedChunk',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createInputChunks',
				substate: 'createLastPaddedChunk',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createOutputChunks',
				substate: 'regularIdle',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createOutputChunks',
				substate: 'createOutputChunk',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createOutputChunks',
				substate: 'explainLastPaddedChunk',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createOutputChunks',
				substate: 'explainPadCharacter',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createOutputChunks',
				substate: 'createLastPaddedChunk',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'idle',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'verifyResults',
				substate: 'none',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'finished',
				substate: 'none',
			},
		},
	],
};

const asciiHappyPathAutoplayEvents: TestFunctionInputData = {
	scriptName: 'asciiHappyPathAutoplay',
	description: 'encode ascii string, execute all steps with autoplay',
	type: 'slow',
	events: [
		{
			event: {
				type: 'UPDATE_TEXT',
				inputText: 't',
				inputEncoding: 'ASCII',
				outputEncoding: 'base64',
			},
			expectedState: {
				state: 'inactive',
				substate: 'none',
			},
		},
		{
			event: {
				type: 'UPDATE_TEXT',
				inputText: 'te',
				inputEncoding: 'ASCII',
				outputEncoding: 'base64',
			},
			expectedState: {
				state: 'inactive',
				substate: 'none',
			},
		},
		{
			event: {
				type: 'UPDATE_TEXT',
				inputText: 'tes',
				inputEncoding: 'ASCII',
				outputEncoding: 'base64',
			},
			expectedState: {
				state: 'inactive',
				substate: 'none',
			},
		},
		{
			event: {
				type: 'UPDATE_TEXT',
				inputText: 'test',
				inputEncoding: 'ASCII',
				outputEncoding: 'base64',
			},
			expectedState: {
				state: 'inactive',
				substate: 'none',
			},
		},
		{
			event: {
				type: 'START_AUTOPLAY',
				inputText: 'test',
				inputEncoding: 'ASCII',
				outputEncoding: 'base64',
			},
			expectedState: {
				state: 'validateInputText',
				substate: 'success',
			},
		},
		{
			event: {
				type: 'AUTOPLAYING',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'idle',
			},
		},
		{
			event: {
				type: 'AUTOPLAYING',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'autoPlayEncodeByte',
			},
		},
		{
			event: {
				type: 'AUTOPLAYING',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'autoPlayEncodeByte',
			},
		},
		{
			event: {
				type: 'AUTOPLAYING',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'autoPlayEncodeByte',
			},
		},
		{
			event: {
				type: 'AUTOPLAYING',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'autoPlayEncodeByte',
			},
		},
		{
			event: {
				type: 'AUTOPLAYING',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'explainByteMapping',
			},
		},
		{
			event: {
				type: 'AUTOPLAYING',
			},
			expectedState: {
				state: 'createInputChunks',
				substate: 'autoPlayIdle',
			},
		},
		{
			event: {
				type: 'AUTOPLAYING',
			},
			expectedState: {
				state: 'createInputChunks',
				substate: 'autoPlayCreateInputChunk',
			},
		},
		{
			event: {
				type: 'AUTOPLAYING',
			},
			expectedState: {
				state: 'createInputChunks',
				substate: 'explainLastPaddedChunk',
			},
		},
		{
			event: {
				type: 'AUTOPLAYING',
			},
			expectedState: {
				state: 'createInputChunks',
				substate: 'createLastPaddedChunk',
			},
		},
		{
			event: {
				type: 'AUTOPLAYING',
			},
			expectedState: {
				state: 'createOutputChunks',
				substate: 'autoPlayIdle',
			},
		},
		{
			event: {
				type: 'AUTOPLAYING',
			},
			expectedState: {
				state: 'createOutputChunks',
				substate: 'autoPlayCreateOutputChunk',
			},
		},
		{
			event: {
				type: 'AUTOPLAYING',
			},
			expectedState: {
				state: 'createOutputChunks',
				substate: 'explainLastPaddedChunk',
			},
		},
		{
			event: {
				type: 'AUTOPLAYING',
			},
			expectedState: {
				state: 'createOutputChunks',
				substate: 'explainPadCharacter',
			},
		},
		{
			event: {
				type: 'AUTOPLAYING',
			},
			expectedState: {
				state: 'createOutputChunks',
				substate: 'createLastPaddedChunk',
			},
		},
		{
			event: {
				type: 'AUTOPLAYING',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'idle',
			},
		},
		{
			event: {
				type: 'AUTOPLAYING',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'autoPlayEncodeBase64',
			},
		},
		{
			event: {
				type: 'AUTOPLAYING',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'autoPlayEncodeBase64',
			},
		},
		{
			event: {
				type: 'AUTOPLAYING',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'autoPlayEncodeBase64',
			},
		},
		{
			event: {
				type: 'AUTOPLAYING',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'autoPlayEncodeBase64',
			},
		},
		{
			event: {
				type: 'AUTOPLAYING',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'autoPlayEncodeBase64',
			},
		},
		{
			event: {
				type: 'AUTOPLAYING',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'autoPlayEncodeBase64',
			},
		},
		{
			event: {
				type: 'AUTOPLAYING',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'autoPlayEncodeBase64',
			},
		},
		{
			event: {
				type: 'AUTOPLAYING',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'autoPlayEncodeBase64',
			},
		},
		{
			event: {
				type: 'AUTOPLAYING',
			},
			expectedState: {
				state: 'verifyResults',
				substate: 'none',
			},
		},
		{
			event: {
				type: 'AUTOPLAYING',
			},
			expectedState: {
				state: 'finished',
				substate: 'none',
			},
		},
	],
};

const asciiHappyPathSkipDemoEvents: TestFunctionInputData = {
	scriptName: 'asciiHappyPathSkipDemo',
	description: 'encode ascii string, skip demo',
	type: 'fast',
	events: [
		{
			event: {
				type: 'UPDATE_TEXT',
				inputText: 'test',
				inputEncoding: 'ASCII',
				outputEncoding: 'base64url',
			},
			expectedState: {
				state: 'inactive',
				substate: 'none',
			},
		},
		{
			event: {
				type: 'SKIP_DEMO',
				inputText: 'test',
				inputEncoding: 'ASCII',
				outputEncoding: 'base64url',
			},
			expectedState: {
				state: 'finished',
				substate: 'none',
			},
		},
	],
};

const asciiValidationErrorEvents: TestFunctionInputData = {
	scriptName: 'asciiValidationError',
	description: 'encode ascii string, validation error',
	type: 'fast',
	events: [
		{
			event: {
				type: 'START_AUTOPLAY',
				inputText: '',
				inputEncoding: 'ASCII',
				outputEncoding: 'base64url',
			},
			expectedState: {
				state: 'validateInputText',
				substate: 'error',
			},
		},
		{
			event: {
				type: 'UPDATE_TEXT',
				inputText: 'do§',
				inputEncoding: 'ASCII',
				outputEncoding: 'base64url',
			},
			expectedState: {
				state: 'inactive',
				substate: 'none',
			},
		},
		{
			event: {
				type: 'SKIP_DEMO',
				inputText: 'do§',
				inputEncoding: 'ASCII',
				outputEncoding: 'base64url',
			},
			expectedState: {
				state: 'validateInputText',
				substate: 'error',
			},
		},
		{
			event: {
				type: 'UPDATE_TEXT',
				inputText: 'do',
				inputEncoding: 'ASCII',
				outputEncoding: 'base64url',
			},
			expectedState: {
				state: 'inactive',
				substate: 'none',
			},
		},
		{
			event: {
				type: 'UPDATE_TEXT',
				inputText: 'dog',
				inputEncoding: 'ASCII',
				outputEncoding: 'base64url',
			},
			expectedState: {
				state: 'inactive',
				substate: 'none',
			},
		},
		{
			event: {
				type: 'VALIDATE_TEXT',
				inputText: 'dog',
				inputEncoding: 'ASCII',
				outputEncoding: 'base64url',
			},
			expectedState: {
				state: 'validateInputText',
				substate: 'success',
			},
		},
		{
			event: {
				type: 'GO_TO_LAST_STEP',
			},
			expectedState: {
				state: 'finished',
				substate: 'none',
			},
		},
	],
};

const asciiWithSymbolsEvents: TestFunctionInputData = {
	scriptName: 'asciiWithSymbols',
	description: 'encode ascii string, with symbol characters',
	type: 'fast',
	events: [
		{
			event: {
				type: 'UPDATE_TEXT',
				inputText: 'test&^%#*&()',
				inputEncoding: 'ASCII',
				outputEncoding: 'base64url',
			},
			expectedState: {
				state: 'inactive',
				substate: 'none',
			},
		},
		{
			event: {
				type: 'VALIDATE_TEXT',
				inputText: 'test&^%#*&()',
				inputEncoding: 'ASCII',
				outputEncoding: 'base64url',
			},
			expectedState: {
				state: 'validateInputText',
				substate: 'success',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'idle',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'explainByteMapping',
			},
		},
		{
			event: {
				type: 'GO_TO_LAST_STEP',
			},
			expectedState: {
				state: 'finished',
				substate: 'none',
			},
		},
	],
};

const hexHappyPathEvents: TestFunctionInputData = {
	scriptName: 'hexHappyPath',
	description: 'encode hex string, execute all steps manually',
	type: 'fast',
	events: [
		{
			event: {
				type: 'UPDATE_TEXT',
				inputText: '0d47bc37af',
				inputEncoding: 'ASCII',
				outputEncoding: 'base64',
			},
			expectedState: {
				state: 'inactive',
				substate: 'none',
			},
		},
		{
			event: {
				type: 'UPDATE_TEXT',
				inputText: '0d47bc37af',
				inputEncoding: 'hex',
				outputEncoding: 'base64',
			},
			expectedState: {
				state: 'inactive',
				substate: 'none',
			},
		},
		{
			event: {
				type: 'VALIDATE_TEXT',
				inputText: '0d47bc37af',
				inputEncoding: 'hex',
				outputEncoding: 'base64',
			},
			expectedState: {
				state: 'validateInputText',
				substate: 'success',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'idle',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'explainByteMapping',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createInputChunks',
				substate: 'regularIdle',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createInputChunks',
				substate: 'createInputChunk',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createInputChunks',
				substate: 'explainLastPaddedChunk',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createInputChunks',
				substate: 'createLastPaddedChunk',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createOutputChunks',
				substate: 'regularIdle',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createOutputChunks',
				substate: 'createOutputChunk',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createOutputChunks',
				substate: 'explainLastPaddedChunk',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createOutputChunks',
				substate: 'explainPadCharacter',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createOutputChunks',
				substate: 'createLastPaddedChunk',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'idle',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'verifyResults',
				substate: 'none',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'finished',
				substate: 'none',
			},
		},
	],
};

const hexValidationErrorEvents: TestFunctionInputData = {
	scriptName: 'hexValidationError',
	description: 'encode hex string, validation error',
	type: 'fast',
	events: [
		{
			event: {
				type: 'UPDATE_TEXT',
				inputText: '746573t',
				inputEncoding: 'ASCII',
				outputEncoding: 'base64url',
			},
			expectedState: {
				state: 'inactive',
				substate: 'none',
			},
		},
		{
			event: {
				type: 'UPDATE_TEXT',
				inputText: '746573t',
				inputEncoding: 'hex',
				outputEncoding: 'base64url',
			},
			expectedState: {
				state: 'inactive',
				substate: 'none',
			},
		},
		{
			event: {
				type: 'VALIDATE_TEXT',
				inputText: '746573t',
				inputEncoding: 'hex',
				outputEncoding: 'base64url',
			},
			expectedState: {
				state: 'validateInputText',
				substate: 'error',
			},
		},
		{
			event: {
				type: 'UPDATE_TEXT',
				inputText: '746573',
				inputEncoding: 'hex',
				outputEncoding: 'base64url',
			},
			expectedState: {
				state: 'inactive',
				substate: 'none',
			},
		},
		{
			event: {
				type: 'UPDATE_TEXT',
				inputText: '74657',
				inputEncoding: 'hex',
				outputEncoding: 'base64url',
			},
			expectedState: {
				state: 'inactive',
				substate: 'none',
			},
		},
		{
			event: {
				type: 'VALIDATE_TEXT',
				inputText: '74657',
				inputEncoding: 'hex',
				outputEncoding: 'base64url',
			},
			expectedState: {
				state: 'validateInputText',
				substate: 'error',
			},
		},
		{
			event: {
				type: 'UPDATE_TEXT',
				inputText: '746573',
				inputEncoding: 'hex',
				outputEncoding: 'base64url',
			},
			expectedState: {
				state: 'inactive',
				substate: 'none',
			},
		},
		{
			event: {
				type: 'UPDATE_TEXT',
				inputText: '7465737',
				inputEncoding: 'hex',
				outputEncoding: 'base64url',
			},
			expectedState: {
				state: 'inactive',
				substate: 'none',
			},
		},
		{
			event: {
				type: 'UPDATE_TEXT',
				inputText: '74657374',
				inputEncoding: 'hex',
				outputEncoding: 'base64url',
			},
			expectedState: {
				state: 'inactive',
				substate: 'none',
			},
		},
		{
			event: {
				type: 'VALIDATE_TEXT',
				inputText: '74657374',
				inputEncoding: 'hex',
				outputEncoding: 'base64url',
			},
			expectedState: {
				state: 'validateInputText',
				substate: 'success',
			},
		},
		{
			event: {
				type: 'GO_TO_LAST_STEP',
			},
			expectedState: {
				state: 'finished',
				substate: 'none',
			},
		},
	],
};

const binHappyPathEvents: TestFunctionInputData = {
	scriptName: 'binHappyPath',
	description: 'encode bin string, execute all steps manually',
	type: 'fast',
	events: [
		{
			event: {
				type: 'UPDATE_TEXT',
				inputText: '01110100011001010111001101110100',
				inputEncoding: 'ASCII',
				outputEncoding: 'base64',
			},
			expectedState: {
				state: 'inactive',
				substate: 'none',
			},
		},
		{
			event: {
				type: 'UPDATE_TEXT',
				inputText: '01110100011001010111001101110100',
				inputEncoding: 'bin',
				outputEncoding: 'base64',
			},
			expectedState: {
				state: 'inactive',
				substate: 'none',
			},
		},
		{
			event: {
				type: 'VALIDATE_TEXT',
				inputText: '01110100011001010111001101110100',
				inputEncoding: 'bin',
				outputEncoding: 'base64',
			},
			expectedState: {
				state: 'validateInputText',
				substate: 'success',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'idle',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'explainByteMapping',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createInputChunks',
				substate: 'regularIdle',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createInputChunks',
				substate: 'createInputChunk',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createInputChunks',
				substate: 'explainLastPaddedChunk',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createInputChunks',
				substate: 'createLastPaddedChunk',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createOutputChunks',
				substate: 'regularIdle',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createOutputChunks',
				substate: 'createOutputChunk',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createOutputChunks',
				substate: 'explainLastPaddedChunk',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createOutputChunks',
				substate: 'explainPadCharacter',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createOutputChunks',
				substate: 'createLastPaddedChunk',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'idle',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'verifyResults',
				substate: 'none',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'finished',
				substate: 'none',
			},
		},
	],
};

const binHappyPathSkipDemoEvents: TestFunctionInputData = {
	scriptName: 'binHappyPathSkipDemo',
	description: 'encode bin string, skip demo',
	type: 'fast',
	events: [
		{
			event: {
				type: 'SKIP_DEMO',
				inputText: '01110100011001010111001101110100',
				inputEncoding: 'ASCII',
				outputEncoding: 'base64url',
			},
			expectedState: {
				state: 'finished',
				substate: 'none',
			},
		},
	],
};

const binValidationErrorEvents: TestFunctionInputData = {
	scriptName: 'binValidationError',
	description: 'encode bin string, validation error',
	type: 'fast',
	events: [
		{
			event: {
				type: 'START_AUTOPLAY',
				inputText: 'test',
				inputEncoding: 'bin',
				outputEncoding: 'base64url',
			},
			expectedState: {
				state: 'validateInputText',
				substate: 'error',
			},
		},
		{
			event: {
				type: 'SKIP_DEMO',
				inputText: '0101',
				inputEncoding: 'bin',
				outputEncoding: 'base64url',
			},
			expectedState: {
				state: 'validateInputText',
				substate: 'error',
			},
		},
		{
			event: {
				type: 'VALIDATE_TEXT',
				inputText: '01110100011001010111001101110100',
				inputEncoding: 'bin',
				outputEncoding: 'base64url',
			},
			expectedState: {
				state: 'validateInputText',
				substate: 'success',
			},
		},
		{
			event: {
				type: 'GO_TO_LAST_STEP',
			},
			expectedState: {
				state: 'finished',
				substate: 'none',
			},
		},
	],
};

const utf8HappyPathEvents: TestFunctionInputData = {
	scriptName: 'utf8HappyPath',
	description: 'encode utf8 string, execute all steps manually',
	type: 'fast',
	events: [
		{
			event: {
				type: 'UPDATE_TEXT',
				inputText: '🦦👨‍🌾🫥🏃🏿‍♀️☝🏾',
				inputEncoding: 'ASCII',
				outputEncoding: 'base64',
			},
			expectedState: {
				state: 'inactive',
				substate: 'none',
			},
		},
		{
			event: {
				type: 'UPDATE_TEXT',
				inputText: '🦦👨‍🌾🫥🏃🏿‍♀️☝🏾',
				inputEncoding: 'UTF-8',
				outputEncoding: 'base64',
			},
			expectedState: {
				state: 'inactive',
				substate: 'none',
			},
		},
		{
			event: {
				type: 'VALIDATE_TEXT',
				inputText: '🦦👨‍🌾🫥🏃🏿‍♀️☝🏾',
				inputEncoding: 'UTF-8',
				outputEncoding: 'base64',
			},
			expectedState: {
				state: 'validateInputText',
				substate: 'success',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'idle',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'encodeByte',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeInput',
				substate: 'explainByteMapping',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createInputChunks',
				substate: 'regularIdle',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createInputChunks',
				substate: 'createInputChunk',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createInputChunks',
				substate: 'createInputChunk',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createInputChunks',
				substate: 'createInputChunk',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createInputChunks',
				substate: 'createInputChunk',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createInputChunks',
				substate: 'createInputChunk',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createInputChunks',
				substate: 'createInputChunk',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createInputChunks',
				substate: 'createInputChunk',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createInputChunks',
				substate: 'createInputChunk',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createInputChunks',
				substate: 'createInputChunk',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createInputChunks',
				substate: 'createInputChunk',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createInputChunks',
				substate: 'createInputChunk',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createInputChunks',
				substate: 'createInputChunk',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createInputChunks',
				substate: 'createInputChunk',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createInputChunks',
				substate: 'createInputChunk',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createInputChunks',
				substate: 'explainLastPaddedChunk',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createInputChunks',
				substate: 'createLastPaddedChunk',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createOutputChunks',
				substate: 'regularIdle',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createOutputChunks',
				substate: 'createOutputChunk',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createOutputChunks',
				substate: 'createOutputChunk',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createOutputChunks',
				substate: 'createOutputChunk',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createOutputChunks',
				substate: 'createOutputChunk',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createOutputChunks',
				substate: 'createOutputChunk',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createOutputChunks',
				substate: 'createOutputChunk',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createOutputChunks',
				substate: 'createOutputChunk',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createOutputChunks',
				substate: 'createOutputChunk',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createOutputChunks',
				substate: 'createOutputChunk',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createOutputChunks',
				substate: 'createOutputChunk',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createOutputChunks',
				substate: 'createOutputChunk',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createOutputChunks',
				substate: 'createOutputChunk',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createOutputChunks',
				substate: 'createOutputChunk',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createOutputChunks',
				substate: 'createOutputChunk',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createOutputChunks',
				substate: 'explainLastPaddedChunk',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createOutputChunks',
				substate: 'explainPadCharacter',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'createOutputChunks',
				substate: 'createLastPaddedChunk',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'idle',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'encodeOutput',
				substate: 'encodeBase64',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'verifyResults',
				substate: 'none',
			},
		},
		{
			event: {
				type: 'GO_TO_NEXT_STEP',
			},
			expectedState: {
				state: 'finished',
				substate: 'none',
			},
		},
	],
};

const utf8MixedAsciiEvents: TestFunctionInputData = {
	scriptName: 'utf8MixedAscii',
	description: 'encode multiple utf8 strings, mix of ascii and utf8',
	type: 'fast',
	events: [
		{
			event: {
				type: 'VALIDATE_TEXT',
				inputText: '✓ à la mode',
				inputEncoding: 'UTF-8',
				outputEncoding: 'base64',
			},
			expectedState: {
				state: 'validateInputText',
				substate: 'success',
			},
		},
		{
			event: {
				type: 'GO_TO_LAST_STEP',
			},
			expectedState: {
				state: 'finished',
				substate: 'none',
			},
		},
		{
			event: {
				type: 'GO_TO_FIRST_STEP',
			},
			expectedState: {
				state: 'inactive',
				substate: 'none',
			},
		},
		{
			event: {
				type: 'VALIDATE_TEXT',
				inputText: '∑ßåœ ≈ ∆c',
				inputEncoding: 'UTF-8',
				outputEncoding: 'base64',
			},
			expectedState: {
				state: 'validateInputText',
				substate: 'success',
			},
		},
		{
			event: {
				type: 'GO_TO_LAST_STEP',
			},
			expectedState: {
				state: 'finished',
				substate: 'none',
			},
		},
		{
			event: {
				type: 'GO_TO_FIRST_STEP',
			},
			expectedState: {
				state: 'inactive',
				substate: 'none',
			},
		},
		{
			event: {
				type: 'VALIDATE_TEXT',
				inputText: '日本語文字列',
				inputEncoding: 'UTF-8',
				outputEncoding: 'base64',
			},
			expectedState: {
				state: 'validateInputText',
				substate: 'success',
			},
		},
		{
			event: {
				type: 'GO_TO_LAST_STEP',
			},
			expectedState: {
				state: 'finished',
				substate: 'none',
			},
		},
	],
};

// const utf8ValidationErrorEvents: TestFunctionInputData = {
// 	scriptName: 'utf8ValidationError',
// 	description: 'encode utf8 string, validation error',
// 	type: 'fast',
// 	events: [
// 	],
// };

export const testScriptEvents = [
	asciiHappyPathEvents,
	asciiHappyPathAutoplayEvents,
	asciiHappyPathSkipDemoEvents,
	asciiValidationErrorEvents,
	asciiWithSymbolsEvents,
	hexHappyPathEvents,
	hexValidationErrorEvents,
	binHappyPathEvents,
	binHappyPathSkipDemoEvents,
	binValidationErrorEvents,
	utf8HappyPathEvents,
	utf8MixedAsciiEvents,
];
/* c8 ignore stop */
