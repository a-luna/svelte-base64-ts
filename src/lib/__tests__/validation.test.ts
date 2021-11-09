/// <reference types="jest" />
import { validateTextEncoding, validateBase64Encoding } from '../validation';

describe('validateTextEncoding', () => {
	it('can identify an empty string as an invalid value', () => {
		const result1 = validateTextEncoding('', 'ASCII');
		expect(result1.success).toBe(false);
		expect(result1.failure).toBe(true);
		expect(result1.error).toBe('You must provide a string value to encode, text box is empty.');

		const result2 = validateTextEncoding('', 'hex');
		expect(result2.success).toBe(false);
		expect(result2.failure).toBe(true);
		expect(result2.error).toBe('You must provide a string value to encode, text box is empty.');
	});

	it('can identify a valid ASCII string', () => {
		const result = validateTextEncoding('dog', 'ASCII');
		expect(result.success).toBe(true);
		expect(result.failure).toBe(false);
		expect(result.error).toBe('');
	});

	it('can identify an invalid ASCII string (contains non-printable characters)', () => {
		const result = validateTextEncoding('do§', 'ASCII');
		expect(result.success).toBe(false);
		expect(result.failure).toBe(true);
		expect(result.error).toBe('"do§" contains data that is not part of the ASCII printable character set.');
	});

	it('can identify a valid hex string', () => {
		const result1 = validateTextEncoding('1b57cc', 'hex');
		expect(result1.success).toBe(true);
		expect(result1.failure).toBe(false);
		expect(result1.error).toBe('');

		const result2 = validateTextEncoding('0x1b57cc', 'hex');
		expect(result2.success).toBe(true);
		expect(result2.failure).toBe(false);
		expect(result2.error).toBe('');
	});

	it('can identify an invalid hex string (contains non-hex digits)', () => {
		const result1 = validateTextEncoding('1g57cc', 'hex');
		expect(result1.success).toBe(false);
		expect(result1.failure).toBe(true);
		expect(result1.error).toBe(
			'"1g57cc" is not a valid hex string, must contain only hexadecimal digits (a-f, A-F, 0-9)'
		);

		const result2 = validateTextEncoding('0x1g57cc', 'hex');
		expect(result2.success).toBe(false);
		expect(result2.failure).toBe(true);
		expect(result2.error).toBe(
			'"0x1g57cc" is not a valid hex string, must contain only hexadecimal digits (a-f, A-F, 0-9)'
		);
	});

	it('can identify an invalid hex string (length is not an even number)', () => {
		const result1 = validateTextEncoding('157cc', 'hex');
		expect(result1.success).toBe(false);
		expect(result1.failure).toBe(true);
		expect(result1.error).toBe('Hex string must have an even number of digits, length(157cc) = 5');

		const result2 = validateTextEncoding('0x157cc', 'hex');
		expect(result2.success).toBe(false);
		expect(result2.failure).toBe(true);
		expect(result2.error).toBe('Hex string must have an even number of digits, length(0x157cc) = 5');
	});
});

describe('validateBase64Encoding', () => {
	it('can identify an empty string as an invalid value', () => {
		const result1 = validateBase64Encoding('', 'base64');
		expect(result1.success).toBe(false);
		expect(result1.failure).toBe(true);
		expect(result1.error).toBe('You must provide a string value to encode, text box is empty.');

		const result2 = validateBase64Encoding('', 'base64url');
		expect(result2.success).toBe(false);
		expect(result2.failure).toBe(true);
		expect(result2.error).toBe('You must provide a string value to encode, text box is empty.');
	});

	it('can identify a valid base64 string', () => {
		const result1 = validateBase64Encoding('ZG9n', 'base64');
		expect(result1.success).toBe(true);
		expect(result1.failure).toBe(false);
		expect(result1.error).toBe('');

		const result2 = validateBase64Encoding('ZG/+', 'base64');
		expect(result2.success).toBe(true);
		expect(result2.failure).toBe(false);
		expect(result2.error).toBe('');
	});

	it('can identify a valid base64url string', () => {
		const result1 = validateBase64Encoding('ZG9n', 'base64url');
		expect(result1.success).toBe(true);
		expect(result1.failure).toBe(false);
		expect(result1.error).toBe('');

		const result2 = validateBase64Encoding('ZG-_', 'base64url');
		expect(result2.success).toBe(true);
		expect(result2.failure).toBe(false);
		expect(result2.error).toBe('');
	});

	it('can identify an invalid base64 string (lastChunkLength: 1)', () => {
		const result1 = validateBase64Encoding('Z', 'base64');
		expect(result1.success).toBe(false);
		expect(result1.failure).toBe(true);
		expect(result1.error).toBe('"Z" is not a valid base64 string.');

		const result2 = validateBase64Encoding('Z', 'base64url');
		expect(result2.success).toBe(false);
		expect(result2.failure).toBe(true);
		expect(result2.error).toBe('"Z" is not a valid base64url string.');
	});

	it('can identify in invalid base64 string (has invalid characters)', () => {
		const result1 = validateBase64Encoding('ZG$n', 'base64');
		expect(result1.success).toBe(false);
		expect(result1.failure).toBe(true);
		expect(result1.error).toBe('"ZG$n" contains 1 invalid character:\n["$", 0x36]');

		const result2 = validateBase64Encoding('ZG$n', 'base64url');
		expect(result2.success).toBe(false);
		expect(result2.failure).toBe(true);
		expect(result2.error).toBe('"ZG$n" contains 1 invalid character:\n["$", 0x36]');
	});

	it('can identify an invalid base64 string (has base64url characters)', () => {
		const result = validateBase64Encoding('Z-9n', 'base64');
		expect(result.success).toBe(false);
		expect(result.failure).toBe(true);
		expect(result.error).toBe('"Z-9n" contains 1 invalid character:\n["-", 0x45]');
	});

	it('can identify an invalid base64url string (has base64 characters)', () => {
		const result = validateBase64Encoding('+G9n', 'base64url');
		expect(result.success).toBe(false);
		expect(result.failure).toBe(true);
		expect(result.error).toBe('"+G9n" contains 1 invalid character:\n["+", 0x43]');
	});

	it('can identify an invalid base64 string (pad character within string)', () => {
		const result1 = validateBase64Encoding('Z=9n', 'base64');
		expect(result1.success).toBe(false);
		expect(result1.failure).toBe(true);
		expect(result1.error).toBe('"Z=9n" is not a valid base64 string.');

		const result2 = validateBase64Encoding('Z=9n', 'base64url');
		expect(result2.success).toBe(false);
		expect(result2.failure).toBe(true);
		expect(result2.error).toBe('"Z=9n" is not a valid base64url string.');
	});
});
