import { rotatingColors } from '$lib/constants';
import { getAsciiCharacterDescription } from '$lib/maps';
import type { Base64ByteMap, Base64Encoding, EncoderInputChunk, OutputChunk, StringEncoding } from '$lib/types';
import { decimalToBinaryString, hexStringFromByte, parseGroupId, stringToByteArray } from '$lib/util';

const convertNumber = (num: number) =>
	(num < 4 || num > 20) && num.toString().slice(-1)[0] === '1'
		? `${num}st`
		: (num < 4 || num > 20) && num.toString().slice(-1)[0] === '2'
		? `${num}nd`
		: (num < 4 || num > 20) && num.toString().slice(-1)[0] === '3'
		? `${num}rd`
		: `${num}th`;

const getSequentialColor = (i: number): string => rotatingColors[i % rotatingColors.length];
const getByteNumHtml = (num: number, colorNum: number) =>
	`<div class="byte-id" style="color: var(${getSequentialColor(
		colorNum,
	)})"><span class="letter-H">H</span><span class="byte-number">${num}</span></div>`;
const getInputChunkNumHtml = (num: number, colorNum: number) =>
	`<div class="chunk-id" style="color: var(${getSequentialColor(
		colorNum,
	)});"><span class="chunk-label">IN</span> <span class="chunk-number">${num}</span></div>`;
const getOutputChunkNumHtml = (num: number, colorNum: number) =>
	`<div class="chunk-id" style="color: var(${getSequentialColor(
		colorNum,
	)});"><span class="chunk-label">OUT</span> <span class="chunk-number">${num}</span></div>`;
const getB64CharNumHtml = (num: number, colorNum: number) =>
	`<div class="b64Char-id" style="color: var(${getSequentialColor(
		colorNum,
	)});"><span class="letter-B">B</span> <span class="b64Char-number">${num}</span></div>`;
const getChunkBytesHtml = (chunk: EncoderInputChunk | OutputChunk, chunkIndex: number): string[] =>
	Array.from({ length: chunk.bytes.length }, (_, i) => getByteNumHtml(3 * chunkIndex + i + 1, chunkIndex));
const getChunkB64CharsHtml = (totalB64Chars: number, chunkIndex: number) =>
	Array.from({ length: totalB64Chars }, (_, i) => getB64CharNumHtml(4 * chunkIndex + i + 1, chunkIndex)).join(', ');

export const getBase64AlphabetVerbose = (encoding: Base64Encoding) =>
	encoding === 'base64' ? 'standard Base64 alphabet' : 'URL-safe Base64 alphabet';

export const getInactive_WelcomeDemoText = (): string[] => [
	'Welcome to the <strong>Base64 Algorithm Demo</strong> app! Enter a string value in the text box above to get started.',
	'If necessary, update the <strong>Text Encoding</strong> setting (ASCII, hex or binary) based on the type of data your string contains.',
	'The <strong>Output Encoding</strong> setting controls which Base64 alphabet is used to generate the encoded data: either the standard Base64 alphabet (<code>base64</code>) or the URL-safe variant (<code>base64url</code>).',
	'When ready, click the <strong>Next Step</strong> button.',
];

export const getInactive_AppNavDemoText = (): string[] => [
	'If you are only interested in the final Base64-encoded value, at any time you can jump to the end of the demonstration using the <strong>Last Step</strong> button.',
	'Both <strong>First Step</strong> and <strong>Reset</strong> buttons return to the first step of the demo, the only difference being that <strong>Reset</strong> also changes the form values back to their initial state.',
	'If you would rather watch the demo proceed automatically step-by-step, press the <strong>Start Autoplay</strong> button.',
	'You can stop autoplaying and return to manually stepping through the demo with the <strong>Stop Autoplay</strong> button (You can also start/stop autoplay using the <kbd>Space</kbd> bar).',
];

export function getEncodeInputText_IdleDemoText(input: string, encoding: StringEncoding): string[] {
	const totalBytes = stringToByteArray(input, encoding).length;
	let demoText: string[] = [];
	if (encoding === 'ASCII') {
		demoText = [
			'<strong>Each ASCII character is stored as an 8-bit byte</strong>. The table below shows the complete set of printable ASCII characters and their hex and binary values.',
			`The input data contains ${totalBytes} ASCII characters. <strong>As each character is converted to an 8-bit value, the corresponding row in the table below will be highlighted.</strong>`,
		];
	} else if (encoding === 'hex') {
		demoText = [
			`<strong>Each pair of hex digits represents a single 8-bit byte</strong>. The hex string you provided contains a total of ${totalBytes} bytes.`,
		];
	} else if (encoding === 'bin') {
		demoText = [`The provided binary string contains ${totalBytes} bytes.`];
	}
	return [
		'<strong>The first step in the Base64 encoding process is to convert the input data to binary</strong> (i.e, a string consisting of only <code>0</code> and <code>1</code> characters).',
		...demoText,
	];
}

export function describeInputByte(
	byte: number,
	byteIndex: number,
	totalBytes: number,
	encoding: StringEncoding,
): string {
	const byteNum =
		byteIndex + 1 === totalBytes ? `${convertNumber(byteIndex + 1)} and final` : convertNumber(byteIndex + 1);
	const byteNumHtml = getByteNumHtml(byteIndex + 1, byteIndex);
	const bin = decimalToBinaryString(byte);
	const hex = hexStringFromByte(byte);
	if (encoding === 'ASCII') {
		const charDescription = getAsciiCharacterDescription(byte);
		const charDescNonAlphaNumeric = charDescription !== '' ? ` (${charDescription})` : '';
		const char = String.fromCharCode(byte);
		return `The ${byteNum} byte (${byteNumHtml}) contains <code>${char}</code>${charDescNonAlphaNumeric}, which has binary value&nbsp;<code>${bin}</code> (Hex: <code>${hex}</code>)`;
	} else {
		return `The ${byteNum} byte (${byteNumHtml}), <code>${hex}</code>, is equal to ${bin}`;
	}
}

export function describeInputChunk(chunk: EncoderInputChunk, chunkIndex: number, totalChunks: number): string {
	const chunkNum =
		chunkIndex + 1 === totalChunks ? `${convertNumber(chunkIndex + 1)} and final` : convertNumber(chunkIndex + 1);
	const chunkBytesHtmlList = getChunkBytesHtml(chunk, chunkIndex);
	const chunkBytesHtml =
		chunk.bytes.length === 1
			? chunkBytesHtmlList[0]
			: chunk.bytes.length === 2
			? chunkBytesHtmlList.join(' and ')
			: chunkBytesHtmlList.join(', ');
	const chunkBytes =
		chunk.bytes.length > 1 ? `is comprised of bytes ${chunkBytesHtml}` : `contains a single byte, ${chunkBytesHtml}`;
	const padLength = chunk.bytes.length === 1 ? 'four' : 'two';
	const necessaryLength = chunk.bytes.length === 1 ? 12 : 18;
	const chunkPadding = chunk.isPadded
		? `, and ${padLength} bits with value zero to pad the length to ${necessaryLength}`
		: '';
	return `The ${chunkNum} chunk (${getInputChunkNumHtml(chunkIndex + 1, chunkIndex)}) ${chunkBytes}${chunkPadding}.`;
}

export function explainLastPaddedChunk(chunk: EncoderInputChunk, chunkIndex: number, totalChunks: number): string[] {
	const onlyOnePaddedChunk = totalChunks === 1 && chunk.isPadded;
	const paddedChunkSize = chunk.bytes.length === 1 ? 'one byte' : 'two bytes';
	const remainingBytes = chunk.bytes.length === 1 ? 'is only one byte (8-bits)' : 'are only two bytes (16-bits)';
	const onlyOnePaddedChunkPreamble = `Since the input data consists of only ${paddedChunkSize}, the first and only chunk falls short of the 3-byte/24-bit requirement. <strong>In order to fix this`;
	const regularLastPaddedChunkPreamble = `There ${remainingBytes} of input data remaining. <strong>When the final chunk contains less than three bytes`;
	const preamble = onlyOnePaddedChunk ? onlyOnePaddedChunkPreamble : regularLastPaddedChunkPreamble;
	const totalBits = chunk.bytes.length * 8;
	const necessaryLength = chunk.bytes.length === 1 ? 12 : 18;
	const padLength = chunk.bytes.length === 1 ? 'four' : 'two';
	return [
		`${preamble}, special processing must be performed.</strong>`,
		`The chunk size of 24-bits was chosen because it is divisible by 6 (which is the number of bits required to store a Base64 digit). <strong>When the final chunk contains less than three bytes, simply add zeroes until the total number of bits is divisible by 6.</strong>`,
		`If ${padLength} zeroes are added to the remaining ${totalBits} bits, the length becomes ${necessaryLength} which is divisible by 6.`,
	];
}

export function explainPadCharacter(chunk: EncoderInputChunk): string[] {
	const necessaryLength = chunk.bytes.length === 1 ? 12 : 18;
	const b64DigitsInChunk = chunk.bytes.length === 1 ? 'two' : 'three';
	const b64DigitsInChunkNum = chunk.bytes.length === 1 ? 2 : 3;
	const totalPadCharacters = chunk.bytes.length === 1 ? 'two pad characters are added' : 'one pad character is added';
	return [
		`Unlike 24-bit chunks which result in four Base64 digits, <strong>a chunk that is padded to contain a total of ${necessaryLength} bits results in ${b64DigitsInChunk} 6-bit Base64 digits</strong> (${b64DigitsInChunkNum}x6 = ${necessaryLength} bits).`,
		`Many systems require Base64 data to always be structured in groups of four digits. To satisfy this requirement, ${totalPadCharacters} to the output.`,
		`Padding at the end of the data is performed using the <code>=</code> character.`,
	];
}

export function describeOutputChunk(chunk: OutputChunk, chunkIndex: number, totalChunks: number): string[] {
	const chunkNum =
		chunkIndex + 1 === totalChunks ? `${convertNumber(chunkIndex + 1)} and final` : convertNumber(chunkIndex + 1);
	const totalB64Chars = chunk.base64Map.filter((map) => !map.isPad).length;
	const totalPadChars = chunk.base64Map.filter((map) => map.isPad).length;
	const totalB64CharsVerbose = totalB64Chars === 2 ? 'two' : totalB64Chars === 3 ? 'three' : 'four';
	const totalPadCharsVerbose = totalPadChars === 2 ? 'two' : 'one';
	const totalPadBits = chunk.bytes.length === 1 ? 'four' : 'two';
	const chunkHexBytesHtmlList = getChunkBytesHtml(chunk, chunkIndex);
	const chunkHexBytesHtml =
		chunk.bytes.length === 1
			? chunkHexBytesHtmlList[0]
			: chunk.bytes.length === 2
			? chunkHexBytesHtmlList.join(' and ')
			: chunkHexBytesHtmlList.join(', ');
	const chunkHexBytes = `byte${chunk.bytes.length > 1 ? 's' : ''} ${chunkHexBytesHtml} of the input data`;
	const chunkB64Chars = `contains ${totalB64CharsVerbose} Base64 digits ${getChunkB64CharsHtml(
		totalB64Chars,
		chunkIndex,
	)}`;
	const chunkBitLength = chunk.bytes.length === 3 ? '24' : chunk.bytes.length === 2 ? 'first 16' : 'first 8';
	const paddedChunkBitLength = chunk.bytes.length === 3 ? 24 : chunk.bytes.length === 2 ? 18 : 12;
	const outputChunkNumHtml = getOutputChunkNumHtml(chunkIndex + 1, chunkIndex);
	const outputChunkPadding =
		totalPadChars > 0 ? ` and ${totalPadCharsVerbose} pad character${totalPadChars > 1 ? 's' : ''}` : '';
	const inputChunkPadding =
		totalPadChars > 0
			? ` and the final ${totalPadBits} bits with value zero are added to pad the length to ${paddedChunkBitLength}`
			: '';
	return [
		`The ${chunkNum} chunk (${outputChunkNumHtml}) ${chunkB64Chars}${outputChunkPadding}.`,
		`The ${chunkBitLength} bits in this chunk are taken from ${chunkHexBytes}${inputChunkPadding}.`,
	];
}

export function describeBase64Char(
	base64: Base64ByteMap,
	base64CharIndex: number,
	totalB64Chars: number,
	encoding: Base64Encoding,
	finalChunkBase64: string,
): string[] {
	const b64Alphabet = getBase64AlphabetVerbose(encoding);
	const b64CharNum =
		base64CharIndex + 1 === totalB64Chars
			? `${convertNumber(base64CharIndex + 1)} and final`
			: convertNumber(base64CharIndex + 1);
	const preamble = `The ${b64CharNum} Base64 digit (${getB64CharNumHtml(base64CharIndex + 1, base64CharIndex)})`;
	const base64CharDescription1 = `has binary value <code>${base64.bin}</code> (decimal value: <code>${base64.dec}</code>).`;
	const base64CharDescription2 = `The Base64 digit with decimal value equal to <code>${base64.dec}</code> in the ${b64Alphabet} is <code>${base64.b64}</code>.`;
	const totalPadChars = finalChunkBase64.split('').filter((c) => c === '=').length;
	const totalPadCharsVerbose = totalPadChars === 2 ? 'two instances' : 'one instance';
	const isAre = totalPadChars > 1 ? 'are' : 'is';
	const base64PadDescription = `To ensure that the final chunk contains four Base64 digits, ${totalPadCharsVerbose} of the special padding character (<code>=</code>) ${isAre} added after the final Base64 digit (<code>${finalChunkBase64}</code>).`;
	return base64.isPad
		? [base64PadDescription]
		: [`${preamble}, ${base64CharDescription1}`, describeBitSourceForB64Char(base64), base64CharDescription2];
}

function describeBitSourceForB64Char(base64: Base64ByteMap): string {
	const { b64IndexWithinChunk } = parseGroupId(base64.groupId);
	let b64BitSourceDescription = '';
	if (b64IndexWithinChunk === 0) {
		const hexBitGroup = base64.bitGroups[0].groupId;
		const { chunkIndex, byteIndex: byteNumber } = parseGroupId(hexBitGroup);
		const byteNumHtml = getByteNumHtml(byteNumber + 1, chunkIndex);
		const bits = `<code>${base64.bitGroups[0].bits}</code>`;
		b64BitSourceDescription = `All 6 bits are taken from the first 6 bits of byte ${byteNumHtml} (${bits}).`;
	}
	if (b64IndexWithinChunk === 1) {
		const hexBitGroup1 = base64.bitGroups[0].groupId;
		const hexBitGroup2 = base64.bitGroups[1].groupId;
		const { chunkIndex, byteIndex: byteNumber1 } = parseGroupId(hexBitGroup1);
		const byteNumHtml1 = getByteNumHtml(byteNumber1 + 1, chunkIndex);
		const bits1 = `<code>${base64.bitGroups[0].bits}</code>`;
		if (hexBitGroup2 === 'pad') {
			b64BitSourceDescription = `The first 2 bits are taken from the last 2 bits of byte ${byteNumHtml1} (${bits1}), and the final 4 zeroes were added to pad the length of the chunk to 12 bits.`;
		} else {
			const { byteIndex: byteNumber2 } = parseGroupId(hexBitGroup2);
			const byteNumHtml2 = getByteNumHtml(byteNumber2 + 1, chunkIndex);
			const bits2 = `<code>${base64.bitGroups[1].bits}</code>`;
			b64BitSourceDescription = `The first 2 bits are taken from the last 2 bits of byte ${byteNumHtml1} (${bits1}), and the final 4 bits are taken from the first 4 bits of byte ${byteNumHtml2} (${bits2}).`;
		}
	}
	if (b64IndexWithinChunk === 2) {
		const hexBitGroup1 = base64.bitGroups[0].groupId;
		const hexBitGroup2 = base64.bitGroups[1].groupId;
		const { chunkIndex, byteIndex: byteNumber1 } = parseGroupId(hexBitGroup1);
		const byteNumHtml1 = getByteNumHtml(byteNumber1 + 1, chunkIndex);
		const bits1 = `<code>${base64.bitGroups[0].bits}</code>`;
		if (hexBitGroup2 === 'pad') {
			b64BitSourceDescription = `The first 4 bits are taken from the last 4 bits of byte ${byteNumHtml1} (${bits1}), and the final 2 zeroes were added to pad the length of the chunk to 18 bits.`;
		} else {
			const { byteIndex: byteNumber2 } = parseGroupId(hexBitGroup2);
			const byteNumHtml2 = getByteNumHtml(byteNumber2 + 1, chunkIndex);
			const bits2 = `<code>${base64.bitGroups[1].bits}</code>`;
			b64BitSourceDescription = `The first 4 bits are taken from the last 4 bits of byte ${byteNumHtml1} (${bits1}), and the final 2 bits are taken from the first 2 bits of byte ${byteNumHtml2} (${bits2}).`;
		}
	}
	if (b64IndexWithinChunk === 3) {
		const hexBitGroup = base64.bitGroups[0].groupId;
		const { chunkIndex, byteIndex: byteNumber } = parseGroupId(hexBitGroup);
		const byteNumHtml = getByteNumHtml(byteNumber + 1, chunkIndex);
		const bits = `<code>${base64.bitGroups[0].bits}</code>`;
		b64BitSourceDescription = `All 6 bits are taken from the last 6 bits of byte ${byteNumHtml} (${bits}).`;
	}
	return b64BitSourceDescription;
}
