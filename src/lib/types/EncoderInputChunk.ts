import type { HexByteMap, StringEncoding } from '.';

export interface EncoderInputChunk {
	bytes: number[];
	encoding: StringEncoding;
	hex: string;
	hexBytes: string[];
	ascii: string;
	binary: string;
	isPadded: boolean;
	padLength: number;
	inputMap: HexByteMap[];
}
