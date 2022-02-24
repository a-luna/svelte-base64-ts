import type { Base64ByteMap, HexByteMap } from '.';

export interface OutputChunk {
	base64: string;
	binary: string;
	ascii: string;
	hex: string;
	hexBytes: string[];
	bytes: number[];
	isASCII: boolean;
	hexMap: HexByteMap[];
	base64Map: Base64ByteMap[];
}
