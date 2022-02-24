export type AppMode = 'encode' | 'decode';
export const BASE64_ENCODINGS = ['base64', 'base64url'] as const;
export type Base64Encoding = typeof BASE64_ENCODINGS[number];
export const STRING_ENCODINGS = ['ASCII', 'hex'] as const;
export type StringEncoding = typeof STRING_ENCODINGS[number];
export type Encoding = Base64Encoding | StringEncoding;

export const BUTTON_COLORS = ['red', 'pink', 'orange', 'teal', 'green', 'blue', 'gray', 'yellow', 'indigo'] as const;
export type ButtonColor = typeof BUTTON_COLORS[number];

export const NAV_ACTIONS = ['reset', 'first', 'previous', 'next', 'last', 'start-autoplay', 'stop-autoplay'] as const;
export type NavAction = typeof NAV_ACTIONS[number];
