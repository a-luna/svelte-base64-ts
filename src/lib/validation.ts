import { getBase64Alphabet } from '$lib/maps';
import type { Base64Encoding, Result, StringEncoding } from '$lib/types';

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
		case 'hex':
			return validateHexString(input);
		case 'bin':
			return validateBinaryString(input);
	}
}

function validateAsciiString(input: string): Result<string> {
	if (!/^[ -~]+$/.test(input)) {
		const error = `"${input}" contains data that is not part of the ASCII printable character set.`;
		return { success: false, error: Error(error) };
	}
	return { success: true, value: input };
}

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

function validateBinaryString(input: string) {
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
