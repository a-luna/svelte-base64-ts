import type { Result, StringEncoding } from '$lib/types';
import { validateAsciiBytes } from '$lib/validation';

export const HEX_BIT_GROUP_REGEX = /hex-chunk-(?<chunk>\d+)-byte-(?<byte>1|2|3)/;
export const B64_BIT_GROUP_REGEX = /base64-chunk-(?<chunk>\d+)-digit-(?<b64Char>1|2|3|4)/;

export const divmod = (x: number, y: number): [number, number] => [(x / y) | 0, x % y];

export const asciiStringToByteArray = (s: string): number[] => Array.from(s, (_, i) => s.charCodeAt(i));

export const hexStringToByteArray = (hex: string): number[] =>
	Array.from({ length: hex.length / 2 }, (_, i) => parseInt(hex.slice(i * 2, i * 2 + 2), 16));

export const binaryStringToByteArray = (bin: string): number[] =>
	Array.from({ length: bin.length / 8 }, (_, i) => parseInt(bin.slice(i * 8, i * 8 + 8), 2));

export const stringToByteArray = (s: string, encoding: StringEncoding): number[] =>
	encoding === 'ASCII'
		? asciiStringToByteArray(s)
		: encoding === 'hex'
			? hexStringToByteArray(s)
			: binaryStringToByteArray(s);

export const asciiStringFromByteArray = (byteArray: number[]): string =>
	validateAsciiBytes(byteArray) ? Array.from(byteArray, (x) => String.fromCharCode(x)).join('') : '';

export const asciiStringFromHexString = (hexString: string): string =>
	asciiStringFromByteArray(hexStringToByteArray(hexString));

export const hexStringFromByte = (byte: number, upperCase = true): string =>
	upperCase 
		? byte.toString(16).toUpperCase().padStart(2, '0') 
		: byte.toString(16).padStart(2, '0');

export const hexStringFromByteArray = (byteArray: number[], upperCase = false, separator = ''): string =>
	byteArray.map((byte) => hexStringFromByte(byte, upperCase)).join(separator);

export const byteArrayToBinaryStringArray = (byteArray: number[]): string[] =>
	byteArray.map((byte) => decimalToBinaryString(byte));

export const decimalToBinaryString = (val: number): string =>
	`${'0'.repeat(8 - val.toString(2).length)}${val.toString(2)}`;

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

export const focusInput = (inputElement: HTMLInputElement) => inputElement.focus();

export function clickOutside(node: HTMLElement, { enabled: initialEnabled, cb }) {
	const handleOutsideClick = ({ target }) => {
		if (!node.contains(target)) {
			cb();
		}
	};

	function update({ enabled }) {
		if (enabled) {
			window.addEventListener('click', handleOutsideClick);
		} else {
			window.removeEventListener('click', handleOutsideClick);
		}
	}

	update(initialEnabled);
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

export function parseGroupId(groupId: string): { chunkNumber: number; byteNumber: number; b64CharNumber: number } {
	let match = HEX_BIT_GROUP_REGEX.exec(groupId);
	if (match) {
		const { chunk, byte } = match.groups;
		const chunkNumber = parseInt(chunk) - 1;
		const byteNumber = chunkNumber * 3 + (parseInt(byte) - 1);
		return { chunkNumber, byteNumber, b64CharNumber: null };
	}
	match = B64_BIT_GROUP_REGEX.exec(groupId);
	if (match) {
		const { chunk, b64Char } = match.groups;
		const chunkNumber = parseInt(chunk) - 1;
		const b64CharNumber = chunkNumber * 4 + (parseInt(b64Char) - 1);
		return { chunkNumber, byteNumber: null, b64CharNumber };
	}
}

export function getChunkIndexFromGroupId(groupId: string): number {
	const { chunkNumber } = parseGroupId(groupId);
	return chunkNumber ?? 0;
}

export function getByteIndexFromGroupId(groupId: string): number {
	const { byteNumber } = parseGroupId(groupId);
	return byteNumber ?? 0;
}

export function getBase64CharIndexFromGroupId(groupId: string): number {
	const { b64CharNumber } = parseGroupId(groupId);
	return b64CharNumber ?? 0;
}

export const getChunkIndexFromByteIndex = (byteIndex: number): number => (byteIndex / 3) | 0;
export const getChunkIndexFromBase64CharIndex = (charIndex: number): number => (charIndex / 4) | 0;

export const capitalizeWords = (input: string): string => input.split(' ').map((word) =>
	`${word.slice(0,1)?.toUpperCase()}${word.slice(1)}`).join(' ');


export async function copyToClipboard(text: string): Promise<Result> {
	if (typeof window !== 'undefined') {
		try {
			await navigator.clipboard.writeText(text);
			return { success: true }
		} catch {
			return { success: false, error: Error('Error! Failed to copy text to clipboard.') };
		}
	}
}