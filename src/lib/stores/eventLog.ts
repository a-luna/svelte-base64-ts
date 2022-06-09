import { createPuppeteerTestScript, type PuppeteerOptions } from '$lib/stores/puppeteerScriptGenerator';
import type { Base64Encoding, EncodingMachineStateStore, EventLogStore, StringEncoding } from '$lib/types';
import { get, writable } from 'svelte/store';

export const NULL_EVENT_TYPES = ['BEGIN_DEMO', 'AUTOPLAYING'] as const;
type NullEventType = typeof NULL_EVENT_TYPES[number];
export const SIMPLE_EVENT_TYPES = [
	'RESET',
	'GO_TO_FIRST_STEP',
	'GO_TO_PREV_STEP',
	'GO_TO_NEXT_STEP',
	'GO_TO_LAST_STEP',
	'RESUME_AUTO_PLAY',
	'STOP_AUTO_PLAY',
] as const;
export const DATA_EVENT_TYPES = ['UPDATE_TEXT', 'VALIDATE_TEXT', 'START_AUTOPLAY', 'SKIP_DEMO'] as const;
export type SimpleEventType = typeof SIMPLE_EVENT_TYPES[number];
export type DataEventType = typeof DATA_EVENT_TYPES[number];

export type NullEvent = { type: NullEventType };
export type SimpleEvent = { type: SimpleEventType };

export type DataEvent = {
	type: DataEventType;
	inputText: string;
	inputEncoding: StringEncoding;
	outputEncoding: Base64Encoding;
};
export type MachineEvent = NullEvent | SimpleEvent | DataEvent;
export type MachineState = { state: string; substate: string };
export type MachineLogs = { events: MachineEvent[]; states: MachineState[] };
export type MachineLogItem = MachineEvent | MachineState;

export type MachineTestStepData = {
	event: MachineEvent;
	expectedState: MachineState;
};

function reconcileEventAndStateLists(events: MachineEvent[], states: MachineState[]): MachineLogs {
	if (events.length === states.length) {
		const redundentIndices: number[] = [];
		events.forEach((event, i) => {
			if (event.type === 'START_AUTOPLAY' && i < events.length - 1) {
				if (events[i + 1].type === 'AUTOPLAYING') {
					redundentIndices.push(i + 1);
				}
			}
		});
		console.log({ redundentIndices });
		if (redundentIndices.length) {
			let reconciledEvents: MachineEvent[] = [];
			let reconciledStates: MachineState[] = [];
			for (const i of redundentIndices.reverse()) {
				reconciledEvents = [...events.slice(0, i), ...events.slice(i + 1)];
				reconciledStates = [...states.slice(0, i), ...states.slice(i + 1)];
				console.log({ reconciledEvents });
				console.log({ reconciledStates });
			}
			return { events: reconciledEvents, states: reconciledStates };
		}
		return { events, states };
	}
}

function createMachineTestStepData(events: MachineEvent[], states: MachineState[]): MachineTestStepData[] {
	if (events.length === states.length) {
		return Array.from({ length: events.length }, (_, i) => ({ event: events[i], expectedState: states[i] }));
	}
}

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

	function entries() {
		let logs: MachineLogs;
		const unsubscribe = subscribe((value) => (logs = value));
		unsubscribe();
		const reconciledlogs = reconcileEventAndStateLists(logs.events, logs.states);
		return createMachineTestStepData(reconciledlogs.events, reconciledlogs.states);
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
		testScript: (options: PuppeteerOptions): string => createPuppeteerTestScript(entries(), options),
		clear,
	};
}
