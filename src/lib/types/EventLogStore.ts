import type { MachineEvent, MachineLogs, MachineTestStepData } from '$lib/stores/eventLog';
import type { PuppeteerOptions } from '$lib/stores/puppeteerScriptGenerator';
import type { Writable } from 'svelte/store';

export interface EventLogStore {
	subscribe: Writable<MachineLogs>['subscribe'];
	update: Writable<MachineLogs>['update'];
	add: (event: MachineEvent) => void;
	entries: () => MachineTestStepData[];
	testScript: (options: PuppeteerOptions) => string;
	clear: () => void;
}
