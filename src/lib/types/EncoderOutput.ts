import type { Base64Encoding, OutputChunk, StringEncoding, Utf8StringComposition } from '.';

export interface EncoderOutput {
	input: string;
	inputEncoding: StringEncoding;
	isASCII: boolean;
	output: string;
	bytes: number[];
	outputEncoding: Base64Encoding;
	chunks: OutputChunk[];
	utf8?: Utf8StringComposition;
}
