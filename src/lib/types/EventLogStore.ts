import type { MachineEvent, MachineLogs, MachineTestStepData } from '$lib/xstate/b64Encode.test/types';
import type { Writable } from 'svelte/store';

export interface EventLogStore {
	subscribe: Writable<MachineLogs>['subscribe'];
	update: Writable<MachineLogs>['update'];
	add: (event: MachineEvent) => void;
	entries: () => MachineTestStepData[];
	testScript: (ignoreUpdateTextEvents?: boolean) => string;
	clear: () => void;
}
