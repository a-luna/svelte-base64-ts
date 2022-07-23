import type { HexByteMap } from '.';

export type ByteEncodingMap = { byte: number; hex: string; start: number; end: number };

export interface Utf8StandardCharacterMap {
	char: string;
	isASCII: boolean;
	hexBytes: string[];
	bytes: number[];
	totalBytes: number;
	encoded: string;
	hexMap?: HexByteMap[];
}

export interface Utf8ComplexCharacterMap {
	char: string;
	isCombined: boolean;
	isASCII: boolean;
	hexBytes: string[];
	bytes: number[];
	totalBytes: number;
	encoded: string;
	charMap?: Utf8StandardCharacterMap[];
	hexMap?: HexByteMap[];
}

export interface Utf8StringComposition {
	utf8: string;
	hasCombinedChars: boolean;
	stringLength: number;
	encoded: string;
	totalBytes: number;
	hexBytes: string[];
	hexMap?: HexByteMap[];
	bytes: number[];
	charMap: Utf8ComplexCharacterMap[];
}
