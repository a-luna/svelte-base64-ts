import { rotatingColors } from '$lib/constants';
import { getAsciiCharacterDescription } from '$lib/maps';
import type { Base64ByteMap, Base64Encoding, EncoderInputChunk, OutputChunk, StringEncoding } from "$lib/types";
import { decimalToBinaryString, hexStringFromByte, parseGroupId, stringToByteArray } from "$lib/util";

const getSequentialColor = (byteIndex: number): string => rotatingColors[byteIndex % rotatingColors.length];
const convertNumber = (num: number) => num === 1 ? '1st' : num === 2 ? '2nd' : num === 3 ? '3rd' : num > 20 && num.toString().slice(-1)[0] === '1' ? `${num}st` : num > 20 && num.toString().slice(-1)[0] === '2' ? `${num}nd` : num > 20 && num.toString().slice(-1)[0] === '3' ? `${num}rd` : `${num}th`
const getByteNumHtml = (num: number, colorNum: number) => `<div class="byte-id" style="color: var(${getSequentialColor(colorNum)})"><span class="letter-H">H</span><span class="byte-number">${num}</span></div>`
const getInputChunkNumHtml = (num: number, colorNum: number) => `<div class="chunk-id" style="color: var(${getSequentialColor(colorNum)});"><span class="chunk-label">IN</span> <span class="chunk-number">${num}</span></div>`
const getOutputChunkNumHtml = (num: number, colorNum: number) => `<div class="chunk-id" style="color: var(${getSequentialColor(colorNum)});"><span class="chunk-label">OUT</span> <span class="chunk-number">${num}</span></div>`
const getB64CharNumHtml = (num: number, colorNum: number) => `<div class="b64Char-id" style="color: var(${getSequentialColor(colorNum)});"><span class="letter-B">B</span> <span class="b64Char-number">${num}</span></div>`
const getChunkBytesHtml = (chunk: EncoderInputChunk|OutputChunk, chunkIndex: number) => Array.from({ length: chunk.bytes.length }, (_, i) => getByteNumHtml(3*chunkIndex + i + 1, chunkIndex)).join(', ');
const getChunkB64CharsHtml = (chunk: OutputChunk, totalB64Chars: number, chunkIndex: number) => Array.from({ length: totalB64Chars }, (_, i) => getB64CharNumHtml(4*chunkIndex + i + 1, chunkIndex)).join(', ');

export const getBase64AlphabetVerbose = (encoding: Base64Encoding) => encoding === 'base64' ? 'standard Base64 alphabet' : 'URL-safe Base64 alphabet';

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

export function describeInputByte(byte: number, byteIndex: number, totalBytes: number, encoding: StringEncoding): string {
    if (encoding === 'ASCII') {
        const charDescription = /[0-9A-Za-z]/.test(String.fromCharCode(byte)) ? `` : ` (${getAsciiCharacterDescription(byte)})`;
        const finalByte = byteIndex + 1 === totalBytes ? 'and final ' : '';
        return `The ${convertNumber(byteIndex + 1)} ${finalByte}byte (${getByteNumHtml(byteIndex + 1, byteIndex)}) contains <code>${String.fromCharCode(byte)}</code>${charDescription}, which has binary value&nbsp;<code>${decimalToBinaryString(byte)}</code> (Hex: <code>${hexStringFromByte(byte)}</code>)`;
    } else {
        return `The ${convertNumber(byteIndex + 1)} byte (${getByteNumHtml(byteIndex + 1, byteIndex)}), <code>${hexStringFromByte(byte)}</code>, is equal to ${decimalToBinaryString(byte)}`;
    }
}

export function describeInputChunk(chunk: EncoderInputChunk, chunkIndex: number, totalChunks: number): string {
    const chunkNum = chunkIndex + 1 === totalChunks ? `${convertNumber(chunkIndex + 1)} and final` : convertNumber(chunkIndex + 1);
    const chunkBytes = chunk.bytes.length > 1 ? `is comprised of bytes ${getChunkBytesHtml(chunk, chunkIndex)}` : `contains a single byte, ${getChunkBytesHtml(chunk, chunkIndex)}`;
    const padLength = chunk.bytes.length === 1 ? 'four' : 'two';
    const necessaryLength = chunk.bytes.length === 1 ? 12 : 18;
    const chunkPadding = chunk.isPadded ? `, and ${padLength} bits with value zero to pad the length to ${necessaryLength}` : '';
    return `The ${chunkNum} chunk (${getInputChunkNumHtml(chunkIndex+  1, chunkIndex)}) ${chunkBytes}${chunkPadding}.`;
}

export function explainLastPaddedChunk(chunk: EncoderInputChunk, chunkIndex: number, totalChunks: number): string[] {
    const onlyOnePaddedChunk = totalChunks === 1 && chunk.isPadded;
    const paddedChunkSize = chunk.bytes.length === 1 ? 'one byte' : 'two bytes';
    const remainingBytes = chunk.bytes.length === 1 ? 'is only one byte (8-bits)' : 'are only two bytes (16-bits)'
    const onlyOnePaddedChunkPreamble = `Since the input data consists of only ${paddedChunkSize}, the first and only chunk falls short of the 3-byte/24-bit requirement. In order to fix this`
    const regularLastPaddedChunkPreamble = `There ${remainingBytes} of input data remaining. When the final chunk contains less than three bytes`
    const preamble = onlyOnePaddedChunk ? onlyOnePaddedChunkPreamble : regularLastPaddedChunkPreamble;
    const totalBits = chunk.bytes.length * 8;
    const necessaryLength = chunk.bytes.length === 1 ? 12 : 18;
    const padLength = chunk.bytes.length === 1 ? 'four' : 'two';
    return [
        `${preamble}, special processing must be performed.`,
        `The chunk size of 24-bits was chosen because it is divisible by 6 (which is the number of bits required to store a Base64 digit). <strong>The solution is to add zeroes until the total number of bits is divisible by 6.</strong>`,
        `If ${padLength} zeroes are added to the remaining ${totalBits} bits, the length becomes ${necessaryLength} which is divisible by 6.`,
    ];
}

export function explainPadCharacter(chunk: EncoderInputChunk): string[] {
    const necessaryLength = chunk.bytes.length === 1 ? 12 : 18;
    const b64DigitsInChunk = chunk.bytes.length === 1 ? 'two' : 'three';
    const b64DigitsInChunkNum = chunk.bytes.length === 1 ? 2 : 3;
    const totalPadCharacters = chunk.bytes.length === 1 ? 'two pad characters are added' : 'one pad character is added';
    return [
        `Unlike 24-bit chunks which result in four Base64 digits, a chunk that is padded to contain a total of ${necessaryLength} bits results in ${b64DigitsInChunk} 6-bit Base64 digits (${b64DigitsInChunkNum}x6 = ${necessaryLength} bits).`,
        `Many systems require that Base64 data must always be structured in groups of four digits. To satisfy this requirement, ${totalPadCharacters} to the output.`,
        `Padding at the end of the data is performed using the <code>=</code> character.`
    ]
}

export function describeOutputChunk(chunk: OutputChunk, chunkIndex: number, totalChunks: number): string[] {
    const chunkNum = chunkIndex + 1 === totalChunks ? `${convertNumber(chunkIndex + 1)} and final` : convertNumber(chunkIndex + 1);
    const totalB64Chars = chunk.base64Map.filter(map => !map.isPad).length;
    const totalPadChars = chunk.base64Map.filter(map => map.isPad).length;
    const totalB64CharsVerbose = totalB64Chars === 2 ? 'two' : totalB64Chars === 3 ? 'three' : 'four'
    const totalPadCharsVerbose = totalPadChars === 2 ? 'two' : 'one'
    const totalPadBits = chunk.bytes.length === 1 ? 'four' : 'two';
    const chunkHexBytes = `byte${chunk.bytes.length > 1 ? 's' : ''} ${getChunkBytesHtml(chunk, chunkIndex)} of the input data`
    const chunkB64Chars = `contains ${totalB64CharsVerbose} Base64 digits ${getChunkB64CharsHtml(chunk, totalB64Chars, chunkIndex)}`
    const chunkBitLength = chunk.bytes.length === 3 ? '24' : chunk.bytes.length === 2 ? 'first 16' : 'first 8';
    const paddedChunkBitLength = chunk.bytes.length === 3 ? 24 : chunk.bytes.length === 2 ? 18 : 12;
    const outputChunkPadding = totalPadChars > 0 ? ` and ${totalPadCharsVerbose} pad character${totalPadChars > 1 ? 's' : ''}` : '';
    const inputChunkPadding = totalPadChars > 0 ? ` and the final ${totalPadBits} bits with value zero are added to pad the length to ${paddedChunkBitLength}` : '';
    return [
        `The ${chunkNum} chunk (${getOutputChunkNumHtml(chunkIndex + 1, chunkIndex)}) ${chunkB64Chars}${outputChunkPadding}.`,
        `The ${chunkBitLength} bits in this chunk are taken from ${chunkHexBytes}${inputChunkPadding}.`
    ];
}

export function describeBase64Char(base64: Base64ByteMap, base64CharIndex: number, encoding: Base64Encoding): string[] {
    const b64Alphabet = getBase64AlphabetVerbose(encoding); 
    const preamble = `The ${convertNumber(base64CharIndex + 1)} Base64 digit (${getB64CharNumHtml(base64CharIndex + 1, base64CharIndex)})`;
    const base64CharDescription1 = `has binary value <code>${base64.bin}</code> (decimal value: <code>${base64.dec}</code>).`;
    const base64CharDescription2 = `The Base64 digit with decimal value equal to <code>${base64.dec}</code> in the ${b64Alphabet} is <code>${base64.b64}</code>.`;
    const base64PadDescription = "is the special padding character, <code>=</code>, which ensures that the final chunk contains four Base64 digits.";
    return base64.isPad ? [`${preamble}, ${base64PadDescription}`] : [`${preamble}, ${base64CharDescription1}`, describeBitSourceForB64Char(base64), base64CharDescription2];
}

function describeBitSourceForB64Char(base64: Base64ByteMap): string {
    const { b64IndexWithinChunk } = parseGroupId(base64.groupId);
    let b64BitSourceDescription = '';
    if (b64IndexWithinChunk === 0) {
        const hexBitGroup = base64.bitGroups[0].groupId;
        const { chunkNumber, byteNumber } = parseGroupId(hexBitGroup);
        const byteNumHtml = getByteNumHtml(byteNumber + 1, chunkNumber);
        const bits = `<code>${base64.bitGroups[0].bits}</code>`;
        b64BitSourceDescription = `All 6 bits are taken from the first 6 bits of byte ${byteNumHtml} (${bits}).`
    }
    if (b64IndexWithinChunk === 1) {
        const hexBitGroup1 = base64.bitGroups[0].groupId;
        const hexBitGroup2 = base64.bitGroups[1].groupId;
        const { chunkNumber, byteNumber: byteNumber1 } = parseGroupId(hexBitGroup1);
        const byteNumHtml1 = getByteNumHtml(byteNumber1 + 1, chunkNumber);
        const bits1 = `<code>${base64.bitGroups[0].bits}</code>`;
        if (hexBitGroup2 === 'pad') {
            b64BitSourceDescription =  `The first 2 bits are taken from the last 2 bits of byte ${byteNumHtml1} (${bits1}), and the final 4 zeroes were added to pad the length of the chunk to 12 bits.`
        }
        else {
            const { byteNumber: byteNumber2 } = parseGroupId(hexBitGroup2);
            const byteNumHtml2 = getByteNumHtml(byteNumber2 + 1, chunkNumber);
            const bits2 = `<code>${base64.bitGroups[1].bits}</code>`;
            b64BitSourceDescription = `The first 2 bits are taken from the last 2 bits of byte ${byteNumHtml1} (${bits1}), and the final 4 bits are taken from the first 4 bits of byte ${byteNumHtml2} (${bits2}).`
        }
    }
    if (b64IndexWithinChunk === 2) {
        const hexBitGroup1 = base64.bitGroups[0].groupId;
        const hexBitGroup2 = base64.bitGroups[1].groupId;
        const { chunkNumber, byteNumber: byteNumber1 } = parseGroupId(hexBitGroup1);
        const byteNumHtml1 = getByteNumHtml(byteNumber1 + 1, chunkNumber);
        const bits1 = `<code>${base64.bitGroups[0].bits}</code>`;
        if (hexBitGroup2 === 'pad') {
            b64BitSourceDescription =  `The first 4 bits are taken from the last 4 bits of byte ${byteNumHtml1} (${bits1}), and the final 2 zeroes were added to pad the length of the chunk to 16 bits.`
        }
        else {
            const { byteNumber: byteNumber2 } = parseGroupId(hexBitGroup2);
            const byteNumHtml2 = getByteNumHtml(byteNumber2 + 1, chunkNumber);
            const bits2 = `<code>${base64.bitGroups[1].bits}</code>`;
            b64BitSourceDescription =  `The first 4 bits are taken from the last 4 bits of byte ${byteNumHtml1} (${bits1}), and the final 2 bits are taken from the first 2 bits of byte ${byteNumHtml2} (${bits2}).`
        }        
    }
    if (b64IndexWithinChunk === 3) {
        const hexBitGroup = base64.bitGroups[0].groupId;
        const { chunkNumber, byteNumber } = parseGroupId(hexBitGroup);
        const byteNumHtml = getByteNumHtml(byteNumber + 1, chunkNumber)
        const bits = `<code>${base64.bitGroups[0].bits}</code>`;
        b64BitSourceDescription =  `All 6 bits are taken from the last 6 bits of byte ${byteNumHtml} (${bits}).`
    }
    return b64BitSourceDescription;
}