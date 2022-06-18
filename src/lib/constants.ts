import type {
	Base64ByteMap,
	DecoderInput,
	DecoderInputChunk,
	DecoderOutput,
	EncoderInput,
	EncoderInputChunk,
	EncoderOutput,
	HexByteMap,
	OutputChunk,
} from '$lib/types';

export const B64_ALPHABET_COMMON = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const BIN_TO_HEX: { [index: string]: string } = {
	'0000': '0',
	'0001': '1',
	'0010': '2',
	'0011': '3',
	'0100': '4',
	'0101': '5',
	'0110': '6',
	'0111': '7',
	'1000': '8',
	'1001': '9',
	'1010': 'A',
	'1011': 'B',
	'1100': 'C',
	'1101': 'D',
	'1110': 'E',
	'1111': 'F',
};

export const rotatingColors = [
	'--red4',
	'--green3',
	'--orange3',
	'--teal4',
	'--orange-yellow3',
	'--purple3',
	'--green4',
	'--yellow3',
	'--pink4',
	'--yellow-green3',
	'--blue-green4',
];

export const defaultBase64ByteMap: Base64ByteMap = {
	bin: '',
	dec: 0,
	b64: '',
	isPad: false,
	groupId: '',
	bitGroups: [
		{
			groupId: '',
			bits: '',
		},
	],
};

export const defaultDecoderInputChunk: DecoderInputChunk = {
	base64: '',
	binary: '',
	encoding: 'base64',
	isPadded: false,
	padLength: 0,
	inputMap: [defaultBase64ByteMap],
};

export const defaultHexByteMap: HexByteMap = {
	byte: 0,
	bin_word1: '',
	bin_word2: '',
	hex_word1: '',
	hex_word2: '',
	ascii: '',
	isWhiteSpace: false,
	groupId: '',
	bitGroups: [
		{
			groupId: '',
			bits: '',
		},
	],
};

export const defaultEncoderInputChunk: EncoderInputChunk = {
	bytes: [],
	encoding: 'ASCII',
	hex: '',
	hexBytes: [],
	ascii: '',
	binary: '',
	isPadded: false,
	padLength: 0,
	inputMap: [defaultHexByteMap],
};

export const defaultOutputChunk: OutputChunk = {
	base64: '',
	binary: '',
	ascii: '',
	hex: '',
	hexBytes: [],
	bytes: [],
	isASCII: true,
	hexMap: [defaultHexByteMap],
	base64Map: [defaultBase64ByteMap],
};

export const defaultDecoderInput: DecoderInput = {
	inputText: '',
	inputEncoding: 'base64',
	validationResult: { success: false },
	base64: '',
	binary: '',
	totalChunks: 0,
	lastChunkPadded: false,
	padLength: 0,
	chunks: [defaultDecoderInputChunk],
};

export const defaultDecoderOutput: DecoderOutput = {
	input: '',
	inputEncoding: 'base64',
	output: '',
	bytes: [],
	outputEncoding: 'ASCII',
	chunks: [defaultOutputChunk],
};

export const defaultEncoderInput: EncoderInput = {
	inputText: '',
	inputEncoding: 'ASCII',
	outputEncoding: 'base64',
	validationResult: { success: true },
	bytes: [],
	hex: '',
	ascii: '',
	binary: '',
	totalChunks: 0,
	lastChunkPadded: false,
	padLength: 0,
	chunks: [defaultEncoderInputChunk],
};

export const defaultEncoderOutput: EncoderOutput = {
	input: '',
	inputEncoding: 'ASCII',
	isASCII: true,
	output: '',
	bytes: [],
	outputEncoding: 'base64',
	chunks: [defaultOutputChunk],
};
