import type { Base64Encoding, EncoderInputChunk, Result, StringEncoding } from '.';

export interface EncoderInput {
	inputText: string;
	inputEncoding: StringEncoding;
	outputEncoding: Base64Encoding;
	validationResult: Result<string>;
	bytes?: number[];
	hexBytes?: string[];
	hex?: string;
	ascii?: string;
	utf8encoded?: string;
	binary?: string;
	totalChunks?: number;
	lastChunkPadded?: boolean;
	padLength?: number;
	chunks?: EncoderInputChunk[];
}
