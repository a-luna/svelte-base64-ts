import { B64_ALPHABET_COMMON, BIN_TO_HEX } from '$lib/constants';
import type { AsciiCharacterMap, Base64CharacterMap, Base64Encoding } from '$lib/types';
import { chunkify, decimalToBinaryString } from '$lib/util';

export const getBase64LookupMap = (base64Encoding: Base64Encoding): { [key: string]: number } => {
	const base64Lookup = {};
	getBase64Alphabet(base64Encoding).forEach((letter, index) => {
		base64Lookup[letter] = index;
	});
	return base64Lookup;
};

export function getChunkedBase64Map(args: {
	base64Encoding: Base64Encoding;
	chunkSize: number;
}): Base64CharacterMap[][] {
	const { base64Encoding, chunkSize } = args;
	const base64Alphabet = getBase64Alphabet(base64Encoding);
	const base64Map: Base64CharacterMap[] = base64Alphabet.map((b64, index) => ({
		b64,
		bin: `${'0'.repeat(6 - index.toString(2).length)}${index.toString(2)}`,
		dec: index,
	}));
	base64Map.push({
		b64: '=',
		bin: '------',
		dec: '--',
	});
	return chunkify<Base64CharacterMap>({ inputList: base64Map, chunkSize });
}

export function getBase64Alphabet(base64Encoding: Base64Encoding): string[] {
	switch (base64Encoding) {
		case 'base64':
			return [...B64_ALPHABET_COMMON, '+', '/'];
		case 'base64url':
			return [...B64_ALPHABET_COMMON, '-', '_'];
	}
}

export function getChunkedAsciiMap(args: { chunkSize: number }): AsciiCharacterMap[][] {
	const { chunkSize } = args;
	const asciiMap: AsciiCharacterMap[] = [];
	// ASCII printable range is 0x20 (decimal: 32) through 0x7F (decimal: 127)
	for (let i = 32; i < 127; i++) {
		const bin = decimalToBinaryString(i);
		asciiMap.push({
			ascii: String.fromCharCode(i),
			hex: `${BIN_TO_HEX[bin.substring(0, 4)]}${BIN_TO_HEX[bin.substring(4, 8)]}`,
			binWord1: bin.substring(0, 4),
			binWord2: bin.substring(4, 8),
			bin,
			dec: i,
		});
	}
	return chunkify<AsciiCharacterMap>({ inputList: asciiMap, chunkSize });
}

export function getAsciiCharacterDescription(byte: number, excludeAlphanumericChars = true): string {
	if (byte < 32 || byte > 126) {
		// char code is not within the range of printable ASCII characters
		return '';
	}
	const char = String.fromCharCode(byte);
	if (excludeAlphanumericChars && /[0-9A-Za-z]/.test(char)) {
		// by default, no description is returned for alphanumeric chars, since 'uppercase R' and
		// 'number four' are rather obvious. This can be overridden by setting excludeAlphanumericChars = false.
		return '';
	}
	let description = '';
	if (65 <= byte && byte <= 90) {
		description = `Uppercase "${char}"`;
	} else if (97 <= byte && byte <= 122) {
		description = `Lowercase "${char}"`;
	} else {
		const remainingCharMap = [
			{ byte: 32, description: 'Space' },
			{ byte: 33, description: 'Exclamation Mark' },
			{ byte: 34, description: 'Quotation Mark' },
			{ byte: 35, description: 'Number Sign' },
			{ byte: 36, description: 'Dollar Sign' },
			{ byte: 37, description: 'Percent Sign' },
			{ byte: 38, description: 'Ampersand' },
			{ byte: 39, description: 'Apostrophe' },
			{ byte: 40, description: 'Left Parenthesis' },
			{ byte: 41, description: 'Right Parenthesis' },
			{ byte: 42, description: 'Asterisk' },
			{ byte: 43, description: 'Plus Sign' },
			{ byte: 44, description: 'Comma' },
			{ byte: 45, description: 'Hyphen/Minus' },
			{ byte: 46, description: 'Full Stop' },
			{ byte: 47, description: 'Forward Slash' },
			{ byte: 48, description: 'Number Zero' },
			{ byte: 49, description: 'Number One' },
			{ byte: 50, description: 'Number Two' },
			{ byte: 51, description: 'Number Three' },
			{ byte: 52, description: 'Number Four' },
			{ byte: 53, description: 'Number Five' },
			{ byte: 54, description: 'Number Six' },
			{ byte: 55, description: 'Number Seven' },
			{ byte: 56, description: 'Number Eight' },
			{ byte: 57, description: 'Number Nine' },
			{ byte: 58, description: 'Colon' },
			{ byte: 59, description: 'Semicolon' },
			{ byte: 60, description: 'Less-than Sign' },
			{ byte: 61, description: 'Equals Sign' },
			{ byte: 62, description: 'Greater-than Sign' },
			{ byte: 63, description: 'Question Mark' },
			{ byte: 64, description: 'At Sign' },
			{ byte: 91, description: 'Left Square Bracket' },
			{ byte: 92, description: 'Backslash' },
			{ byte: 93, description: 'Right Square Bracket' },
			{ byte: 94, description: 'Caret' },
			{ byte: 95, description: 'Underscore' },
			{ byte: 96, description: 'Grave Accent' },
			{ byte: 123, description: 'Left Curly Bracket' },
			{ byte: 124, description: 'Vertical Bar' },
			{ byte: 125, description: 'Right Curly Bracket' },
			{ byte: 126, description: 'Tilde' },
		];
		description = remainingCharMap.find((map) => map.byte === byte)?.description ?? '';
	}
	return description.toLowerCase();
}
