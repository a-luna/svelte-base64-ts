import type { Base64Encoding, ButtonColor, ButtonSize, Encoding, OutputChunk } from '.';

export interface AppStore {
	encoderMode: boolean;
	decoderMode: boolean;
	isMobileDisplay: boolean;
	inputText: string;
	outputText: string;
	totalBytesIn: number;
	totalBytesOut: number;
	inputEncoding: Encoding;
	outputEncoding: Encoding;
	isAscii: boolean;
	base64Encoding: Base64Encoding;
	chunks: OutputChunk[];
	errorMessage: string;
	formTitle: string;
	switchModeButtonColor: ButtonColor;
	inputStringIsValid: boolean;
	buttonSize: ButtonSize;
	buttonColor: ButtonColor;
	buttonLabel: string;
}
