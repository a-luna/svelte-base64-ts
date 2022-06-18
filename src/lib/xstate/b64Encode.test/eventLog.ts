/* c8 ignore start */
import type { EncodingMachineStateStore } from '$lib/types';
import { createTestScript } from '$lib/xstate/b64Encode.test/testScriptGenerator';
import type {
	EventLogStore,
	MachineEvent,
	MachineLogs,
	MachineState,
	MachineTestStepData,
} from '$lib/xstate/b64Encode.test/types';
import { createMachineTestStepData, reconcileEventAndStateLists } from '$lib/xstate/b64Encode.test/util';
import { get, writable } from 'svelte/store';

export function createEventLogStore(machineState: EncodingMachineStateStore): EventLogStore {
	const { subscribe, update } = writable<MachineLogs>({ events: [], states: [] });

	function getCurrentState(): MachineState {
		const currentState = get(machineState).value;
		const state = typeof currentState === 'string' ? currentState : Object.keys(currentState)[0];
		const substate = typeof currentState === 'string' ? 'none' : Object.values(currentState)[0].toString();
		return { state, substate };
	}

	function add(event: MachineEvent) {
		update((machineLog) => {
			machineLog.events.push(event);
			setTimeout(() => machineLog.states.push(getCurrentState()), 10);
			return machineLog;
		});
	}

	function entries(): MachineTestStepData[] {
		let logs: MachineLogs;
		const unsubscribe = subscribe((value) => (logs = value));
		unsubscribe();
		const reconciledlogs: MachineLogs = reconcileEventAndStateLists(logs.events, logs.states);
		return createMachineTestStepData(reconciledlogs.events, reconciledlogs.states);
	}

	function testScript(scriptName?: string, ignoreUpdateTextEvents?: boolean): string {
		return createTestScript(entries(), scriptName ?? null, ignoreUpdateTextEvents ?? true);
	}

	function clear() {
		update((eventLog) => {
			eventLog = { events: [], states: [] };
			return eventLog;
		});
	}

	return {
		subscribe,
		update,
		add,
		entries,
		testScript,
		clear,
	};
}
/* c8 ignore stop */
