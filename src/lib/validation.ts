import { getBase64Alphabet } from '$lib/maps';
import type { Base64Encoding, Result, StringEncoding } from '$lib/types';
import { utf8StringToByteArray } from './util';

const BASE64_STANDARD_ALPHABET = /^[0-9A-Za-z+/=]+$/;
const BASE64_STANDARD_FORMAT = /^[0-9A-Za-z+/]+[=]{0,2}$/;
const BASE64_URL_ALPHABET = /^[0-9A-Za-z-_=]+$/;
const BASE64_URL_FORMAT = /^[0-9A-Za-z-_]+[=]{0,2}$/;

export const validateAsciiBytes = (byteArray: number[]): boolean =>
	byteArray.every((byte: number) => byte > 31 && byte < 127);

export function validateTextEncoding(input: string, encoding: StringEncoding): Result<string> {
	if (!input || input.length == 0) {
		const error = 'You must provide a value to encode, text box is empty.';
		return { success: false, error: Error(error) };
	}
	switch (encoding) {
		case 'ASCII':
			return validateAsciiString(input);
		case 'UTF-8':
			return validateUtf8String(input);
		case 'hex':
			return validateHexString(input);
		case 'bin':
			return validateBinaryString(input);
	}
}

function validateAsciiString(input: string): Result<string> {
	if (!/^[ -~]+$/.test(input)) {
		const nonAsciiChars = getNonAsciiCharsFromString(input);
		const error = `'${input}' contains ${nonAsciiChars.length} invalid character${
			nonAsciiChars.length > 1 ? 's' : ''
		}:\n${nonAsciiChars.join('\n')}`;
		return { success: false, error: Error(error) };
	}
	return { success: true, value: input };
}

function getNonAsciiCharsFromString(input: string): string[] {
	const bytes = Array.from(input, (_, i) => input.charCodeAt(i));
	const nonAsciiBytes = [...new Set(bytes)].filter((byte) => 32 > byte || byte > 126);
	const byteCounts = nonAsciiBytes.map((byte) => ({ byte, count: bytes.filter((b) => b === byte)?.length ?? 0 }));
	return byteCounts.sort((a, b) => b.count - a.count).map(getInvalidCharReport);
}

const charCodeIsWhitespace = (byte: number): boolean => /\s/.test(String.fromCharCode(byte));
const getStringRepresentationOfCharCode = (byte: number): string =>
	charCodeIsWhitespace(byte) ? `' '` : String.fromCharCode(byte);
const getInvalidCharReport = (details: { byte: number; count: number }): string =>
	`\t${getStringRepresentationOfCharCode(details.byte)} (0x${details.byte
		.toString(16)
		.toUpperCase()
		.padStart(2, '0')}) Count: ${details.count}`;

function validateHexString(input: string): Result<string> {
	const originalInput = input;
	input = input.replace(/ /g, '');
	if (/^0x\w+$/.test(input)) {
		input = input.replace(/0x/, '');
	}
	if (!/^[0-9A-Fa-f]+$/.test(input)) {
		const error = `"${originalInput}" is not a valid hex string, must contain only hexadecimal digits (a-f, A-F, 0-9)`;
		return { success: false, error: Error(error) };
	}
	if (input.length % 2) {
		const error = `Hex string must have an even number of digits, length('${originalInput}') = ${input.length}`;
		return { success: false, error: Error(error) };
	}
	return { success: true, value: input };
}

function validateBinaryString(input: string): Result<string> {
	if (!/^[01]+$/.test(input)) {
		const error = `Binary string can only contain zeroes ('0') or ones ('1'), "${input}" contains invalid characters.`;
		return { success: false, error: Error(error) };
	}
	if (input.length % 8) {
		const error = `Binary string must consist of 8-bit strings, length('${input}') = ${input.length}, which is not divisible by 8`;
		return { success: false, error: Error(error) };
	}
	return { success: true, value: input };
}

export function validateUtf8String(input: string): Result<string> {
	const bytes = utf8StringToByteArray(input);
	const result = getStringFromBytes(bytes, 0, bytes.length, true);
	return result.success ? { success: true, value: result.value } : { success: false, error: result.error };
}

export function getStringFromBytes(
	bytes: number[],
	byteOffset: number = null,
	byteLength: number = null,
	strict = false,
): Result<string> {
	let charLength: number;
	const chars: string[] = [];
	byteOffset = byteOffset ?? 0;
	byteLength = byteLength ?? bytes.length;
	for (; byteOffset < byteLength; byteOffset++) {
		charLength = getCharLength(bytes[byteOffset]);
		if (byteOffset + charLength > byteLength) {
			if (strict) {
				const error = `Index ${byteOffset}: Found a ${charLength} bytes encoded char declaration but only ${
					byteLength - byteOffset
				} bytes are available.`;
				return { success: false, error: Error(error) };
			}
		} else {
			const result = getCharCode(bytes, byteOffset, charLength);
			if (!result.success) {
				return { success: false, error: result.error };
			}
			chars.push(String.fromCodePoint(result.value));
		}
		byteOffset += charLength - 1;
	}
	return { success: true, value: chars.join('') };
}

function getCharLength(theByte: number): number {
	// 4 bytes encoded char (mask 11110000)
	if (0xf0 == (theByte & 0xf0)) {
		return 4;
		// 3 bytes encoded char (mask 11100000)
	} else if (0xe0 == (theByte & 0xe0)) {
		return 3;
		// 2 bytes encoded char (mask 11000000)
	} else if (0xc0 == (theByte & 0xc0)) {
		return 2;
		// 1 bytes encoded char
	} else if (theByte == (theByte & 0x7f)) {
		return 1;
	}
	return 0;
}

// UTF8 decoding functions
function getCharCode(bytes: number[], byteOffset: number, charLength: number): Result<number> {
	let charCode = 0,
		mask = '';
	byteOffset = byteOffset || 0;
	// validate that the array has at least one byte in it
	if (bytes.length - byteOffset <= 0) {
		return { success: false, error: Error('No more characters remaining in array.') };
	}
	// Retrieve charLength if not given
	charLength = charLength || getCharLength(bytes[byteOffset]);
	if (charLength == 0) {
		const error = `${bytes[byteOffset].toString(2)} is not a significative byte (offset: ${byteOffset}).`;
		return { success: false, error: Error(error) };
	}
	// Return byte value if charlength is 1
	if (1 === charLength) {
		return { success: true, value: bytes[byteOffset] };
	}
	// validate that the array has enough bytes to make up this character
	if (bytes.length - byteOffset < charLength) {
		return { success: false, error: Error(`Expected at least ${charLength} bytes remaining in array.`) };
	}
	// Test UTF8 integrity
	mask = '00000000'.slice(0, charLength) + `1` + '00000000'.slice(charLength + 1);
	if (bytes[byteOffset] & parseInt(mask, 2)) {
		const error = `Index ${byteOffset}: A ${charLength} bytes encoded char cannot encode the ${
			charLength + 1
		}th rank bit to 1.`;
		return { success: false, error: Error(error) };
	}
	// Reading the first byte
	mask = '0000'.slice(0, charLength + 1) + '11111111'.slice(charLength + 1);
	charCode += (bytes[byteOffset] & parseInt(mask, 2)) << (--charLength * 6);
	// Reading the next bytes
	while (charLength) {
		if (0x80 !== (bytes[byteOffset + 1] & 0x80) || 0x40 === (bytes[byteOffset + 1] & 0x40)) {
			const error = `Index ${byteOffset + 1}: Next bytes of encoded char must begin with a "10" bit sequence.`;
			return { success: false, error: Error(error) };
		}
		charCode += (bytes[++byteOffset] & 0x3f) << (--charLength * 6);
	}
	return { success: true, value: charCode };
}

export function validateBase64Encoding(input: string, encoding: Base64Encoding): Result {
	if (!input || input.length == 0) {
		const error = 'You must provide a string value to encode, text box is empty.';
		return { success: false, error: Error(error) };
	}
	const lastChunkLength = input.length % 4;
	if (lastChunkLength === 1) {
		const error = `"${input}" is not a valid ${encoding} string.`;
		return { success: false, error: Error(error) };
	}
	const [alphabet_pattern, format_pattern] = getBase64ValidationPatterns(encoding);
	if (!alphabet_pattern.test(input)) {
		const error = getInvalidCharactersErrorMessage(input, encoding);
		return { success: false, error: Error(error) };
	}
	if (!format_pattern.test(input)) {
		const error = `"${input}" is not a valid ${encoding} string.`;
		return { success: false, error: Error(error) };
	}
	return { success: true };
}

function getBase64ValidationPatterns(encoding: Base64Encoding): [RegExp, RegExp] {
	return encoding === 'base64'
		? [BASE64_STANDARD_ALPHABET, BASE64_STANDARD_FORMAT]
		: [BASE64_URL_ALPHABET, BASE64_URL_FORMAT];
}

function getInvalidCharactersErrorMessage(input: string, encoding: Base64Encoding): string {
	const invalid_characters = getInvalidCharacters(input, encoding);
	const pluralMaybe = invalid_characters.length > 1 ? 'characters' : 'character';
	const errorMessage = `"${input}" contains ${invalid_characters.length} invalid ${pluralMaybe}:`;
	return `${errorMessage}\n${invalid_characters.join('\n')}`;
}

function getInvalidCharacters(input: string, encoding: Base64Encoding): string[] {
	const base64Alphabet = getBase64Alphabet(encoding);
	const distinct = [
		...new Set(
			input
				.replace(/[=]/g, '')
				.split('')
				.filter((char) => !base64Alphabet.includes(char)),
		),
	];
	return distinct.map((char) => `["${char}", 0x${char.charCodeAt(0)}]`);
}
