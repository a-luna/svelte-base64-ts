import { validateDecoderInput, validateEncoderInput } from '$lib/dataPrep';
import { describe, expect, test } from 'vitest';

describe('validateEncoderInputChunks', () => {
	test('can create a map (no whitespace, no pad characters) for a 3-byte chunk of an ASCII string', () => {
		expect(validateEncoderInput('dog', 'ASCII', 'base64')).toEqual({
			inputText: 'dog',
			inputEncoding: 'ASCII',
			outputEncoding: 'base64',
			validationResult: {
				success: true,
				value: 'dog',
			},
			bytes: [100, 111, 103],
			hex: '64 6F 67',
			hexBytes: ['64', '6F', '67'],
			ascii: 'dog',
			utf8: {
				utf8: 'dog',
				hasCombinedChars: false,
				stringLength: 3,
				encoded: 'dog',
				totalBytes: 3,
				hexBytes: ['64', '6F', '67'],
				bytes: [100, 111, 103],
				charMap: [
					{
						char: 'd',
						isCombined: false,
						isASCII: true,
						hexBytes: ['64'],
						bytes: [100],
						totalBytes: 1,
						encoded: 'd',
					},
					{
						char: 'o',
						isCombined: false,
						isASCII: true,
						hexBytes: ['6F'],
						bytes: [111],
						totalBytes: 1,
						encoded: 'o',
					},
					{
						char: 'g',
						isCombined: false,
						isASCII: true,
						hexBytes: ['67'],
						bytes: [103],
						totalBytes: 1,
						encoded: 'g',
					},
				],
			},
			binary: '011001000110111101100111',
			totalChunks: 1,
			lastChunkPadded: false,
			padLength: 0,
			chunks: [
				{
					bytes: [100, 111, 103],
					encoding: 'ASCII',
					hex: '64 6F 67',
					hexBytes: ['64', '6F', '67'],
					ascii: 'dog',
					binary: '011001000110111101100111',
					isPadded: false,
					padLength: 0,
					inputMap: [
						{
							byte: 100,
							bin_word1: '0110',
							bin_word2: '0100',
							hex_word1: '6',
							hex_word2: '4',
							ascii: 'd',
							isWhiteSpace: false,
						},
						{
							byte: 111,
							bin_word1: '0110',
							bin_word2: '1111',
							hex_word1: '6',
							hex_word2: 'F',
							ascii: 'o',
							isWhiteSpace: false,
						},
						{
							byte: 103,
							bin_word1: '0110',
							bin_word2: '0111',
							hex_word1: '6',
							hex_word2: '7',
							ascii: 'g',
							isWhiteSpace: false,
						},
					],
				},
			],
		});
	});

	test('can create a map (no whitespace, WITH pad characters) for a 3-byte chunk of an ASCII string', () => {
		expect(validateEncoderInput('do', 'ASCII', 'base64')).toEqual({
			inputText: 'do',
			inputEncoding: 'ASCII',
			outputEncoding: 'base64',
			validationResult: {
				success: true,
				value: 'do',
			},
			bytes: [100, 111],
			hex: '64 6F',
			hexBytes: ['64', '6F'],
			ascii: 'do',
			utf8: {
				utf8: 'do',
				hasCombinedChars: false,
				stringLength: 2,
				encoded: 'do',
				totalBytes: 2,
				hexBytes: ['64', '6F'],
				bytes: [100, 111],
				charMap: [
					{
						char: 'd',
						isCombined: false,
						isASCII: true,
						hexBytes: ['64'],
						bytes: [100],
						totalBytes: 1,
						encoded: 'd',
					},
					{
						char: 'o',
						isCombined: false,
						isASCII: true,
						hexBytes: ['6F'],
						bytes: [111],
						totalBytes: 1,
						encoded: 'o',
					},
				],
			},
			binary: '0110010001101111',
			totalChunks: 1,
			lastChunkPadded: true,
			padLength: 2,
			chunks: [
				{
					bytes: [100, 111],
					encoding: 'ASCII',
					hex: '64 6F',
					hexBytes: ['64', '6F'],
					ascii: 'do',
					binary: '011001000110111100',
					isPadded: true,
					padLength: 2,
					inputMap: [
						{
							byte: 100,
							bin_word1: '0110',
							bin_word2: '0100',
							hex_word1: '6',
							hex_word2: '4',
							ascii: 'd',
							isWhiteSpace: false,
						},
						{
							byte: 111,
							bin_word1: '0110',
							bin_word2: '1111',
							hex_word1: '6',
							hex_word2: 'F',
							ascii: 'o',
							isWhiteSpace: false,
						},
					],
				},
			],
		});
	});

	test('can create a map (WITH whitespace, no pad characters) for a single chunk of an ASCII string', () => {
		expect(validateEncoderInput(' do', 'ASCII', 'base64')).toEqual({
			inputText: ' do',
			inputEncoding: 'ASCII',
			outputEncoding: 'base64',
			validationResult: {
				success: true,
				value: ' do',
			},
			bytes: [32, 100, 111],
			hex: '20 64 6F',
			hexBytes: ['20', '64', '6F'],
			ascii: ' do',
			utf8: {
				utf8: ' do',
				hasCombinedChars: false,
				stringLength: 3,
				encoded: '%20do',
				totalBytes: 3,
				hexBytes: ['20', '64', '6F'],
				bytes: [32, 100, 111],
				charMap: [
					{
						char: ' ',
						isCombined: false,
						isASCII: true,
						hexBytes: ['20'],
						bytes: [32],
						totalBytes: 1,
						encoded: '%20',
					},
					{
						char: 'd',
						isCombined: false,
						isASCII: true,
						hexBytes: ['64'],
						bytes: [100],
						totalBytes: 1,
						encoded: 'd',
					},
					{
						char: 'o',
						isCombined: false,
						isASCII: true,
						hexBytes: ['6F'],
						bytes: [111],
						totalBytes: 1,
						encoded: 'o',
					},
				],
			},
			binary: '001000000110010001101111',
			totalChunks: 1,
			lastChunkPadded: false,
			padLength: 0,
			chunks: [
				{
					bytes: [32, 100, 111],
					encoding: 'ASCII',
					hex: '20 64 6F',
					hexBytes: ['20', '64', '6F'],
					ascii: ' do',
					binary: '001000000110010001101111',
					isPadded: false,
					padLength: 0,
					inputMap: [
						{
							byte: 32,
							bin_word1: '0010',
							bin_word2: '0000',
							hex_word1: '2',
							hex_word2: '0',
							ascii: 'ws',
							isWhiteSpace: true,
						},
						{
							byte: 100,
							bin_word1: '0110',
							bin_word2: '0100',
							hex_word1: '6',
							hex_word2: '4',
							ascii: 'd',
							isWhiteSpace: false,
						},
						{
							byte: 111,
							bin_word1: '0110',
							bin_word2: '1111',
							hex_word1: '6',
							hex_word2: 'F',
							ascii: 'o',
							isWhiteSpace: false,
						},
					],
				},
			],
		});
	});

	test('can create a map (WITH whitespace, WITH pad characters) for a 3-byte chunk of an ASCII string', () => {
		expect(validateEncoderInput(' d', 'ASCII', 'base64')).toEqual({
			inputText: ' d',
			inputEncoding: 'ASCII',
			outputEncoding: 'base64',
			validationResult: {
				success: true,
				value: ' d',
			},
			bytes: [32, 100],
			hex: '20 64',
			hexBytes: ['20', '64'],
			ascii: ' d',
			utf8: {
				utf8: ' d',
				hasCombinedChars: false,
				stringLength: 2,
				encoded: '%20d',
				totalBytes: 2,
				hexBytes: ['20', '64'],
				bytes: [32, 100],
				charMap: [
					{
						char: ' ',
						isCombined: false,
						isASCII: true,
						hexBytes: ['20'],
						bytes: [32],
						totalBytes: 1,
						encoded: '%20',
					},
					{
						char: 'd',
						isCombined: false,
						isASCII: true,
						hexBytes: ['64'],
						bytes: [100],
						totalBytes: 1,
						encoded: 'd',
					},
				],
			},
			binary: '0010000001100100',
			totalChunks: 1,
			lastChunkPadded: true,
			padLength: 2,
			chunks: [
				{
					bytes: [32, 100],
					encoding: 'ASCII',
					hex: '20 64',
					hexBytes: ['20', '64'],
					ascii: ' d',
					binary: '001000000110010000',
					isPadded: true,
					padLength: 2,
					inputMap: [
						{
							byte: 32,
							bin_word1: '0010',
							bin_word2: '0000',
							hex_word1: '2',
							hex_word2: '0',
							ascii: 'ws',
							isWhiteSpace: true,
						},
						{
							byte: 100,
							bin_word1: '0110',
							bin_word2: '0100',
							hex_word1: '6',
							hex_word2: '4',
							ascii: 'd',
							isWhiteSpace: false,
						},
					],
				},
			],
		});
	});

	test('can create a map (no whitespace, no pad characters) for a 3-byte chunk of a hex string', () => {
		expect(validateEncoderInput('5f3c0a', 'hex', 'base64')).toEqual({
			inputText: '5f3c0a',
			inputEncoding: 'hex',
			outputEncoding: 'base64',
			validationResult: {
				success: true,
				value: '5f3c0a',
			},
			bytes: [95, 60, 10],
			hex: '5F 3C 0A',
			hexBytes: ['5F', '3C', '0A'],
			ascii: '',
			utf8: null,
			binary: '010111110011110000001010',
			totalChunks: 1,
			lastChunkPadded: false,
			padLength: 0,
			chunks: [
				{
					bytes: [95, 60, 10],
					encoding: 'hex',
					hex: '5F 3C 0A',
					hexBytes: ['5F', '3C', '0A'],
					ascii: '',
					binary: '010111110011110000001010',
					isPadded: false,
					padLength: 0,
					inputMap: [
						{
							byte: 95,
							bin_word1: '0101',
							bin_word2: '1111',
							hex_word1: '5',
							hex_word2: 'F',
							ascii: '',
							isWhiteSpace: false,
						},
						{
							byte: 60,
							bin_word1: '0011',
							bin_word2: '1100',
							hex_word1: '3',
							hex_word2: 'C',
							ascii: '',
							isWhiteSpace: false,
						},
						{
							byte: 10,
							bin_word1: '0000',
							bin_word2: '1010',
							hex_word1: '0',
							hex_word2: 'A',
							ascii: '',
							isWhiteSpace: false,
						},
					],
				},
			],
		});
	});
});

describe('validateDecoderInputChunks', () => {
	test('can create a map for a base64 string (encoding: base64, length: 4, padding: None)', () => {
		expect(validateDecoderInput('ZG9n', 'base64')).toEqual({
			inputText: 'ZG9n',
			inputEncoding: 'base64',
			validationResult: {
				success: true,
			},
			base64: 'ZG9n',
			totalChunks: 1,
			lastChunkPadded: false,
			padLength: 0,
			binary: '011001000110111101100111',
			chunks: [
				{
					base64: 'ZG9n',
					binary: '011001000110111101100111',
					encoding: 'base64',
					isPadded: false,
					padLength: 0,
					inputMap: [
						{
							bin: '011001',
							dec: 25,
							b64: 'Z',
							isPad: false,
						},
						{
							bin: '000110',
							dec: 6,
							b64: 'G',
							isPad: false,
						},
						{
							bin: '111101',
							dec: 61,
							b64: '9',
							isPad: false,
						},
						{
							bin: '100111',
							dec: 39,
							b64: 'n',
							isPad: false,
						},
					],
				},
			],
		});
	});

	test('can create a map for a base64 string (encoding: base64, length: 3, padding: 1)', () => {
		expect(validateDecoderInput('ZG8=', 'base64')).toEqual({
			inputText: 'ZG8=',
			inputEncoding: 'base64',
			validationResult: {
				success: true,
			},
			base64: 'ZG8',
			totalChunks: 1,
			lastChunkPadded: true,
			padLength: 1,
			binary: '011001000110111100',
			chunks: [
				{
					base64: 'ZG8',
					binary: '011001000110111100',
					encoding: 'base64',
					isPadded: true,
					padLength: 1,
					inputMap: [
						{
							bin: '011001',
							dec: 25,
							b64: 'Z',
							isPad: false,
						},
						{
							bin: '000110',
							dec: 6,
							b64: 'G',
							isPad: false,
						},
						{
							bin: '111100',
							dec: 60,
							b64: '8',
							isPad: false,
						},
						{
							bin: '',
							dec: null,
							b64: '=',
							isPad: true,
						},
					],
				},
			],
		});
	});
});
