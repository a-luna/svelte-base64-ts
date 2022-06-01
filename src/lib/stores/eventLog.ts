import type { EncodingMachineService, EventLogStore, MachineLogItem } from '$lib/types';
import type { EncodingEvent } from '$lib/xstate/b64Encode';
import { writable } from 'svelte/store';

export function createEventLogStore(service: EncodingMachineService): EventLogStore {
	const { subscribe, update } = writable<MachineLogItem[]>([{ state: getCurrentState() }]);

	function getCurrentState(): string {
		const currentState = service.getSnapshot().value;
		const machineState = typeof currentState === 'string' ? currentState : Object.keys(currentState)[0];
		const machineSubState = typeof currentState === 'string' ? 'none' : Object.values(currentState)[0].toString();
		return `${machineState}${machineSubState !== 'none' ? `-${machineSubState}` : ``}`;
	}

	function add(event: EncodingEvent) {
		update((eventLog) => {
			eventLog.push(event);
			setTimeout(() => eventLog.push({ state: getCurrentState() }), 10);
			return eventLog;
		});
	}

	function clear() {
		update((eventLog) => {
			eventLog = [];
			eventLog.push({ state: getCurrentState() });
			return eventLog;
		});
	}

	return {
		subscribe,
		update,
		add,
		clear,
	};
}
