import { BIN_TO_HEX } from './constants';
import { createDecodingInputChunks, createEncodingInputChunks } from './dataPrep';
import { getBase64Alphabet } from './maps';
import type {
	Base64Encoding,
	Decoder,
	DecodingInputChunk,
	DecodingOutput,
	Encoder,
	EncodingInputChunk,
	EncodingOutput,
	HexByteMap,
	OutputChunk,
	StringEncoding
} from './types';
import { asciiStringFromByteArray, hexStringFromByteArray, hexStringToByteArray, Result } from './util';
import { validateAsciiBytes, validateBase64Encoding, validateTextEncoding } from './validation';

export class Base64Encoder implements Encoder {
	validateInput = (input: string, encoding: StringEncoding): Result<boolean> | Result =>
		validateTextEncoding(input, encoding);
	encode = (input: string, stringEncoding: StringEncoding, b64Encoding: Base64Encoding): EncodingOutput =>
		b64Encode(input, stringEncoding, b64Encoding);
}

export class Base64Decoder implements Decoder {
	validateInput = (input: string, encoding: Base64Encoding): Result<boolean> | Result =>
		validateBase64Encoding(input, encoding);
	decode = (encodedText: string, base64Encoding: Base64Encoding): DecodingOutput =>
		b64Decode(encodedText, base64Encoding);
}

function b64Encode(input: string, stringEncoding: StringEncoding, base64Encoding: Base64Encoding): EncodingOutput {
	const encodedChunks = createEncodingInputChunks(input, stringEncoding).map((chunk, i) =>
		encodeChunk(chunk, i, base64Encoding)
	);
	return {
		input,
		inputEncoding: stringEncoding,
		isASCII: encodedChunks.every((chunk) => chunk.isASCII),
		output: encodedChunks.map((chunk) => chunk.base64).join(''),
		outputEncoding: base64Encoding,
		chunks: encodedChunks
	};
}

function encodeChunk(
	encodingInputChunkMap: EncodingInputChunk,
	chunkNumber: number,
	base64Encoding: Base64Encoding
): OutputChunk {
	const { bytes, hex, ascii, binary, inputMap } = encodingInputChunkMap;
	const base64Alphabet = getBase64Alphabet(base64Encoding);
	const length = binary.length / 6;
	const outputMap = Array.from({ length }, (_, i) => {
		const base64Digit6bit = binary.substring(i * 6, i * 6 + 6);
		const word1 = `00${base64Digit6bit.substring(0, 2)}`;
		const word2 = base64Digit6bit.substring(2, 6);
		const base64DigitHex = `${BIN_TO_HEX[word1]}${BIN_TO_HEX[word2]}`;
		const base64DigitDecimal = parseInt(base64DigitHex, 16);
		const base64Digit = base64Alphabet[base64DigitDecimal];
		return {
			bin: base64Digit6bit,
			dec: base64DigitDecimal,
			b64: base64Digit,
			isPad: false
		};
	});
	const padLength = 4 - length;
	if (padLength > 0) {
		const encodedPadding = Array(padLength).fill({
			bin: '',
			dec: '',
			b64: '=',
			isPad: true
		});
		outputMap.concat(encodedPadding);
	}
	const base64 = outputMap.map((map) => map.b64).join('');
	const outputChunk = {
		base64,
		binary,
		ascii,
		hex,
		bytes,
		isASCII: validateAsciiBytes(bytes),
		hexMap: inputMap,
		base64Map: outputMap
	};
	return addBitGroupsToOutputChunk(outputChunk, chunkNumber);
}

function b64Decode(encodedText: string, base64Encoding: Base64Encoding): DecodingOutput {
	const inputChunks = createDecodingInputChunks(encodedText, base64Encoding);
	const hexMap = createHexMap(inputChunks);
	const outputChunks = mapHexBytesToBase64Chunks(encodedText, base64Encoding, hexMap, inputChunks);
	const hexString = outputChunks.map((chunk) => chunk.hex).join('');
	const bytes = hexStringToByteArray(hexString);
	const isASCII = validateAsciiBytes(bytes);
	return {
		input: encodedText,
		inputEncoding: base64Encoding,
		output: isASCII ? asciiStringFromByteArray(bytes) : hexString,
		outputEncoding: isASCII ? 'ASCII' : 'hex',
		chunks: outputChunks
	};
}

function createHexMap(inputChunks: DecodingInputChunk[]): HexByteMap[] {
	const binary = inputChunks.map((b64) => b64.binary).join('');
	const totalBytes = (binary.length / 8) | 0;
	return Array.from({ length: totalBytes }, (_, i) => {
		const byteString = binary.slice(i * 8, i * 8 + 8);
		const bin_word1 = byteString.slice(0, 4);
		const bin_word2 = byteString.slice(4, 8);
		const hex_word1 = BIN_TO_HEX[bin_word1];
		const hex_word2 = BIN_TO_HEX[bin_word2];
		const byte = parseInt(`${bin_word1}${bin_word2}`, 2);
		const ascii = asciiStringFromByteArray([byte]);
		const isWhiteSpace = /^\s+$/.test(ascii);
		return {
			byte,
			bin_word1,
			bin_word2,
			hex_word1,
			hex_word2,
			isWhiteSpace,
			ascii: isWhiteSpace ? 'ws' : ascii
		};
	});
}

function mapHexBytesToBase64Chunks(
	encodedText: string,
	base64Encoding: Base64Encoding,
	hexMap: HexByteMap[],
	inputChunks: DecodingInputChunk[]
): OutputChunk[] {
	return Array.from({ length: inputChunks.length }, (_, i) => {
		const bytesInChunk = [];
		for (let j = 0; j < 3; j++) {
			const byteIndex = i * 3 + j;
			if (byteIndex === hexMap.length) {
				break;
			}
			bytesInChunk.push(hexMap[byteIndex]);
		}
		const bytes = bytesInChunk.map((hexMap) => hexMap.byte);
		const outputChunk = {
			base64: inputChunks[i].base64,
			binary: inputChunks[i].binary,
			ascii: asciiStringFromByteArray(bytes),
			hex: hexStringFromByteArray(bytes),
			bytes,
			isASCII: validateAsciiBytes(bytes),
			hexMap: bytesInChunk,
			base64Map: inputChunks[i].inputMap
		};
		return addBitGroupsToOutputChunk(outputChunk, i);
	});
}

function addBitGroupsToOutputChunk(chunk: OutputChunk, i: number): OutputChunk {
	const base64Bits1 = chunk.binary.substring(0, 6);
	const base64Bits2a = chunk.binary.substring(6, 8);
	const base64Bits2b = chunk.binary.substring(8, 12);
	const base64Bits3a = chunk.binary.substring(12, 16);
	const base64Bits3b = chunk.binary.substring(16, 18);
	const base64Bits4 = chunk.binary.substring(18, 24);
	const hexBits1a = base64Bits1;
	const hexBits1b = base64Bits2a;
	const hexBits2a = base64Bits2b;
	const hexBits2b = base64Bits3a;
	const hexBits3a = base64Bits3b;
	const hexBits3b = base64Bits4;

	const base64Digit1 = chunk.base64Map[0];
	base64Digit1.groupId = `base64-chunk-${i + 1}-digit-1`;
	base64Digit1.bitGroups = [{ groupId: `hex-chunk-${i + 1}-byte-1`, bits: hexBits1a }];

	const base64Digit2 = chunk.base64Map[1];
	base64Digit2.groupId = `base64-chunk-${i + 1}-digit-2`;
	base64Digit2.bitGroups = [
		{ groupId: `hex-chunk-${i + 1}-byte-1`, bits: hexBits1b },
		{ groupId: `hex-chunk-${i + 1}-byte-2`, bits: hexBits2a }
	];

	const base64Digit3 = chunk.base64Map[2];
	base64Digit3.groupId = `base64-chunk-${i + 1}-digit-3`;
	base64Digit3.bitGroups = [
		{ groupId: `hex-chunk-${i + 1}-byte-2`, bits: hexBits2b },
		{ groupId: `hex-chunk-${i + 1}-byte-3`, bits: hexBits3a }
	];

	const base64Digit4 = chunk.base64Map[3];
	base64Digit4.groupId = `base64-chunk-${i + 1}-digit-4`;
	base64Digit4.bitGroups = [{ groupId: `hex-chunk-${i + 1}-byte-3`, bits: hexBits3b }];

	const hexMap = chunk.hexMap;
	const hexByte1 = hexMap[0];
	hexByte1.groupId = `hex-chunk-${i + 1}-byte-1`;
	hexByte1.bitGroups = [
		{ groupId: `base64-chunk-${i + 1}-digit-1`, bits: base64Bits1 },
		{ groupId: `base64-chunk-${i + 1}-digit-2`, bits: base64Bits2a }
	];
	if (hexMap.length == 1) {
		base64Digit2.bitGroups = [
			{ groupId: `hex-chunk-${i + 1}-byte-1`, bits: hexBits1b },
			{ groupId: 'pad', bits: hexBits2a }
		];
		base64Digit3.bitGroups = [
			{ groupId: 'pad', bits: hexBits2b },
			{ groupId: 'pad', bits: hexBits3a }
		];
		base64Digit4.bitGroups = [{ groupId: 'pad', bits: hexBits3b }];
	} else {
		const hexByte2 = hexMap[1];
		hexByte2.groupId = `hex-chunk-${i + 1}-byte-2`;
		hexByte2.bitGroups = [
			{ groupId: `base64-chunk-${i + 1}-digit-2`, bits: base64Bits2b },
			{ groupId: `base64-chunk-${i + 1}-digit-3`, bits: base64Bits3a }
		];
		if (hexMap.length == 2) {
			base64Digit3.bitGroups = [
				{ groupId: `hex-chunk-${i + 1}-byte-2`, bits: hexBits2b },
				{ groupId: 'pad', bits: hexBits3a }
			];
			base64Digit4.bitGroups = [{ groupId: 'pad', bits: hexBits3b }];
		} else {
			const hexByte3 = hexMap[2];
			hexByte3.groupId = `hex-chunk-${i + 1}-byte-3`;
			hexByte3.bitGroups = [
				{ groupId: `base64-chunk-${i + 1}-digit-3`, bits: base64Bits3b },
				{ groupId: `base64-chunk-${i + 1}-digit-4`, bits: base64Bits4 }
			];
		}
	}
	return chunk;
}
