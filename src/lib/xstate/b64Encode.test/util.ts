/* c8 ignore start */
import type { Base64Encoding, StringEncoding } from '$lib/types';
import type {
	DataEvent,
	DataEventType,
	HtmlElementIdMap,
	HtmlElementIds,
	MachineEvent,
	MachineEventType,
	MachineLogs,
	MachineState,
	MachineTestStepData,
	NullEventType,
	SimpleEvent,
	SimpleEventType,
} from '$lib/xstate/b64Encode.test/types';

export function reconcileEventAndStateLists(events: MachineEvent[], states: MachineState[]): MachineLogs {
	if (events.length === states.length) {
		({ events, states } = removeRedundantAutoPlayEntries(events, states));
		({ events, states } = identifyEncodeOutputByteFinalStep(events, states));
	}
	return { events, states };
}

function removeRedundantAutoPlayEntries(events: MachineEvent[], states: MachineState[]): MachineLogs {
	const redundentIndices: number[] = [];
	events.forEach((event, i) => {
		if (event.type === 'START_AUTOPLAY' && i < events.length - 1) {
			if (events[i + 1].type === 'AUTOPLAYING') {
				redundentIndices.push(i + 1);
			}
		}
	});
	if (redundentIndices.length) {
		let reconciledEvents: MachineEvent[] = [];
		let reconciledStates: MachineState[] = [];
		for (const i of redundentIndices.reverse()) {
			reconciledEvents = [...events.slice(0, i), ...events.slice(i + 1)];
			reconciledStates = [...states.slice(0, i), ...states.slice(i + 1)];
		}
		return { events: reconciledEvents, states: reconciledStates };
	}
	return { events, states };
}

function identifyEncodeOutputByteFinalStep(events: MachineEvent[], states: MachineState[]): MachineLogs {
	if (states.length >= 2) {
		const [penultimate, final] = states.slice(-2);
		if (
			final.state === 'finished' &&
			penultimate.state === 'encodeOutput' &&
			penultimate.substate === 'autoPlayEncodeBase64'
		) {
			penultimate.substate = 'encodeLastBase64';
		}
	}
	return { events, states };
}

export function createMachineTestStepData(events: MachineEvent[], states: MachineState[]): MachineTestStepData[] {
	if (events.length === states.length) {
		return Array.from({ length: events.length }, (_, i) => ({ event: events[i], expectedState: states[i] }));
	}
}

export const NULL_EVENT_TYPES = ['BEGIN_DEMO', 'AUTOPLAYING'] as const;

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

function getSimpleEventTestDetailsMap(): Map<SimpleEventType, HtmlElementIdMap> {
	const simpleEventTestDetailsMap = new Map<SimpleEventType, HtmlElementIdMap>();
	simpleEventTestDetailsMap.set('RESET', { variableName: 'resetButton', id: 'reset-button' });
	simpleEventTestDetailsMap.set('GO_TO_FIRST_STEP', { variableName: 'firstStepButton', id: 'first-step-button' });
	simpleEventTestDetailsMap.set('GO_TO_PREV_STEP', { variableName: 'prevStepButton', id: 'previous-step-button' });
	simpleEventTestDetailsMap.set('GO_TO_NEXT_STEP', { variableName: 'nextStepButton', id: 'next-step-button' });
	simpleEventTestDetailsMap.set('GO_TO_LAST_STEP', { variableName: 'lastStepButton', id: 'last-step-button' });
	simpleEventTestDetailsMap.set('RESUME_AUTO_PLAY', {
		variableName: 'startAutoplayButton',
		id: 'start-autoplay-button',
	});
	simpleEventTestDetailsMap.set('STOP_AUTO_PLAY', { variableName: 'stopAutoplayButton', id: 'stop-autoplay-button' });
	return simpleEventTestDetailsMap;
}

export const simpleEventTestDetailsMap = getSimpleEventTestDetailsMap();

function getDataEventToSimpleEventMap(): Map<DataEventType, SimpleEventType> {
	const dataEventToSimpleEventMap = new Map<DataEventType, SimpleEventType>();
	dataEventToSimpleEventMap.set('UPDATE_TEXT', null);
	dataEventToSimpleEventMap.set('VALIDATE_TEXT', 'GO_TO_NEXT_STEP');
	dataEventToSimpleEventMap.set('START_AUTOPLAY', 'RESUME_AUTO_PLAY');
	dataEventToSimpleEventMap.set('SKIP_DEMO', 'GO_TO_LAST_STEP');
	return dataEventToSimpleEventMap;
}

export const dataEventToSimpleEventMap = getDataEventToSimpleEventMap();

function getEncodingSettingElementIdMap(): Map<StringEncoding | Base64Encoding, HtmlElementIds> {
	const encodingSettingElementIdMap = new Map<StringEncoding | Base64Encoding, HtmlElementIds>();
	encodingSettingElementIdMap.set('ASCII', {
		ids: ['select-string-encoding-open-list-button', 'select-string-encoding-option-1'],
		variableNames: ['stringEncodingMenu', 'asciiEncodingMenuItem'],
	});
	encodingSettingElementIdMap.set('UTF-8', {
		ids: ['select-string-encoding-open-list-button', 'select-string-encoding-option-2'],
		variableNames: ['stringEncodingMenu', 'asciiEncodingMenuItem'],
	});
	encodingSettingElementIdMap.set('hex', {
		ids: ['select-string-encoding-open-list-button', 'select-string-encoding-option-3'],
		variableNames: ['stringEncodingMenu', 'hexEncodingMenuItem'],
	});
	encodingSettingElementIdMap.set('bin', {
		ids: ['select-string-encoding-open-list-button', 'select-string-encoding-option-4'],
		variableNames: ['stringEncodingMenu', 'binEncodingMenuItem'],
	});
	encodingSettingElementIdMap.set('base64', {
		ids: ['select-base64-encoding-open-list-button', 'select-base64-encoding-option-1'],
		variableNames: ['base64EncodingMenu', 'base64EncodingMenuItem'],
	});
	encodingSettingElementIdMap.set('base64url', {
		ids: ['select-base64-encoding-open-list-button', 'select-base64-encoding-option-2'],
		variableNames: ['base64EncodingMenu', 'base64urlEncodingMenuItem'],
	});
	return encodingSettingElementIdMap;
}

export const encodingSettingElementIdMap = getEncodingSettingElementIdMap();

function getMachineStateDemoTextMap(): Map<string, string> {
	const machineStateDemoTextMap = new Map<string, string>();
	machineStateDemoTextMap.set('inactive', 'Enter a string value in the text box above to get started.');
	machineStateDemoTextMap.set('validateInputText-error', 'Enter a string value in the text box above to get started.');
	machineStateDemoTextMap.set(
		'validateInputText-success',
		'Nicely done! The value you provided looks, smells and tastes like a valid',
	);
	machineStateDemoTextMap.set(
		'encodeInput-idle',
		'The first step in the Base64 encoding process is to convert the input data to binary',
	);
	machineStateDemoTextMap.set('encodeInput-encodeByte', ', which has binary value');
	machineStateDemoTextMap.set('encodeInput-autoPlayEncodeByte', ', which has binary value');
	machineStateDemoTextMap.set(
		'encodeInput-explainByteMapping',
		'the input data has been converted to a sequence of 8-bit bytes.',
	);
	machineStateDemoTextMap.set(
		'createInputChunks-regularIdle',
		'Three 8-bit bytes of input data (3x8 = 24 bits) can be represented by four 6-bit Base64 digits (4x6 = 24 bits).',
	);
	machineStateDemoTextMap.set(
		'createInputChunks-autoPlayIdle',
		'Three 8-bit bytes of input data (3x8 = 24 bits) can be represented by four 6-bit Base64 digits (4x6 = 24 bits).',
	);
	machineStateDemoTextMap.set('createInputChunks-createInputChunk', ' chunk (');
	machineStateDemoTextMap.set('createInputChunks-autoPlayCreateInputChunk', ' chunk (');
	machineStateDemoTextMap.set(
		'createInputChunks-explainLastPaddedChunk',
		'The chunk size of 24-bits was chosen because it is divisible by 6',
	);
	machineStateDemoTextMap.set('createInputChunks-createLastPaddedChunk', ' and final chunk (');
	machineStateDemoTextMap.set(
		'createOutputChunks-regularIdle',
		'Next, for each chunk of input data with 24 bits (three 8-bit bytes)',
	);
	machineStateDemoTextMap.set(
		'createOutputChunks-autoPlayIdle',
		'Next, for each chunk of input data with three 8-bit bytes',
	);
	machineStateDemoTextMap.set('createOutputChunks-createOutputChunk', ' bits in this chunk are taken from ');
	machineStateDemoTextMap.set('createOutputChunks-autoPlayCreateOutputChunk', ' bits in this chunk are taken from ');
	machineStateDemoTextMap.set(
		'createOutputChunks-explainLastPaddedChunk',
		'Since the final input chunk contains only ',
	);
	machineStateDemoTextMap.set(
		'createOutputChunks-explainPadCharacter',
		'For various reasons, it is considered best practice to always structure Base64 data in groups of four digits.',
	);
	machineStateDemoTextMap.set('createOutputChunks-createLastPaddedChunk', ' bits in this chunk are taken from ');
	machineStateDemoTextMap.set(
		'encodeOutput-idle',
		'The final step is to convert each 6-bit value to the corresponding Base64 digit.',
	);
	machineStateDemoTextMap.set('encodeOutput-encodeBase64', 'Base64 digit');
	machineStateDemoTextMap.set('encodeOutput-autoPlayEncodeBase64', 'Base64 digit');
	machineStateDemoTextMap.set('encodeOutput-encodeLastBase64', 'Base64 digit');
	machineStateDemoTextMap.set(
		'verifyResults',
		'The input data has been successfully encoded as a string of Base64 characters!',
	);
	machineStateDemoTextMap.set('finished', 'The encoding process is complete!');
	return machineStateDemoTextMap;
}

export const machineStateDemoTextMap = getMachineStateDemoTextMap();

export function getNavButtonTracker(): Map<SimpleEventType, boolean> {
	const navButtonMap = new Map<SimpleEventType, boolean>();
	navButtonMap.set('RESET', false);
	navButtonMap.set('GO_TO_FIRST_STEP', false);
	navButtonMap.set('GO_TO_PREV_STEP', false);
	navButtonMap.set('GO_TO_NEXT_STEP', false);
	navButtonMap.set('GO_TO_LAST_STEP', false);
	navButtonMap.set('RESUME_AUTO_PLAY', false);
	navButtonMap.set('STOP_AUTO_PLAY', false);
	return navButtonMap;
}

export function getElementHandleTracker(): Map<string, boolean> {
	const elementMap = new Map<string, boolean>();
	elementMap.set('input-text', false);
	elementMap.set('select-string-encoding-open-list-button', false);
	elementMap.set('select-base64-encoding-open-list-button', false);
	elementMap.set('select-string-encoding-option-1', false);
	elementMap.set('select-string-encoding-option-3', false);
	elementMap.set('select-string-encoding-option-4', false);
	elementMap.set('select-base64-encoding-option-1', false);
	elementMap.set('select-base64-encoding-option-2', false);
	return elementMap;
}

export function getScripObjectTracker(): Map<string, boolean> {
	const objectMap = new Map<string, boolean>();
	objectMap.set('domReflectsCurrentState', false);
	objectMap.set('expectedTextForState', false);
	return objectMap;
}

export const isNullMachineEvent = (event: MachineEventType): event is NullEventType =>
	NULL_EVENT_TYPES.some((type) => event === type);

export const isSimpleMachineEvent = (event: MachineEvent): event is SimpleEvent =>
	SIMPLE_EVENT_TYPES.some((type) => event.type === type);

export const isDataMachineEvent = (event: MachineEvent): event is DataEvent =>
	DATA_EVENT_TYPES.some((type) => event.type === type);

export const formatStateName = (state: MachineState): string =>
	`${state.state}${state.substate !== 'none' ? `-${state.substate}` : ``}`;
/* c8 ignore stop */
