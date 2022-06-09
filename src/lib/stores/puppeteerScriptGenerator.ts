import {
	DATA_EVENT_TYPES,
	NULL_EVENT_TYPES,
	SIMPLE_EVENT_TYPES,
	type DataEvent,
	type DataEventType,
	type MachineEvent,
	type MachineState,
	type MachineTestStepData,
	type NullEvent,
	type SimpleEvent,
	type SimpleEventType,
} from '$lib/stores/eventLog';
import { isStringEncoding } from '$lib/typeguards';
import type { Base64Encoding, StringEncoding } from '$lib/types';

type SimpleEventTestDetails = { buttonName: string; testId: string };
type SimpleEventTestDetailsMap = { type: SimpleEventType; data: SimpleEventTestDetails };
type DataEventToSimpleEventMap = { dataEvent: DataEventType; simpleEvent: SimpleEventType };
type EncodingToHtmlElementIdsMap = {
	encoding: StringEncoding | Base64Encoding;
	ids: [string, string];
	variableNames: [string, string];
}[];
export type PuppeteerOptions = { ignoreUpdateTextEvents?: boolean; port?: number };

const simpleEventTestDetailsMap: SimpleEventTestDetailsMap[] = [
	{ type: 'RESET', data: { buttonName: 'resetButton', testId: 'reset-button' } },
	{ type: 'GO_TO_FIRST_STEP', data: { buttonName: 'firstStepButton', testId: 'first-step-button' } },
	{ type: 'GO_TO_PREV_STEP', data: { buttonName: 'prevStepButton', testId: 'previous-step-button' } },
	{ type: 'GO_TO_NEXT_STEP', data: { buttonName: 'nextStepButton', testId: 'next-step-button' } },
	{ type: 'GO_TO_LAST_STEP', data: { buttonName: 'lastStepButton', testId: 'last-step-button' } },
	{ type: 'RESUME_AUTO_PLAY', data: { buttonName: 'startAutoplayButton', testId: 'start-autoplay-button' } },
	{ type: 'STOP_AUTO_PLAY', data: { buttonName: 'stopAutoplayButton', testId: 'stop-autoplay-button' } },
];

const dataEventToSimpleEventMap: DataEventToSimpleEventMap[] = [
	{ dataEvent: 'UPDATE_TEXT', simpleEvent: null },
	{ dataEvent: 'VALIDATE_TEXT', simpleEvent: 'GO_TO_NEXT_STEP' },
	{ dataEvent: 'START_AUTOPLAY', simpleEvent: 'RESUME_AUTO_PLAY' },
	{ dataEvent: 'SKIP_DEMO', simpleEvent: 'GO_TO_LAST_STEP' },
];

const encodingSettingElementIdMap: EncodingToHtmlElementIdsMap = [
	{
		encoding: 'ASCII',
		ids: ['select-string-encoding-open-list-button', 'select-string-encoding-option-1'],
		variableNames: ['stringEncodingMenu', 'asciiEncodingMenuItem'],
	},
	{
		encoding: 'hex',
		ids: ['select-string-encoding-open-list-button', 'select-string-encoding-option-3'],
		variableNames: ['stringEncodingMenu', 'hexEncodingMenuItem'],
	},
	{
		encoding: 'bin',
		ids: ['select-string-encoding-open-list-button', 'select-string-encoding-option-4'],
		variableNames: ['stringEncodingMenu', 'binEncodingMenuItem'],
	},
	{
		encoding: 'base64',
		ids: ['select-base64-encoding-open-list-button', 'select-base64-encoding-option-1'],
		variableNames: ['base64EncodingMenu', 'base64EncodingMenuItem'],
	},
	{
		encoding: 'base64url',
		ids: ['select-base64-encoding-open-list-button', 'select-base64-encoding-option-2'],
		variableNames: ['base64EncodingMenu', 'base64urlEncodingMenuItem'],
	},
];

function getNavButtonTracker(): Map<SimpleEventType, boolean> {
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

function getElementHandleTracker(): Map<string, boolean> {
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

const isNullMachineEvent = (event: MachineEvent): event is NullEvent =>
	NULL_EVENT_TYPES.some((type) => event.type === type);

const isSimpleMachineEvent = (event: MachineEvent): event is SimpleEvent =>
	SIMPLE_EVENT_TYPES.some((type) => event.type === type);

const isDataMachineEvent = (event: MachineEvent): event is DataEvent =>
	DATA_EVENT_TYPES.some((type) => event.type === type);

const formatStateName = (state: MachineState): string =>
	`${state.state}${state.substate !== 'none' ? `-${state.substate}` : ``}`;

export function createPuppeteerTestScript(testSteps: MachineTestStepData[], options?: PuppeteerOptions): string {
	let currentState: MachineState;
	const defaultOptions = { timeoutMs: 250, ignoreUpdateTextEvents: true, port: 3000 };
	const { ignoreUpdateTextEvents, port } = { ...defaultOptions, ...options };
	const instantiatedNavButtons = getNavButtonTracker();
	const instantiatedHtmlElements = getElementHandleTracker();

	function generatePuppeteerCodeForStep(testStep: MachineTestStepData): string {
		const { event, expectedState } = testStep;
		if (isNullMachineEvent(event)) {
			if (currentState?.state !== expectedState.state || currentState?.substate !== expectedState.substate) {
				return generatePuppeteerCodeForStateVerification(event, expectedState);
			}
		}
		if (isSimpleMachineEvent(event)) {
			const testCode = [
				generatePuppeteerCodeForSimpleEvent(event.type),
				generatePuppeteerCodeForStateVerification(event, expectedState),
			];
			return testCode.join('\n');
		}
		if (isDataMachineEvent(event)) {
			const testCode = [
				generatePuppeteerCodeForDataEvent(event),
				generatePuppeteerCodeForStateVerification(event, expectedState),
			];
			return testCode.join('\n');
		}
	}

	function generatePuppeteerCodeForStateVerification(event: MachineEvent, machineState: MachineState): string {
		const { state, substate } = machineState;
		const stateName = formatStateName(machineState);
		const testCode = [];
		if (event.type === 'BEGIN_DEMO') {
			testCode.push(`// Verify initial state of machine is ${stateName}`);
		} else if (event.type === 'AUTOPLAYING') {
			testCode.push(`// Verify machine automatically transitions to next state: ${stateName}`);
		} else {
			testCode.push(`// Verify machine state transitioned to ${stateName} after event ${event.type}`);
		}
		if (currentState?.state !== state) {
			testCode.push(`await page.waitForSelector('[data-state="${state}"]');`);
		}
		currentState = machineState;
		testCode.push(`await page.waitForSelector('[data-sub-state="${substate}"]');`);
		return testCode.join('\n');
	}

	function generatePuppeteerCodeForSimpleEvent(simpleEvent: SimpleEventType): string {
		const testData = simpleEventTestDetailsMap.find((map) => map.type === simpleEvent)?.data;
		if (testData) {
			const { buttonName, testId } = testData;
			const testCode = [];
			testCode.push(`// Click ${simpleEvent} button`);
			if (!instantiatedNavButtons.get(simpleEvent)) {
				testCode.push(`const ${buttonName} = await page.waitForSelector(\`[data-testid="${testId}"]\`);`);
				testCode.push(`await ${buttonName}.click();`);
				instantiatedNavButtons.set(simpleEvent, true);
			} else {
				testCode.push(`await ${buttonName}.click();`);
			}
			// testCode.push(`await page.waitForTimeout(${timeoutMs});`);
			return testCode.join('\n');
		}
	}

	function generatePuppeteerCodeForDataEvent(dataEvent: DataEvent): string {
		const { inputText, inputEncoding, outputEncoding } = dataEvent;
		const changeFormSettingsCode = [
			getPuppeteerCodeToEditTextBox('input-text', inputText),
			getPuppeteerCodeToChangeEncodingSetting(inputEncoding),
			getPuppeteerCodeToChangeEncodingSetting(outputEncoding),
		];

		const simpleEvent = dataEventToSimpleEventMap.find((map) => map.dataEvent === dataEvent.type)?.simpleEvent;
		if (!simpleEvent) {
			return changeFormSettingsCode.join('\n');
		}
		const testCode = [changeFormSettingsCode.join('\n'), generatePuppeteerCodeForSimpleEvent(simpleEvent)];
		return testCode.join('\n\n');
	}

	function getPuppeteerCodeToChangeEncodingSetting(encoding: StringEncoding | Base64Encoding): string {
		const inputType = isStringEncoding(encoding) ? 'input' : 'output';
		const encodingSettingMap = encodingSettingElementIdMap.find((m) => m.encoding === encoding);
		if (encodingSettingMap) {
			const [menuId, menuItemId] = encodingSettingMap.ids;
			const [menuName, menuItemName] = encodingSettingMap.variableNames;
			const testCode = [];
			testCode.push(`// Change ${inputType} encoding setting to ${encoding}`);

			if (!instantiatedHtmlElements.get(menuId)) {
				testCode.push(`const ${menuName} = await page.waitForSelector(\`[data-testid="${menuId}"]\`);`);
				testCode.push(`await ${menuName}.click();`);
				instantiatedHtmlElements.set(menuId, true);
			} else {
				testCode.push(`await ${menuName}.click();`);
			}
			// testCode.push(`await page.waitForTimeout(${timeoutMs});`);

			if (!instantiatedHtmlElements.get(menuItemId)) {
				testCode.push(`const ${menuItemName} = await page.waitForSelector(\`[data-testid="${menuItemId}"]\`);`);
				testCode.push(`await ${menuItemName}.click();`);
				instantiatedHtmlElements.set(menuItemId, true);
			} else {
				testCode.push(`await ${menuItemName}.click();`);
			}
			// testCode.push(`await page.waitForTimeout(${timeoutMs});`);

			return testCode.join('\n');
		}
	}

	function getPuppeteerCodeToEditTextBox(testId: string, input: string) {
		const testCode = [];
		testCode.push(`// Set the value of the input data text box: ${input}`);
		if (!instantiatedHtmlElements.get(testId)) {
			testCode.push(`const inputTextBox = await page.waitForSelector(\`[data-testid="${testId}"]\`);`);
			testCode.push(`await inputTextBox.type('${input}', { delay: 50 });`);
			instantiatedHtmlElements.set(testId, true);
		} else {
			testCode.push(`await inputTextBox.type('${input}', { delay: 50 });`);
		}
		testCode.push(`await page.waitForTimeout(300);`);
		return testCode.join('\n');
	}

	const codeSteps = testSteps.map((step) => {
		const ignoreStep = ignoreUpdateTextEvents && step.event.type === 'UPDATE_TEXT';
		if (!ignoreStep) {
			return generatePuppeteerCodeForStep(step);
		}
	});

	return [`await page.goto('http://localhost:${port}', {waitUntil: 'networkidle0'})`, ...codeSteps].join('\n\n');
}
