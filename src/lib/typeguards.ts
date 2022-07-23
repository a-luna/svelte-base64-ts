import type { Base64Encoding, ButtonColor, Encoding, StringEncoding, TextEncoding } from '$lib/types';
import { BASE64_ENCODINGS, BUTTON_COLORS, STRING_ENCODINGS } from '$lib/types';

export const isBase64Encoding = (encoding: string): encoding is Base64Encoding =>
	BASE64_ENCODINGS.includes(encoding as Base64Encoding);

export const isStringEncoding = (encoding: string): encoding is StringEncoding =>
	STRING_ENCODINGS.includes(encoding as StringEncoding);

export const isEncoding = (value: string): value is Encoding =>
	[...BASE64_ENCODINGS, ...STRING_ENCODINGS].includes(value as Encoding);

export const isButtonColor = (color: string): color is ButtonColor => BUTTON_COLORS.includes(color as ButtonColor);

export const isTextEncoding = (encoding: string): encoding is TextEncoding =>
	encoding === 'ASCII' || encoding === 'UTF-8';
