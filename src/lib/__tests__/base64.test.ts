import { Base64Decoder, Base64Encoder } from '$lib/base64';
import { describe, expect, test } from 'vitest';

describe('Base64Encoder', () => {
	test('can encode a valid ascii string to standard base64', () => {
		const encoder = new Base64Encoder();
		const encodingInput = encoder.validateInput('dog', 'ASCII', 'base64');
		const encoded = encoder.encode(encodingInput);
		expect(encoded.output).toBe('ZG9n');
	});

	test('can encode a valid UTF-8 string to standard base64', () => {
		const encoder = new Base64Encoder();
		const encodingInput = encoder.validateInput('∑ßåœ ≈ ∆c', 'UTF-8', 'base64');
		const encoded = encoder.encode(encodingInput);
		expect(encoded.output).toBe('4oiRw5/DpcWTIOKJiCDiiIZj');
		expect(encoded.output).not.toBe('JUUyJTg4JTkxJUMzJTlGJUMzJUE1JUM1JTkzJTIwJUUyJTg5JTg4JTIwJUUyJTg4JTg2Yw==');
	});

	test('can decode a string that produces more than one output chunk', () => {
		const encoder = new Base64Encoder();
		const encodingInput = encoder.validateInput('this is a test', 'ASCII', 'base64');
		const encoded = encoder.encode(encodingInput);
		expect(encoded.output).toBe('dGhpcyBpcyBhIHRlc3Q=');
		expect(encoded.chunks.length).toBe(5);
		const chunk1 = encoded.chunks[0];
		expect(chunk1.ascii).toBe('thi');
		expect(chunk1.base64).toBe('dGhp');
		expect(chunk1.hex).toBe('74 68 69');
		const chunk1HexByte1Map = chunk1.hexMap[0];
		expect(chunk1HexByte1Map.ascii).toBe('t');
		expect(chunk1HexByte1Map.byte).toBe(116);
		expect(chunk1HexByte1Map.bin_word1).toBe('0111');
		expect(chunk1HexByte1Map.bin_word2).toBe('0100');
		const chunk1Base64Digit1Map = chunk1.base64Map[0];
		expect(chunk1Base64Digit1Map.b64).toBe('d');
		expect(chunk1Base64Digit1Map.dec).toBe(29);
		expect(chunk1Base64Digit1Map.bin).toBe('011101');
		const chunk5 = encoded.chunks[4];
		expect(chunk5.ascii).toBe('st');
		expect(chunk5.base64).toBe('c3Q=');
		expect(chunk5.hex).toBe('73 74');
		const chunk5HexByte2Map = chunk5.hexMap[1];
		expect(chunk5HexByte2Map.ascii).toBe('t');
		expect(chunk5HexByte2Map.byte).toBe(116);
		expect(chunk5HexByte2Map.bin_word1).toBe('0111');
		expect(chunk5HexByte2Map.bin_word2).toBe('0100');
		const chunk5Base64Digit4Map = chunk5.base64Map[3];
		expect(chunk5Base64Digit4Map.b64).toBe('=');
		expect(chunk5Base64Digit4Map.dec).toBe(null);
		expect(chunk5Base64Digit4Map.bin).toBe('');
	});
});

describe('Base64Decoder', () => {
	test('can decode a valid base64 string to ascii', () => {
		const decoder = new Base64Decoder();
		const decodingInput = decoder.validateInput('ZG9n', 'base64');
		const decoded = decoder.decode(decodingInput);
		expect(decoded.output).toBe('dog');
	});
});
