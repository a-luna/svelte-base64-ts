import { getPageWidth } from '$lib/stores/pageWidth';
import { state } from '$lib/stores/state';
import type { AppState, AppStore, Base64Encoding, ButtonColor, ButtonSize, Encoding, OutputChunk } from '$lib/types';
import { hexStringFromByteArray } from '$lib/util';
import type { Readable } from 'svelte/store';
import { derived } from 'svelte/store';

function createAppStore(state: AppState): Readable<AppStore> {
	return derived([state, getPageWidth()], ([$state, $pageWidth]) => {
		const encoderMode = (): boolean => $state.mode === 'encode';
		const decoderMode = (): boolean => $state.mode === 'decode';

		const isMobileDisplay = (): boolean => $pageWidth < 525;

		const inputStringIsValid = (): boolean =>
			encoderMode() ? $state.encoderInput.validationResult.success : $state.decoderInput.validationResult.success;

		const getInputHexBytes = (): string => hexStringFromByteArray($state.encoderInput.bytes, true, ' ');
		const getOutputHexBytes = (): string => hexStringFromByteArray($state.decoderOutput.bytes, true, ' ');

		const getInputText = (): string =>
			encoderMode()
				? $state.encoderOutput.inputEncoding === 'ASCII' || $state.encoderOutput.inputEncoding === 'UTF-8'
					? $state.encoderInput.inputText
					: getInputHexBytes()
				: $state.decoderInput.inputText;

		const getOutputText = (): string =>
			encoderMode()
				? $state.encoderOutput.output
				: $state.decoderOutput.outputEncoding === 'ASCII' || $state.decoderOutput.outputEncoding === 'UTF-8'
				? $state.decoderOutput.output
				: getOutputHexBytes();

		const getTotalBytesIn = (): number => (encoderMode() ? $state.encoderInput.bytes.length : 0);

		const getTotalBytesOut = (): number =>
			encoderMode() ? $state.encoderOutput.bytes.length : $state.decoderOutput.bytes.length;

		const getInputEncoding = (): Encoding =>
			encoderMode() ? $state.encoderInput.inputEncoding : $state.decoderInput.inputEncoding;

		const getOutputEncoding = (): Encoding =>
			encoderMode() ? $state.encoderInput.outputEncoding : $state.decoderOutput.outputEncoding;

		const isAscii = (): boolean =>
			encoderMode()
				? $state.encoderOutput.inputEncoding === 'ASCII' || $state.encoderOutput.inputEncoding === 'UTF-8'
				: $state.decoderOutput.outputEncoding === 'ASCII' || $state.decoderOutput.outputEncoding === 'UTF-8';

		const getBase64Encoding = (): Base64Encoding =>
			encoderMode() ? $state.encoderOutput.outputEncoding : $state.decoderOutput.inputEncoding;

		const getOutputChunks = (): OutputChunk[] =>
			encoderMode() ? $state.encoderOutput.chunks : $state.decoderOutput.chunks;

		const getErrorMessage = (): string =>
			encoderMode()
				? $state.encoderInput.validationResult?.error?.message
				: $state.decoderInput.validationResult?.error?.message;

		const getSwitchModeButtonColor = (): ButtonColor => (encoderMode() ? 'teal' : 'green');
		const getButtonColor = (): ButtonColor => (inputStringIsValid() ? (encoderMode() ? 'teal' : 'green') : 'red');
		const getButtonSize = (): ButtonSize => (isMobileDisplay() ? 'sm' : 'xs');

		return {
			encoderMode: encoderMode(),
			decoderMode: decoderMode(),
			isMobileDisplay: isMobileDisplay(),
			inputText: getInputText(),
			outputText: getOutputText(),
			totalBytesIn: getTotalBytesIn(),
			totalBytesOut: getTotalBytesOut(),
			inputEncoding: getInputEncoding(),
			outputEncoding: getOutputEncoding(),
			isAscii: isAscii(),
			base64Encoding: getBase64Encoding(),
			chunks: getOutputChunks(),
			errorMessage: getErrorMessage(),
			formTitle: encoderMode() ? 'Base64 Encoder' : 'Base64 Decoder',
			switchModeButtonColor: getSwitchModeButtonColor(),
			inputStringIsValid: inputStringIsValid(),
			buttonSize: getButtonSize(),
			buttonColor: getButtonColor(),
			buttonLabel: encoderMode() ? 'Encode' : 'Decode',
		};
	});
}

export const app = createAppStore(state);
