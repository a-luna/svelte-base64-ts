// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
	'@@xstate/typegen': true;
	internalEvents: {
		'xstate.after(1000)#b64Encode.validateInputText.error': {
			type: 'xstate.after(1000)#b64Encode.validateInputText.error';
		};
		'xstate.after(1000)#b64Encode.validateInputText.success': {
			type: 'xstate.after(1000)#b64Encode.validateInputText.success';
		};
		'xstate.after(1000)#b64Encode.encodeInput.idle': { type: 'xstate.after(1000)#b64Encode.encodeInput.idle' };
		'xstate.after(1000)#b64Encode.encodeInput.autoPlayEncodeByte': {
			type: 'xstate.after(1000)#b64Encode.encodeInput.autoPlayEncodeByte';
		};
		'xstate.after(1000)#b64Encode.encodeInput.explainByteMapping': {
			type: 'xstate.after(1000)#b64Encode.encodeInput.explainByteMapping';
		};
		'xstate.after(1000)#b64Encode.createInputChunks.autoPlayIdle': {
			type: 'xstate.after(1000)#b64Encode.createInputChunks.autoPlayIdle';
		};
		'xstate.after(1000)#b64Encode.createInputChunks.autoPlayCreateInputChunk': {
			type: 'xstate.after(1000)#b64Encode.createInputChunks.autoPlayCreateInputChunk';
		};
		'xstate.after(1000)#b64Encode.createInputChunks.explainLastPaddedChunk': {
			type: 'xstate.after(1000)#b64Encode.createInputChunks.explainLastPaddedChunk';
		};
		'xstate.after(1000)#b64Encode.createInputChunks.createLastPaddedChunk': {
			type: 'xstate.after(1000)#b64Encode.createInputChunks.createLastPaddedChunk';
		};
		'xstate.after(1000)#b64Encode.createOutputChunks.autoPlayIdle': {
			type: 'xstate.after(1000)#b64Encode.createOutputChunks.autoPlayIdle';
		};
		'xstate.after(1000)#b64Encode.createOutputChunks.autoPlayCreateOutputChunk': {
			type: 'xstate.after(1000)#b64Encode.createOutputChunks.autoPlayCreateOutputChunk';
		};
		'xstate.after(1000)#b64Encode.createOutputChunks.explainLastPaddedChunk': {
			type: 'xstate.after(1000)#b64Encode.createOutputChunks.explainLastPaddedChunk';
		};
		'xstate.after(1000)#b64Encode.createOutputChunks.explainPadCharacter': {
			type: 'xstate.after(1000)#b64Encode.createOutputChunks.explainPadCharacter';
		};
		'xstate.after(1000)#b64Encode.createOutputChunks.createLastPaddedChunk': {
			type: 'xstate.after(1000)#b64Encode.createOutputChunks.createLastPaddedChunk';
		};
		'xstate.after(1000)#b64Encode.encodeOutput.idle': { type: 'xstate.after(1000)#b64Encode.encodeOutput.idle' };
		'xstate.after(1000)#b64Encode.encodeOutput.autoPlayEncodeBase64': {
			type: 'xstate.after(1000)#b64Encode.encodeOutput.autoPlayEncodeBase64';
		};
		'xstate.after(1000)#b64Encode.verifyResults': { type: 'xstate.after(1000)#b64Encode.verifyResults' };
		'xstate.after(10)#b64Encode.inactive': { type: 'xstate.after(10)#b64Encode.inactive' };
		'': { type: '' };
		'xstate.after(10)#b64Encode.finished': { type: 'xstate.after(10)#b64Encode.finished' };
		'xstate.init': { type: 'xstate.init' };
	};
	invokeSrcNameMap: {};
	missingImplementations: {
		actions: never;
		services: never;
		guards: never;
		delays: never;
	};
	eventsCausingActions: {
		startAutoPlay: 'START_AUTOPLAY' | 'RESUME_AUTO_PLAY';
		validate: 'UPDATE_TEXT' | 'START_AUTOPLAY' | 'VALIDATE_TEXT' | 'SKIP_DEMO' | 'GO_TO_PREV_STEP';
		setFlagSkipDemo: 'SKIP_DEMO' | 'GO_TO_LAST_STEP';
		resetInput: 'RESET';
		clearResetFlag: 'xstate.after(10)#b64Encode.inactive';
		encode: '';
		generateBase64Maps: '';
		generateByteMaps: '';
		stopAutoPlay:
			| 'STOP_AUTO_PLAY'
			| 'xstate.after(10)#b64Encode.finished'
			| 'xstate.init'
			| 'RESET'
			| 'GO_TO_FIRST_STEP'
			| 'GO_TO_PREV_STEP'
			| 'xstate.after(1000)#b64Encode.validateInputText.error';
		mapNextByte: 'xstate.after(1000)#b64Encode.encodeInput.autoPlayEncodeByte' | 'GO_TO_NEXT_STEP';
		mapPreviousByte: 'GO_TO_PREV_STEP';
		resetNoBytesRemaining: 'GO_TO_PREV_STEP';
		mapNextInputChunk: 'xstate.after(1000)#b64Encode.createInputChunks.autoPlayCreateInputChunk' | 'GO_TO_NEXT_STEP';
		mapPreviousInputChunk: 'GO_TO_PREV_STEP';
		resetNoInputChunksRemaining: 'GO_TO_PREV_STEP';
		mapNextOutputChunk: 'xstate.after(1000)#b64Encode.createOutputChunks.autoPlayCreateOutputChunk' | 'GO_TO_NEXT_STEP';
		mapPreviousOutputChunk: 'GO_TO_PREV_STEP';
		resetNoOutputChunksRemaining: 'GO_TO_PREV_STEP';
		mapNextBase64Char: 'xstate.after(1000)#b64Encode.encodeOutput.autoPlayEncodeBase64' | 'GO_TO_NEXT_STEP';
		mapPreviousBase64Char: 'GO_TO_PREV_STEP';
		resetNoBase64CharsRemaining: 'GO_TO_PREV_STEP';
		resetContext:
			| 'xstate.init'
			| 'RESET'
			| 'GO_TO_FIRST_STEP'
			| 'GO_TO_PREV_STEP'
			| 'xstate.after(1000)#b64Encode.validateInputText.error';
		resetRemainingBytes: 'done.state.b64Encode.validateInputText' | 'GO_TO_PREV_STEP';
		getCurrentByte:
			| 'RESUME_AUTO_PLAY'
			| 'xstate.after(1000)#b64Encode.encodeInput.idle'
			| 'xstate.after(1000)#b64Encode.encodeInput.autoPlayEncodeByte'
			| 'GO_TO_NEXT_STEP'
			| 'STOP_AUTO_PLAY'
			| 'GO_TO_PREV_STEP';
		resetRemainingInputChunks: 'done.state.b64Encode.encodeInput' | 'GO_TO_PREV_STEP';
		getCurrentInputChunk:
			| 'xstate.after(1000)#b64Encode.createInputChunks.autoPlayIdle'
			| 'RESUME_AUTO_PLAY'
			| 'xstate.after(1000)#b64Encode.createInputChunks.autoPlayCreateInputChunk'
			| 'STOP_AUTO_PLAY'
			| 'GO_TO_NEXT_STEP'
			| 'GO_TO_PREV_STEP';
		resetRemainingOutputChunks: 'done.state.b64Encode.createInputChunks' | 'GO_TO_PREV_STEP';
		getCurrentOutputChunk:
			| 'xstate.after(1000)#b64Encode.createOutputChunks.autoPlayIdle'
			| 'RESUME_AUTO_PLAY'
			| 'xstate.after(1000)#b64Encode.createOutputChunks.autoPlayCreateOutputChunk'
			| 'STOP_AUTO_PLAY'
			| 'GO_TO_NEXT_STEP'
			| 'GO_TO_PREV_STEP';
		resetRemainingBase64Chars: 'done.state.b64Encode.createOutputChunks' | 'GO_TO_PREV_STEP';
		getCurrentBase64Char:
			| 'RESUME_AUTO_PLAY'
			| 'xstate.after(1000)#b64Encode.encodeOutput.idle'
			| 'xstate.after(1000)#b64Encode.encodeOutput.autoPlayEncodeBase64'
			| 'GO_TO_NEXT_STEP'
			| 'STOP_AUTO_PLAY'
			| 'GO_TO_PREV_STEP';
		updateContextForLastStep: 'done.state.b64Encode.encodeOutput' | 'GO_TO_PREV_STEP';
	};
	eventsCausingServices: {};
	eventsCausingGuards: {
		defaultSettingsChanged: 'RESET';
		formResetRequested: 'xstate.after(10)#b64Encode.inactive';
		yesSkipDemo:
			| 'done.state.b64Encode.validateInputText'
			| ''
			| 'done.state.b64Encode.encodeInput'
			| 'done.state.b64Encode.createInputChunks'
			| 'done.state.b64Encode.createOutputChunks'
			| 'done.state.b64Encode.encodeOutput';
		inputTextIsInvalid: '';
		autoPlayDisabled:
			| 'GO_TO_FIRST_STEP'
			| 'GO_TO_PREV_STEP'
			| 'RESUME_AUTO_PLAY'
			| 'RESET'
			| 'GO_TO_NEXT_STEP'
			| 'GO_TO_LAST_STEP';
		autoPlayEnabled:
			| 'xstate.after(1000)#b64Encode.validateInputText.success'
			| 'STOP_AUTO_PLAY'
			| 'xstate.after(1000)#b64Encode.encodeInput.idle'
			| 'xstate.after(1000)#b64Encode.encodeInput.explainByteMapping'
			| ''
			| 'xstate.after(1000)#b64Encode.createInputChunks.explainLastPaddedChunk'
			| 'xstate.after(1000)#b64Encode.createInputChunks.createLastPaddedChunk'
			| 'xstate.after(1000)#b64Encode.createOutputChunks.explainLastPaddedChunk'
			| 'xstate.after(1000)#b64Encode.createOutputChunks.explainPadCharacter'
			| 'xstate.after(1000)#b64Encode.createOutputChunks.createLastPaddedChunk'
			| 'xstate.after(1000)#b64Encode.encodeOutput.idle'
			| 'xstate.after(1000)#b64Encode.verifyResults'
			| 'xstate.after(10)#b64Encode.finished';
		bytesRemaining: 'xstate.after(1000)#b64Encode.encodeInput.autoPlayEncodeByte' | 'GO_TO_NEXT_STEP';
		noBytesRemaining: 'xstate.after(1000)#b64Encode.encodeInput.autoPlayEncodeByte' | 'GO_TO_NEXT_STEP';
		hasPreviousByte: 'GO_TO_PREV_STEP';
		allBytesRemaining: 'GO_TO_PREV_STEP';
		onlyOnePaddedChunk:
			| 'STOP_AUTO_PLAY'
			| 'xstate.after(1000)#b64Encode.createInputChunks.autoPlayIdle'
			| 'GO_TO_NEXT_STEP'
			| 'xstate.after(1000)#b64Encode.createOutputChunks.autoPlayIdle';
		inputChunksRemaining: 'xstate.after(1000)#b64Encode.createInputChunks.autoPlayCreateInputChunk' | 'GO_TO_NEXT_STEP';
		finalPaddedInputChunkRemaining:
			| 'xstate.after(1000)#b64Encode.createInputChunks.autoPlayCreateInputChunk'
			| 'GO_TO_NEXT_STEP';
		noInputChunksRemaining:
			| 'xstate.after(1000)#b64Encode.createInputChunks.autoPlayCreateInputChunk'
			| 'GO_TO_NEXT_STEP';
		hasPreviousInputChunk: 'GO_TO_PREV_STEP';
		allInputChunksRemaining: 'GO_TO_PREV_STEP';
		lastChunkIsPadded: 'GO_TO_PREV_STEP';
		currentInputChunkIsPadded: 'GO_TO_PREV_STEP';
		outputChunksRemaining:
			| 'xstate.after(1000)#b64Encode.createOutputChunks.autoPlayCreateOutputChunk'
			| 'GO_TO_NEXT_STEP';
		finalPaddedOutputChunkRemaining:
			| 'xstate.after(1000)#b64Encode.createOutputChunks.autoPlayCreateOutputChunk'
			| 'GO_TO_NEXT_STEP';
		noOutputChunksRemaining:
			| 'xstate.after(1000)#b64Encode.createOutputChunks.autoPlayCreateOutputChunk'
			| 'GO_TO_NEXT_STEP';
		hasPreviousOutputChunk: 'GO_TO_PREV_STEP';
		allOutputChunksRemaining: 'GO_TO_PREV_STEP';
		currentOutputChunkIsPadded: 'GO_TO_PREV_STEP';
		base64CharsRemaining: 'xstate.after(1000)#b64Encode.encodeOutput.autoPlayEncodeBase64' | 'GO_TO_NEXT_STEP';
		noBase64CharsRemaining: 'xstate.after(1000)#b64Encode.encodeOutput.autoPlayEncodeBase64' | 'GO_TO_NEXT_STEP';
		hasPreviousBase64Char: 'GO_TO_PREV_STEP';
		allBase64CharsRemaining: 'GO_TO_PREV_STEP';
	};
	eventsCausingDelays: {};
	matchesStates:
		| 'inactive'
		| 'validateInputText'
		| 'validateInputText.validate'
		| 'validateInputText.error'
		| 'validateInputText.success'
		| 'validateInputText.validationComplete'
		| 'encodeInput'
		| 'encodeInput.idle'
		| 'encodeInput.autoPlayEncodeByte'
		| 'encodeInput.encodeByte'
		| 'encodeInput.explainByteMapping'
		| 'encodeInput.encodingComplete'
		| 'createInputChunks'
		| 'createInputChunks.idle'
		| 'createInputChunks.autoPlayIdle'
		| 'createInputChunks.regularIdle'
		| 'createInputChunks.autoPlayCreateInputChunk'
		| 'createInputChunks.createInputChunk'
		| 'createInputChunks.explainLastPaddedChunk'
		| 'createInputChunks.createLastPaddedChunk'
		| 'createInputChunks.createdAllInputChunks'
		| 'createOutputChunks'
		| 'createOutputChunks.idle'
		| 'createOutputChunks.autoPlayIdle'
		| 'createOutputChunks.regularIdle'
		| 'createOutputChunks.autoPlayCreateOutputChunk'
		| 'createOutputChunks.createOutputChunk'
		| 'createOutputChunks.explainLastPaddedChunk'
		| 'createOutputChunks.explainPadCharacter'
		| 'createOutputChunks.createLastPaddedChunk'
		| 'createOutputChunks.createdAllOutputChunks'
		| 'encodeOutput'
		| 'encodeOutput.idle'
		| 'encodeOutput.autoPlayEncodeBase64'
		| 'encodeOutput.encodeBase64'
		| 'encodeOutput.encodingComplete'
		| 'verifyResults'
		| 'finished'
		| {
				validateInputText?: 'validate' | 'error' | 'success' | 'validationComplete';
				encodeInput?: 'idle' | 'autoPlayEncodeByte' | 'encodeByte' | 'explainByteMapping' | 'encodingComplete';
				createInputChunks?:
					| 'idle'
					| 'autoPlayIdle'
					| 'regularIdle'
					| 'autoPlayCreateInputChunk'
					| 'createInputChunk'
					| 'explainLastPaddedChunk'
					| 'createLastPaddedChunk'
					| 'createdAllInputChunks';
				createOutputChunks?:
					| 'idle'
					| 'autoPlayIdle'
					| 'regularIdle'
					| 'autoPlayCreateOutputChunk'
					| 'createOutputChunk'
					| 'explainLastPaddedChunk'
					| 'explainPadCharacter'
					| 'createLastPaddedChunk'
					| 'createdAllOutputChunks';
				encodeOutput?: 'idle' | 'autoPlayEncodeBase64' | 'encodeBase64' | 'encodingComplete';
		  };
	tags: never;
}
