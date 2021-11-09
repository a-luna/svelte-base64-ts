import { getBase64Alphabet } from './maps';
import type { Base64Encoding, StringEncoding } from './types';
import { Result } from './util';

const BASE64_STANDARD_ALPHABET = /^[0-9A-Za-z+/=]+$/;
const BASE64_STANDARD_FORMAT = /^[0-9A-Za-z+/]+[=]{0,2}$/;
const BASE64_URL_ALPHABET = /^[0-9A-Za-z-_=]+$/;
const BASE64_URL_FORMAT = /^[0-9A-Za-z-_]+[=]{0,2}$/;

export function validateAsciiBytes(byteArray: number[]) {
	return byteArray.every((byte: number) => byte > 31 && byte < 127);
}

export function validateTextEncoding(input: string, encoding: StringEncoding): Result<boolean> | Result {
	if (input.length == 0) {
		const error = 'You must provide a string value to encode, text box is empty.';
		return Result.Fail(error);
	}
	switch (encoding) {
		case 'ASCII':
			return validateAsciiString(input);
		case 'hex':
			return validateHexString(input);
	}
}

function validateAsciiString(input: string): Result<boolean> | Result {
	if (!/^[ -~]+$/.test(input)) {
		const error = `"${input}" contains data that is not part of the ASCII printable character set.`;
		return Result.Fail(error);
	}
	return Result.Ok(true);
}

function validateHexString(input: string): Result<boolean> | Result {
	const originalInput = `${input}`;
	if (/^0x\w+$/.test(input)) {
		input = input.replace(/0x/, '');
	}
	if (!/^[0-9A-Fa-f]+$/.test(input)) {
		const error = `"${originalInput}" is not a valid hex string, must contain only hexadecimal digits (a-f, A-F, 0-9)`;
		return Result.Fail(error);
	}
	if (input.length % 2 > 0) {
		const error = `Hex string must have an even number of digits, length(${originalInput}) = ${input.length}`;
		return Result.Fail(error);
	}
	return Result.Ok(true);
}

export function validateBase64Encoding(input: string, encoding: Base64Encoding): Result<boolean> | Result {
	if (input.length == 0) {
		return Result.Fail('You must provide a string value to encode, text box is empty.');
	}
	const lastChunkLength = input.length % 4;
	if (lastChunkLength === 1) {
		const error = `"${input}" is not a valid ${encoding} string.`;
		return Result.Fail(error);
	}
	const [alphabet_pattern, format_pattern] = getBase64ValidationPatterns(encoding);
	if (!alphabet_pattern.test(input)) {
		const error = getInvalidCharactersErrorMessage(input, encoding);
		return Result.Fail(error);
	}
	if (!format_pattern.test(input)) {
		const error = `"${input}" is not a valid ${encoding} string.`;
		return Result.Fail(error);
	}
	return Result.Ok(true);
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
				.filter((char) => !base64Alphabet.includes(char))
		)
	];
	return distinct.map((char) => `["${char}", 0x${char.charCodeAt(0)}]`);
}
