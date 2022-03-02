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

export const getBase64CharacterMap = (args: {
	base64Encoding: Base64Encoding;
	chunkSize: number;
}): Base64CharacterMap[] =>
	getChunkedBase64Map({ base64Encoding: args.base64Encoding, chunkSize: args.chunkSize }).flat();

export function getChunkedBase64Map(args: {
	base64Encoding: Base64Encoding;
	chunkSize: number;
}): Base64CharacterMap[][] {
	const { base64Encoding, chunkSize } = args;
	const base64Alphabet = getBase64Alphabet(base64Encoding);
	const base64Map: Base64CharacterMap[] = base64Alphabet.map((b64, index) => ({
		b64,
		bin: `${'0'.repeat(6 - index.toString(2).length)}${index.toString(2)}`,
		dec: index
	}));
	base64Map.push({
		b64: '=',
		bin: '------',
		dec: '--'
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
	const asciiMap = [];
	// ASCII printable range is 0x20 (i.e., 32) through 0x7F (i.e., 127)
	for (let i = 32; i < 127; i++) {
		const bin = decimalToBinaryString(i);
		asciiMap.push({
			ascii: String.fromCharCode(i),
			hex: `${BIN_TO_HEX[bin.substring(0, 4)]}${BIN_TO_HEX[bin.substring(4, 8)]}`,
			binWord1: bin.substring(0, 4),
			binWord2: bin.substring(4, 8),
			bin,
			dec: i
		});
	}
	return chunkify<AsciiCharacterMap>({ inputList: asciiMap, chunkSize });
}
