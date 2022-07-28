import { BIN_TO_HEX, defaultDecoderInput, defaultEncoderInput } from '$lib/constants';
import { getBase64LookupMap } from '$lib/maps';
import { isTextEncoding } from '$lib/typeguards';
import type {
	Base64ByteMap,
	Base64Encoding,
	DecoderInput,
	EncoderInput,
	HexByteMap,
	Result,
	StringEncoding,
} from '$lib/types';
import { decomposeUtf8String } from '$lib/utf8';
import {
	asciiStringFromByteArray,
	byteArrayToBinaryStringArray,
	divmod,
	hexStringFromByteArray,
	stringToByteArray,
} from '$lib/util';
import { validateAsciiBytes, validateBase64Encoding, validateTextEncoding } from '$lib/validation';

export function validateEncoderInput(
	inputText: string,
	inputEncoding: StringEncoding,
	outputEncoding: Base64Encoding,
): EncoderInput {
	const validationResult = validateTextEncoding(inputText, inputEncoding);
	if (!validationResult.success) {
		return { ...defaultEncoderInput, inputText, inputEncoding, outputEncoding, validationResult };
	}
	inputText = validationResult.value;
	return createEncoderInput(inputText, inputEncoding, outputEncoding, validationResult);
}

function createEncoderInput(
	inputText: string,
	inputEncoding: StringEncoding,
	outputEncoding: Base64Encoding,
	validationResult: Result<string>,
): EncoderInput {
	const encoderInput = getEncodingParameters(inputText, inputEncoding, outputEncoding, validationResult);
	const { bytes: inputBytes, totalChunks, lastChunkPadded, padLength } = encoderInput;
	const chunks = Array.from({ length: totalChunks }, (_, i) => {
		const isPadded = lastChunkPadded && i === totalChunks - 1;
		const bytes = inputBytes.slice(i * 3, Math.min(inputBytes.length, i * 3 + 3));
		const hex = hexStringFromByteArray(bytes, true, ' ');
		const hexBytes = hex.split(' ');
		const ascii = validateAsciiBytes(bytes) ? asciiStringFromByteArray(bytes) : '';
		const byteStrings = byteArrayToBinaryStringArray(bytes);
		const binary = padBinaryString(byteStrings.join(''), 6);
		return {
			bytes,
			encoding: inputEncoding,
			hex,
			hexBytes,
			ascii,
			binary,
			isPadded,
			padLength: isPadded ? padLength : 0,
			inputMap: createHexByteMapsForChunk(bytes, inputEncoding, ascii, byteStrings),
		};
	});
	return { ...encoderInput, chunks };
}

function getEncodingParameters(
	inputText: string,
	inputEncoding: StringEncoding,
	outputEncoding: Base64Encoding,
	validationResult: Result<string>,
): EncoderInput {
	const bytes = stringToByteArray(inputText, inputEncoding);
	const ascii = inputEncoding === 'ASCII' ? inputText : '';
	const utf8 = isTextEncoding(inputEncoding) ? decomposeUtf8String(inputText) : null;
	const binary = inputEncoding === 'bin' ? inputText : byteArrayToBinaryStringArray(bytes).join('');
	const hex = hexStringFromByteArray(bytes, true, ' ');
	const hexBytes = hex.split(' ');
	const [chunkCount, lastChunkLength] = divmod(bytes.length, 3);
	const lastChunkPadded = lastChunkLength > 0;
	const totalChunks = lastChunkPadded ? chunkCount + 1 : chunkCount;
	const padLength = lastChunkPadded ? (3 - lastChunkLength) * 2 : 0;
	return {
		inputText,
		inputEncoding,
		outputEncoding,
		validationResult,
		bytes,
		hexBytes,
		hex,
		ascii,
		utf8,
		binary,
		totalChunks,
		lastChunkPadded,
		padLength,
	};
}

function padBinaryString(input: string, divisor: number): string {
	while (input.length % divisor) {
		input = `${input}0`;
	}
	return input;
}

export function createHexByteMapsForChunk(
	inputBytes: number[],
	encoding: StringEncoding,
	ascii: string,
	byteStrings: string[],
): HexByteMap[] {
	return Array.from({ length: inputBytes.length }, (_, i) => {
		const word1 = byteStrings[i].substring(0, 4);
		const word2 = byteStrings[i].substring(4, 8);
		return {
			byte: inputBytes[i],
			bin_word1: word1,
			bin_word2: word2,
			hex_word1: BIN_TO_HEX[word1],
			hex_word2: BIN_TO_HEX[word2],
			ascii: encoding === 'ASCII' ? (/^\s+$/.test(ascii[i]) ? 'ws' : ascii[i]) : '',
			isWhiteSpace: /^\s+$/.test(ascii[i]),
		};
	});
}

export function validateDecoderInput(inputText: string, inputEncoding: Base64Encoding): DecoderInput {
	const validationResult = validateBase64Encoding(inputText, inputEncoding);
	if (!validationResult.success) {
		return { ...defaultDecoderInput, inputText, inputEncoding, validationResult };
	}
	return createDecoderInput(inputText, inputEncoding, validationResult);
}

function createDecoderInput(inputText: string, encoding: Base64Encoding, validationResult: Result): DecoderInput {
	const decoderInput = getDecodingParameters(inputText, encoding, validationResult);
	const { base64: inputBase64, totalChunks, lastChunkPadded, padLength } = decoderInput;
	const inputChunks = Array.from({ length: totalChunks }, (_, i) => {
		const isPadded = lastChunkPadded && i === totalChunks - 1;
		const base64 = inputBase64.slice(i * 4, Math.min(inputBase64.length, i * 4 + 4));
		const inputMap = createDecoderInputChunk(base64, encoding, isPadded, padLength);
		const binary = inputMap.map((b64Map) => b64Map.bin).join('');
		return {
			base64,
			binary,
			encoding,
			isPadded,
			padLength: isPadded ? padLength : 0,
			inputMap,
		};
	});
	const binary = inputChunks.map((chunk) => chunk.binary).join('');
	return { ...decoderInput, binary, chunks: inputChunks };
}

function getDecodingParameters(
	inputText: string,
	inputEncoding: Base64Encoding,
	validationResult: Result,
): DecoderInput {
	const base64 = inputText.replace(/[=]/g, '');
	const [chunkCount, lastChunkLength] = divmod(base64.length, 4);
	const lastChunkPadded = lastChunkLength > 0;
	const totalChunks = lastChunkPadded ? chunkCount + 1 : chunkCount;
	const padLength = lastChunkPadded ? 4 - lastChunkLength : 0;
	return {
		inputText,
		inputEncoding,
		validationResult,
		base64,
		totalChunks,
		lastChunkPadded,
		padLength,
	};
}

function createDecoderInputChunk(
	base64: string,
	encoding: Base64Encoding,
	isPadded: boolean,
	padLength: number,
): Base64ByteMap[] {
	const base64lookup = getBase64LookupMap(encoding);
	const base64Map = base64.split('').map((b64) => {
		const dec = base64lookup[b64];
		const bin = `${'0'.repeat(6 - dec.toString(2).length)}${dec.toString(2)}`;
		return {
			bin,
			dec,
			b64,
			isPad: false,
		};
	});
	if (isPadded) {
		Array.from({ length: padLength }, (_, i) => i).forEach(() =>
			base64Map.push({
				bin: '',
				dec: null,
				b64: '=',
				isPad: true,
			}),
		);
	}
	return base64Map;
}
