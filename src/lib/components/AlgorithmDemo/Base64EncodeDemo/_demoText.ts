import { rotatingColors } from '$lib/constants';
import { getAsciiCharacterDescription } from '$lib/maps';
import type { Base64ByteMap, Base64Encoding, EncoderInputChunk, StringEncoding } from "$lib/types";
import { decimalToBinaryString, hexStringFromByte, stringToByteArray } from "$lib/util";

const getSequentialColor = (byteIndex: number): string => rotatingColors[byteIndex % rotatingColors.length];
const convertNumber = (num: number) => num === 1 ? '1st' : num === 2 ? '2nd' : num === 3 ? '3rd' : num > 20 && num.toString().slice(-1)[0] === '1' ? `${num}st` : num > 20 && num.toString().slice(-1)[0] === '2' ? `${num}nd` : num > 20 && num.toString().slice(-1)[0] === '3' ? `${num}rd` : `${num}th`
const getByteNumHtml = (num: number, colorNum: number) => `<div class="byte-id" style="color: var(${getSequentialColor(colorNum)})"><span class="letter-H">H</span><span class="byte-number">${num}</span></div>`
const getChunkNumHtml = (num: number, colorNum: number) => `<div class="chunk-id" style="color: var(${getSequentialColor(colorNum)});"><span class="chunk-label">IN</span> <span class="chunk-number">${num}</span></div>`
const getB64CharNumHtml = (num: number, colorNum: number) => `<div class="b64Char-id" style="color: var(${getSequentialColor(colorNum)});"><span class="letter-B">B</span> <span class="b64Char-number">${num}</span></div>`
const getChunkBytesHtml = (chunk: EncoderInputChunk, chunkIndex: number) => Array.from({ length: chunk.bytes.length }, (_, i) => getByteNumHtml(3*chunkIndex + i + 1, chunkIndex)).join(', ');

export function getEncodeInputText_IdleDemoText(input: string, encoding: StringEncoding): string[] {
    const totalBytes = stringToByteArray(input, encoding).length;
    const demoText: string[] = [];
    if (encoding === 'ASCII') {
        demoText.push('Each ASCII character is stored as an 8-bit byte. The table below shows the complete set of printable ASCII characters and their hex and binary values.');
        demoText.push(`The input data contains ${totalBytes} ASCII characters. As each character is converted to an 8-bit value, the corresponding row in the table below will be highlighted.`)
    } else if (encoding === 'hex') {
        const totalHexDigits = totalBytes * 2; 
        demoText.push('Each hexadecimal digit represents a 4-bit value, thusly, each pair of hex digits represents an 8-bit value.');
        demoText.push(`The hex string you provided has length: ${totalHexDigits}, which means the input data contains a total number of ${totalBytes} bytes.`);
    } else {
        demoText.push(`The provided binary string contains ${totalBytes} bytes.`);
    }
    return demoText;
}

export function describeInputByte(byte: number, byteIndex: number, encoding: StringEncoding): string {
    if (encoding === 'ASCII') {
        const charDescription = /[0-9A-Za-z]/.test(String.fromCharCode(byte)) ? `` : ` (${getAsciiCharacterDescription(byte)})`;
        return `The ${convertNumber(byteIndex + 1)} byte (${getByteNumHtml(byteIndex + 1, byteIndex)}) contains <code>${String.fromCharCode(byte)}</code>${charDescription}, which has binary value&nbsp;<code>${decimalToBinaryString(byte)}</code> (Hex: <code>${hexStringFromByte(byte)}</code>)`;
    } else {
        return `The ${convertNumber(byteIndex + 1)} byte (${getByteNumHtml(byteIndex + 1, byteIndex)}), <code>${hexStringFromByte(byte)}</code>, is equal to ${decimalToBinaryString(byte)}`;
    }
}

export function describeInputChunk(chunk: EncoderInputChunk, chunkIndex: number, totalChunks: number): string {
    const chunkNum = chunkIndex + 1 === totalChunks ? `${convertNumber(chunkIndex + 1)} and final` : convertNumber(chunkIndex + 1);
    const chunkBytes = chunk.bytes.length > 1 ? `is comprised of bytes ${getChunkBytesHtml(chunk, chunkIndex)}` : `contains a single byte, ${getChunkBytesHtml(chunk, chunkIndex)}`;
    const padLength = chunk.bytes.length === 1 ? 'four' : 'two';
    const necessaryLength = chunk.bytes.length === 1 ? 12 : 18;
    const chunkPadding = chunk.isPadded ? ` and ${padLength} bits with value zero to pad the length to ${necessaryLength}` : '';
    return `The ${chunkNum} chunk (${getChunkNumHtml(chunkIndex + 1, chunkIndex)}) ${chunkBytes}${chunkPadding}.`;
}

export function explainLastPaddedChunk(chunk: EncoderInputChunk, chunkIndex: number): string[] {
    const remainingBytes = chunk.bytes.length === 1 ? 'is only one byte (8-bits)' : 'are only two bytes (16-bits)'
    const totalBits = chunk.bytes.length * 8;
    const necessaryLength = chunk.bytes.length === 1 ? 12 : 18;
    const padLength = chunk.bytes.length === 1 ? 'four' : 'two';
    return [
        `There ${remainingBytes} of input data remaining. When the final chunk contains less than three bytes, special processing must be performed.`,
        `The chunk size of 24-bits was chosen because it is divisible by 6 (which is the number of bits required to store a Base64 digit). The solution is to add zeroes until the total number of bits is divisible by 6.`,
        `The final chunk (${getChunkNumHtml(chunkIndex + 1, chunkIndex)}) contains ${totalBits} bits. If ${padLength} zeroes are added the length becomes ${necessaryLength} which is divisible by 6.`
    ];
}

export function explainPadCharacter(chunk: EncoderInputChunk): string[] {
    const necessaryLength = chunk.bytes.length === 1 ? 12 : 18;
    const b64DigitsInChunk = chunk.bytes.length === 1 ? 'two' : 'three';
    const b64DigitsInChunkNum = chunk.bytes.length === 1 ? 2 : 3;
    const totalPadCharacters = chunk.bytes.length === 1 ? 'two pad characters are added' : 'one pad character is added';
    return [
        `Unlike the other chunks which result in four Base64 digits, a chunk that is padded to contain a total of ${necessaryLength} bits results in ${b64DigitsInChunk} 6-bit Base64 digits (${b64DigitsInChunkNum}x6 = ${necessaryLength} bits).`,
        `Many systems require that Base64 data must always be structured in groups of four digits. To satisfy this requirement, ${totalPadCharacters} to the output.`,
        `Padding at the end of the data is performed using the <code>=</code> character.`
    ]
}

// export function describeOutputChunk(chunk: OutputChunk, chunkIndex: number, totalChunks: number): string {
//     const chunkNum = chunkIndex + 1 === totalChunks ? `${convertNumber(chunkIndex + 1)} and final` : convertNumber(chunkIndex + 1);
//     const chunkB64Chars = `is comprised of Base64 digits ${}`
// }

// function getBase64DigitsHtml(chunk: OutputChunk, chunkIndex: number) {
//     const padLength = chunk.bytes.length === 3 ? 0 : chunk.bytes.length === 2 ? ss
// }

export function describeBase64Char(base64: Base64ByteMap, base64CharIndex: number, encoding: Base64Encoding): string[] {
    const b64Alphabet = encoding === 'base64' ? 'standard Base64 alphabet' : 'URL-safe Base64 alphabet'; 
    const preamble = `The ${convertNumber(base64CharIndex + 1)} Base64 digit (${getB64CharNumHtml(base64CharIndex + 1, base64CharIndex)})`;
    const base64CharDescription1 = `has binary value <code>${base64.bin}</code> (Decimal value: <code>${base64.dec}</code>).`;
    const base64CharDescription2 = `The Base64 digit for decimal value <code>${base64.dec}</code> in the ${b64Alphabet} is <code>${base64.b64}</code>.`;
    const base64PadDescription = "is the special padding character, <code>=</code>, which ensures that the final chunk contains four Base64 digits.";
    return base64.isPad ? [`${preamble}, ${base64PadDescription}`] : [`${preamble}, ${base64CharDescription1}`, base64CharDescription2];
}