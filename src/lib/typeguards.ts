import type { Base64Encoding, ButtonColor, Encoding, StringEncoding } from '$lib/types';
import { BASE64_ENCODINGS, BUTTON_COLORS, STRING_ENCODINGS } from '$lib/types';

export function isBase64Encoding(encoding: string): encoding is Base64Encoding {
	return BASE64_ENCODINGS.includes(encoding as Base64Encoding);
}

export function isStringEncoding(encoding: string): encoding is StringEncoding {
	return STRING_ENCODINGS.includes(encoding as StringEncoding);
}

export function isEncoding(value: string): value is Encoding {
	return [...BASE64_ENCODINGS, ...STRING_ENCODINGS].includes(value as Encoding);
}

export const isButtonColor = (color: string): color is ButtonColor => BUTTON_COLORS.includes(color as ButtonColor);
