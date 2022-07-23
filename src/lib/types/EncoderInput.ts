import type { Base64Encoding, EncoderInputChunk, Result, StringEncoding, Utf8StringComposition } from '.';

export interface EncoderInput {
	inputText: string;
	inputEncoding: StringEncoding;
	outputEncoding: Base64Encoding;
	validationResult: Result<string>;
	bytes?: number[];
	hexBytes?: string[];
	hex?: string;
	ascii?: string;
	utf8?: Utf8StringComposition;
	binary?: string;
	totalChunks?: number;
	lastChunkPadded?: boolean;
	padLength?: number;
	chunks?: EncoderInputChunk[];
}
