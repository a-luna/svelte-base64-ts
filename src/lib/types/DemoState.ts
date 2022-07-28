import type { AppMode } from '.';

export interface DemoState {
	mode: AppMode;
	modalOpen: boolean;
	highlightHexByte: number;
	highlightBase64: string;
	highlightHexBitGroup: string;
	highlightBase64BitGroup: string;
}
