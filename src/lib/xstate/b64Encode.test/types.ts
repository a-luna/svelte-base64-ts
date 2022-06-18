/* c8 ignore start */
import type { Base64Encoding, StringEncoding } from '$lib/types';
import type { DATA_EVENT_TYPES, NULL_EVENT_TYPES, SIMPLE_EVENT_TYPES } from '$lib/xstate/b64Encode.test/util';
import type { Matcher, MatcherOptions, Screen, waitForOptions } from '@testing-library/svelte';
import type { UserEvent } from '@testing-library/user-event/dist/types/setup';
import type { Page } from 'puppeteer';
import type { Writable } from 'svelte/store';

export type NullEventType = typeof NULL_EVENT_TYPES[number];
export type SimpleEventType = typeof SIMPLE_EVENT_TYPES[number];
export type DataEventType = typeof DATA_EVENT_TYPES[number];
export type MachineEventType = NullEventType | SimpleEventType | DataEventType;

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

export interface EventLogStore {
	subscribe: Writable<MachineLogs>['subscribe'];
	update: Writable<MachineLogs>['update'];
	add: (event: MachineEvent) => void;
	entries: () => MachineTestStepData[];
	testScript: (scriptName?: string, ignoreUpdateTextEvents?: boolean) => string;
	clear: () => void;
}

export type SimpleEventTestDetails = { buttonName: string; testId: string };
export type SimpleEventTestDetailsMap = { type: SimpleEventType; data: SimpleEventTestDetails };
export type DataEventToSimpleEventMap = { dataEvent: DataEventType; simpleEvent: SimpleEventType };

export type HtmlElementIdMap = { id: string; variableName: string };
export type HtmlElementIds = { ids: [string, string]; variableNames: [string, string] };
export type TestEnvSettings = { timeoutMs?: number; ignoreUpdateTextEvents?: boolean; port?: number };

export type DomQueryByTestId = (
	id: Matcher,
	options?: MatcherOptions,
	waitForElementOptions?: waitForOptions,
) => Promise<HTMLElement>;

export type PuppeteerTestFunction = (page: Page, expect: Vi.ExpectStatic) => Promise<void>;
export type PuppeteerTestCase = { description: string; testFunction: PuppeteerTestFunction };

export type JSDomTestFunction = (screen: Screen, userEvent: UserEvent, expect: Vi.ExpectStatic) => Promise<void>;
export type JSDomTestCase = { description: string; testFunction: JSDomTestFunction };

export type TestFunctionInputData = {
	scriptName: string;
	description: string;
	type: 'fast' | 'slow';
	events: MachineTestStepData[];
};
/* c8 ignore stop */
