import type { EncodingEvent } from '$lib/xstate/b64Encode';
import type { Writable } from 'svelte/store';

export type MachineLogItem = EncodingEvent | { state: string };

export interface EventLogStore {
	subscribe: Writable<MachineLogItem[]>['subscribe'];
	update: Writable<MachineLogItem[]>['update'];
	add: (event: EncodingEvent) => void;
	clear: () => void;
}
