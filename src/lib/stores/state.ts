import { Base64Decoder, Base64Encoder } from '$lib/base64';
import { defaultDecoderInput, defaultDecoderOutput, defaultEncoderInput, defaultEncoderOutput } from '$lib/constants';
import { isBase64Encoding, isStringEncoding } from '$lib/typeguards';
import type { AppMode, AppSettings, AppState, Base64Encoding, DecoderInput, EncoderInput, Encoding } from '$lib/types';
import { writable } from 'svelte/store';

function createAppStateStore(mode: AppMode): AppState {
	const getDefaultAppSettings = (mode: AppMode, resetPerformed: boolean): AppSettings => ({
		mode,
		resetPerformed,
		highlightHexByte: null,
		highlightBase64: '',
		highlightHexBitGroup: '',
		highlightBase64BitGroup: '',
		decoderInput: defaultDecoderInput,
		decoderOutput: defaultDecoderOutput,
		encoderInput: defaultEncoderInput,
		encoderOutput: defaultEncoderOutput,
	});

	const { set, subscribe, update } = writable<AppSettings>(getDefaultAppSettings(mode, false));
	const encoder = new Base64Encoder();
	const decoder = new Base64Decoder();

	function toggleMode(settings: AppSettings): AppSettings {
		const mode = settings.mode === 'encode' ? 'decode' : 'encode';
		return reset(mode, settings);
	}

	function reset(mode: AppMode, settings: AppSettings): AppSettings {
		settings = getDefaultAppSettings(mode, true);
		return validateInput(settings);
	}
                      
	function changeInputText(input: string, settings: AppSettings): AppSettings {
		if (settings.mode === 'encode') {
			settings.encoderInput.inputText = input;
		} else {
			settings.decoderInput.inputText = input;
		}
		return validateInput(settings);
	}

	function changeInputEncoding(encoding: Encoding, settings: AppSettings): AppSettings {
		settings = reset(settings.mode, settings);
		if (settings.mode === 'encode' && isStringEncoding(encoding)) {
			settings.encoderInput.inputEncoding = encoding;
		} else if (settings.mode === 'decode' && isBase64Encoding(encoding)) {
			settings.decoderInput.inputEncoding = encoding;
		}
		return validateInput(settings);
	}

	function changeOutputEncoding(encoding: Base64Encoding, settings: AppSettings): AppSettings {
		if (settings.mode === 'encode') {
			settings.encoderInput.outputEncoding = encoding;
			settings.encoderOutput = defaultEncoderOutput;
		}
		return validateInput(settings);
	}

	const validateEncoderInput = (settings: AppSettings): EncoderInput =>
		encoder.validateInput(
			settings.encoderInput.inputText,
			settings.encoderInput.inputEncoding,
			settings.encoderInput.outputEncoding,
		);
	const validateDecoderInput = (settings: AppSettings): DecoderInput =>
		decoder.validateInput(settings.decoderInput.inputText, settings.decoderInput.inputEncoding);

	function validateInput(settings: AppSettings): AppSettings {
		if (settings.mode === 'encode') {
			settings.encoderInput = validateEncoderInput(settings);
			if (!settings.encoderInput.inputText) {
				settings.encoderInput.validationResult = { success: true };
			}
		} else {
			settings.decoderInput = validateDecoderInput(settings);
			if (!settings.decoderInput.inputText) {
				settings.decoderInput.validationResult = { success: true };
			}
		}
		return settings;
	}

	function execute(settings: AppSettings): AppSettings {
		if (settings.mode === 'encode' && settings.encoderInput.validationResult.success) {
			settings.encoderOutput = encoder.encode(settings.encoderInput);
		} else if (settings.mode === 'decode' && settings.decoderInput.validationResult.success) {
			settings.decoderOutput = decoder.decode(settings.decoderInput);
		}
		return settings;
	}

	return {
		set,
		subscribe,
		toggleMode: () => update((settings) => toggleMode(settings)),
		changeInputText: (input: string) => update((settings) => changeInputText(input, settings)),
		changeInputEncoding: (encoding: Encoding) => update((settings) => changeInputEncoding(encoding, settings)),
		changeOutputEncoding: (encoding: Base64Encoding) => update((settings) => changeOutputEncoding(encoding, settings)),
		validateInput: () => update((settings) => validateInput(settings)),
		execute: () => update((settings) => execute(settings)),
		reset: () => update((settings) => reset(settings.mode, settings)),
	};
}

export const state = createAppStateStore('encode');
