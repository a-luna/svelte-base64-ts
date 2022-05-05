export type AppMode = 'encode' | 'decode';
export const BASE64_ENCODINGS = ['base64', 'base64url'] as const;
export type Base64Encoding = typeof BASE64_ENCODINGS[number];
export const STRING_ENCODINGS = ['ASCII', 'hex', 'bin'] as const;
export type StringEncoding = typeof STRING_ENCODINGS[number];
export type Encoding = Base64Encoding | StringEncoding;

export const BUTTON_COLORS = ['red', 'pink', 'orange', 'teal', 'green', 'blue', 'gray', 'yellow', 'indigo'] as const;
export type ButtonColor = typeof BUTTON_COLORS[number];
