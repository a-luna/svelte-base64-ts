import type { StateValue } from 'xstate';

export interface DemoStore {
	pageWidth: number;
	errorOccurred: boolean;
	machineState: StateValue;
	machineSubState: StateValue;
	startedSubProcess: boolean;
	isMobileDisplay: boolean;
	showInputBytes: boolean;
	showInputChunks: boolean;
	showOutputChunks: boolean;
	showOutputBytePlaceholders: boolean;
	showOutputBytes: boolean;
	showAsciiTable: boolean;
	showBase64Table: boolean;
}
