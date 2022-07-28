import type { Result, StringEncoding } from '$lib/types';
import { decomposeUtf8String } from '$lib/utf8';
import { validateAsciiBytes } from '$lib/validation';

export const HEX_BIT_GROUP_REGEX = /hex-chunk-(?<chunk>\d+)-byte-(?<byte>1|2|3)/;
export const B64_BIT_GROUP_REGEX = /base64-chunk-(?<chunk>\d+)-digit-(?<b64Char>1|2|3|4)/;

export const divmod = (x: number, y: number): [number, number] => [(x / y) | 0, x % y];

export const stringToByteArray = (s: string, encoding: StringEncoding): number[] =>
	encoding === 'hex'
		? hexStringToByteArray(s)
		: encoding === 'bin'
		? binaryStringToByteArray(s)
		: encoding === 'UTF-8'
		? utf8StringToByteArray(s)
		: genericStringToByteArray(s);

export const hexStringToByte = (hex: string): number => parseInt(hex, 16);

export const hexStringToByteArray = (hex: string): number[] =>
	Array.from({ length: hex.length / 2 }, (_, i) => hexStringToByte(hex.slice(i * 2, i * 2 + 2)));

export const binaryStringToByteArray = (bin: string): number[] =>
	Array.from({ length: bin.length / 8 }, (_, i) => parseInt(bin.slice(i * 8, i * 8 + 8), 2));

export const utf8StringToByteArray = (s: string): number[] => decomposeUtf8String(s).bytes;

export const genericStringToByteArray = (s: string): number[] =>
	Array.from({ length: s.length }, (_, i) => s.charCodeAt(i));

export const asciiStringFromByteArray = (byteArray: number[]): string =>
	validateAsciiBytes(byteArray) ? Array.from(byteArray, (x) => String.fromCharCode(x)).join('') : '';

export const hexStringFromByte = (byte: number, upperCase = true): string =>
	upperCase ? byte.toString(16).toUpperCase().padStart(2, '0') : byte.toString(16).padStart(2, '0');

export const hexStringFromByteArray = (byteArray: number[], upperCase = false, separator = ''): string =>
	byteArray.map((byte) => hexStringFromByte(byte, upperCase)).join(separator);

export const byteArrayToBinaryStringArray = (byteArray: number[]): string[] =>
	byteArray.map((byte) => decimalToBinaryString(byte));

export const decimalToBinaryString = (val: number): string => val.toString(2).padStart(8, '0');

export function utf8StringFromByteArray(byteArray: number[]): string {
	try {
		const utfEncoded = byteArray
			.map((byte) => hexStringFromByte(byte))
			.map((hex) => `%${hex}`)
			.join('');
		return decodeURIComponent(utfEncoded);
	} catch (ex) {
		return '';
	}
}

export function chunkify<T>(args: { inputList: T[]; chunkSize: number }): T[][] {
	const { inputList, chunkSize } = args;
	const [fullChunkCount, finalChunkLength] = divmod(inputList.length, chunkSize);
	const totalChunks = finalChunkLength > 0 ? fullChunkCount + 1 : fullChunkCount;
	return Array.from({ length: totalChunks }, (_, i) =>
		inputList.slice(i * chunkSize, Math.min(inputList.length, i * chunkSize + chunkSize)),
	);
}

export const getCSSPropValue = (element: HTMLElement, propName: string): string =>
	getComputedStyle(element).getPropertyValue(propName);

export function clickOutside(node: HTMLElement, { enabled: initialEnabled, cb }: { enabled: boolean; cb: () => void }) {
	const handleOutsideClick = ({ target }) => {
		if (!node.contains(target)) {
			cb();
		}
	};

	function update({ enabled }: { enabled: boolean }) {
		if (enabled) {
			window.addEventListener('click', handleOutsideClick);
		} else {
			window.removeEventListener('click', handleOutsideClick);
		}
	}

	update({ enabled: initialEnabled });
	return {
		update,
		destroy() {
			window.removeEventListener('click', handleOutsideClick);
		},
	};
}

export const getRandomHexString = (length: number): string =>
	Array.from({ length }, () => Math.floor(Math.random() * 16))
		.map((n) => Number(n).toString(16))
		.join('');

export function parseGroupId(groupId: string): {
	chunkIndex: number;
	byteIndex: number;
	byteIndexWithinChunk: number;
	b64CharIndex: number;
	b64IndexWithinChunk: number;
} {
	let match = HEX_BIT_GROUP_REGEX.exec(groupId);
	if (match) {
		const { chunk, byte } = match.groups;
		const chunkIndex = parseInt(chunk) - 1;
		const byteIndexWithinChunk = parseInt(byte) - 1;
		const byteIndex = chunkIndex * 3 + byteIndexWithinChunk;
		return {
			chunkIndex,
			byteIndex,
			byteIndexWithinChunk,
			b64CharIndex: null,
			b64IndexWithinChunk: null,
		};
	}
	match = B64_BIT_GROUP_REGEX.exec(groupId);
	if (match) {
		const { chunk, b64Char } = match.groups;
		const chunkIndex = parseInt(chunk) - 1;
		const b64IndexWithinChunk = parseInt(b64Char) - 1;
		const b64CharIndex = chunkIndex * 4 + b64IndexWithinChunk;
		return {
			chunkIndex,
			byteIndex: null,
			byteIndexWithinChunk: null,
			b64CharIndex,
			b64IndexWithinChunk,
		};
	}
	return {
		chunkIndex: null,
		byteIndex: null,
		byteIndexWithinChunk: null,
		b64CharIndex: null,
		b64IndexWithinChunk: null,
	};
}

export function getBase64CharIndexFromGroupId(groupId: string): number {
	const { b64CharIndex } = parseGroupId(groupId);
	return b64CharIndex ?? 0;
}

export function getHexByteIndexFromGroupId(groupId: string): number {
	const { byteIndex } = parseGroupId(groupId);
	return byteIndex ?? 0;
}

export const getChunkIndexFromByteIndex = (byteIndex: number): number => (byteIndex / 3) | 0;
export const getChunkIndexFromBase64CharIndex = (charIndex: number): number => (charIndex / 4) | 0;

/* c8 ignore start */
export async function copyToClipboard(text: string): Promise<Result> {
	if (typeof window !== 'undefined') {
		try {
			await navigator.clipboard.writeText(text);
			return { success: true };
		} catch {
			return { success: false, error: Error('Error! Failed to copy text to clipboard.') };
		}
	}
}
/* c8 ignore stop */
