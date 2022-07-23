import type { MappedStringLiteralPick } from '.';

export type AppMode = 'encode' | 'decode';
export const BASE64_ENCODINGS = ['base64', 'base64url'] as const;
export type Base64Encoding = typeof BASE64_ENCODINGS[number];
export const STRING_ENCODINGS = ['ASCII', 'UTF-8', 'hex', 'bin'] as const;
export type StringEncoding = typeof STRING_ENCODINGS[number];
export type DataEncoding = MappedStringLiteralPick<StringEncoding, 'hex' | 'bin'>;
export type TextEncoding = MappedStringLiteralPick<StringEncoding, 'ASCII' | 'UTF-8'>;
export type Encoding = Base64Encoding | StringEncoding;

export const STRING_FORMATS = ['text', 'hex', 'bin'] as const;
export type DecodedStringFormat = typeof STRING_FORMATS[number];

export const BUTTON_COLORS = [
	'pri',
	'sec',
	'red',
	'pink',
	'orange',
	'teal',
	'green',
	'blue',
	'gray',
	'yellow',
	'indigo',
] as const;
export type ButtonColor = typeof BUTTON_COLORS[number];

export const BUTTON_SIZES = ['xs', 'sm', 'md', 'lg'] as const;
export type ButtonSize = typeof BUTTON_SIZES[number];
