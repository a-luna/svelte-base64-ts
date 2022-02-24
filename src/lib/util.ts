import type { StringEncoding } from './types';
import { validateAsciiBytes } from './validation';

export const divmod = (x: number, y: number): [number, number] => [(x / y) | 0, x % y];

export const asciiStringToByteArray = (s: string): number[] => Array.from(s, (_, i) => s.charCodeAt(i));

export const hexStringToByteArray = (hexString: string): number[] =>
	Array.from({ length: hexString.length / 2 }, (_, i) => parseInt(hexString.slice(i * 2, i * 2 + 2), 16));

export const stringToByteArray = (s: string, encoding: StringEncoding): number[] =>
	encoding === 'ASCII' ? asciiStringToByteArray(s) : hexStringToByteArray(s);

export const asciiStringFromByteArray = (byteArray: number[]): string =>
	validateAsciiBytes(byteArray) ? Array.from(byteArray, (x) => String.fromCharCode(x)).join('') : '';

export const asciiStringFromHexString = (hexString: string): string =>
	asciiStringFromByteArray(hexStringToByteArray(hexString));

export function hexStringFromByteArray(byteArray: number[], upperCase = false, separator = ''): string {
	const hex = byteArray.map((byte) => byte.toString(16).padStart(2, '0')).join(separator);
	return upperCase ? hex.toUpperCase() : hex;
}

export const byteArrayToBinaryStringArray = (byteArray: number[]): string[] =>
	byteArray.map((byte) => decimalToBinaryString(byte));

export const decimalToBinaryString = (val: number): string =>
	`${'0'.repeat(8 - val.toString(2).length)}${val.toString(2)}`;

export function chunkify<T>(inputList: T[], chunkSize: number): T[][] {
	const [fullChunkCount, finalChunkLength] = divmod(inputList.length, chunkSize);
	const totalChunks = finalChunkLength > 0 ? fullChunkCount + 1 : fullChunkCount;
	return Array.from({ length: totalChunks }, (_, i) =>
		inputList.slice(i * chunkSize, Math.min(inputList.length, i * chunkSize + chunkSize))
	);
}

export const getCSSPropValue = (element: HTMLElement, propName: string): string =>
	getComputedStyle(element).getPropertyValue(propName);

export const focusInput = (inputElement: HTMLInputElement) => inputElement.focus();
