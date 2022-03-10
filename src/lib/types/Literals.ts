export type AppMode = 'encode' | 'decode';
export const BASE64_ENCODINGS = ['base64', 'base64url'] as const;
export type Base64Encoding = typeof BASE64_ENCODINGS[number];
export const STRING_ENCODINGS = ['ASCII', 'hex', 'bin'] as const;
export type StringEncoding = typeof STRING_ENCODINGS[number];
export type Encoding = Base64Encoding | StringEncoding;

export const BUTTON_COLORS = ['red', 'pink', 'orange', 'teal', 'green', 'blue', 'gray', 'yellow', 'indigo'] as const;
export type ButtonColor = typeof BUTTON_COLORS[number];

export const NAV_ACTIONS = [
    'RESET',
	'GO_TO_FIRST_STEP',
	'GO_TO_PREV_STEP',
	'GO_TO_NEXT_STEP',
	'GO_TO_LAST_STEP',
	'START_AUTO_PLAY',
	'STOP_AUTO_PLAY'
] as const;
export type NavAction = typeof NAV_ACTIONS[number];
