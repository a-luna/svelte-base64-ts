import type {
	ByteEncodingMap,
	Utf8ComplexCharacterMap,
	Utf8StandardCharacterMap,
	Utf8StringComposition,
} from '$lib/types';
import { genericStringToByteArray, hexStringFromByte, hexStringToByte } from '$lib/util';
import { validateAsciiBytes } from '$lib/validation';

// These RegExps and the utf8ToCharArray function below are directly copied from the implementation
// of the _stringToArray function in lodash (https://github.com/lodash/lodash/blob/4.13.1-npm/_stringToArray.js)
// Everything else in this file is original work by Aaron Luna (@a-luna, contact@aaronluna.dev

/** Used to compose unicode character classes. */
const rsAstralRange = '\\ud800-\\udfff',
	rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
	rsComboSymbolsRange = '\\u20d0-\\u20f0',
	rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
const rsAstral = '[' + rsAstralRange + ']',
	rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']',
	rsFitz = '\\ud83c[\\udffb-\\udfff]',
	rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
	rsNonAstral = '[^' + rsAstralRange + ']',
	rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
	rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
	rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
const reOptMod = rsModifier + '?',
	rsOptVar = '[' + rsVarRange + ']?',
	rsOptJoin =
		'(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
	rsSeq = rsOptVar + reOptMod + rsOptJoin,
	rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
const reComplexSymbol = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

export const utf8ToCharArray = (s: string): RegExpMatchArray => s.match(reComplexSymbol);

export function decomposeUtf8String(s: string): Utf8StringComposition {
	const complexCharMap: Utf8ComplexCharacterMap[] = utf8ToCharArray(s).map((utf8) => {
		const charMap: Utf8StandardCharacterMap[] = [...utf8].map((char) => {
			const charData = getUtf8EncodedByteMaps(char).map((byteMap) => ({ hex: byteMap.hex, byte: byteMap.byte }));
			const hexBytes = charData.map((data) => data.hex);
			const bytes = charData.map((data) => data.byte);
			const isASCII = validateAsciiBytes(bytes);
			return { char, isASCII, hexBytes, bytes, totalBytes: bytes.length, encoded: encodeURI(char) };
		});
		const hexBytes = charMap.map((charMap) => charMap.hexBytes).flat();
		const bytes = charMap.map((charMap) => charMap.bytes).flat();
		const isCombined = charMap.length > 1;
		const isASCII = validateAsciiBytes(bytes);
		const complexCharMap: Utf8ComplexCharacterMap = {
			char: utf8,
			isCombined,
			isASCII,
			hexBytes,
			bytes,
			totalBytes: bytes.length,
			encoded: encodeURIComponent(utf8),
		};
		if (isCombined) {
			complexCharMap.charMap = charMap;
		}
		return complexCharMap;
	});
	const hexBytes = complexCharMap.map((charMap) => charMap.hexBytes).flat();
	const bytes = complexCharMap.map((charMap) => charMap.bytes).flat();
	return {
		utf8: s,
		hasCombinedChars: complexCharMap.some((charMap) => charMap.isCombined),
		stringLength: complexCharMap.length,
		encoded: encodeURIComponent(s),
		totalBytes: bytes.length,
		hexBytes,
		bytes,
		charMap: complexCharMap,
	};
}

export function getUtf8EncodedByteMaps(s: string): ByteEncodingMap[] {
	const utf8Encoded = encodeURIComponent(s);
	const utf8ByteMaps = getUtf8ByteMaps(utf8Encoded);
	const asciiByteMaps: ByteEncodingMap[] = utf8ByteMaps.length
		? findMissingAsciiBytes(utf8ByteMaps, utf8Encoded)
		: getAsciiByteMaps(utf8Encoded, 0, utf8Encoded.length);
	return [...utf8ByteMaps, ...asciiByteMaps].sort((a, b) => a.start - b.start);
}

function getUtf8ByteMaps(utf8Encoded: string): ByteEncodingMap[] {
	const encodedUtf8Bytes = [...utf8Encoded.matchAll(/%(?<encodedByte>[0-9A-F]{2,2})/g)];
	return encodedUtf8Bytes.map((match) => ({
		byte: hexStringToByte(match.groups.encodedByte),
		hex: match.groups.encodedByte,
		start: match.index,
		end: match.index + match[0].length,
	}));
}

function findMissingAsciiBytes(utf8ByteMaps: ByteEncodingMap[], utf8Encoded: string) {
	let index = utf8ByteMaps.at(0).start;
	const missingAsciiBytes = utf8ByteMaps
		.map((byte) => {
			const missingByteMaps = getAsciiByteMaps(utf8Encoded, index, byte.start);
			index = missingByteMaps?.length ? index + missingByteMaps.length : byte.end;
			return missingByteMaps;
		})
		.flat();
	return [
		...getAsciiByteMaps(utf8Encoded, 0, utf8ByteMaps.at(0).start),
		...missingAsciiBytes,
		...getAsciiByteMaps(utf8Encoded, utf8ByteMaps.at(-1).end, utf8Encoded.length),
	];
}

function getAsciiByteMaps(utf8Encoded: string, start: number, end: number): ByteEncodingMap[] {
	const substring = utf8Encoded.slice(start, end);
	return substring.length
		? genericStringToByteArray(substring).map((byte, i) => ({
				byte,
				hex: hexStringFromByte(byte),
				start: start + i,
				end: start + i + 1,
		  }))
		: [];
}
