/* c8 ignore start */
import { isStringEncoding } from '$lib/typeguards';
import type { Base64Encoding, StringEncoding } from '$lib/types';
import type {
	DataEvent,
	MachineEvent,
	MachineState,
	MachineTestStepData,
	SimpleEventType,
	TestEnvSettings,
} from '$lib/xstate/b64Encode.test/types';
import {
	dataEventToSimpleEventMap,
	encodingSettingElementIdMap,
	formatStateName,
	getElementHandleTracker,
	getNavButtonTracker,
	isDataMachineEvent,
	isNullMachineEvent,
	isSimpleMachineEvent,
	simpleEventTestDetailsMap,
} from '$lib/xstate/b64Encode.test/util';

export function createTestScript(testSteps: MachineTestStepData[], options?: TestEnvSettings): string {
	let currentState: MachineState;
	let instantiatedXPathObjects = false;
	const instantiatedNavButtons = getNavButtonTracker();
	const instantiatedHtmlElements = getElementHandleTracker();
	const defaultOptions = { timeoutMs: 250, ignoreUpdateTextEvents: true, port: 3000 };
	const { timeoutMs, ignoreUpdateTextEvents, port } = { ...defaultOptions, ...options };

	function generatePuppeteerCodeForStep(testStep: MachineTestStepData): string {
		const { event, expectedState } = testStep;
		if (isNullMachineEvent(event.type)) {
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
		testCode.push(generatePuppeteerCodeToVerifyDemoText());
		return testCode.join('\n');
	}

	function generatePuppeteerCodeToVerifyDemoText(): string {
		const { state, substate } = currentState;
		const stateName = formatStateName(currentState);
		let objectAssignments = [
			`let results = await page.$x('//div[@data-state="${state}" and @data-sub-state="${substate}"]//p');`,
			`let demoText = await getInnerTextFromDomElements(results);`,
		];
		if (!instantiatedXPathObjects) {
			instantiatedXPathObjects = true;
		} else {
			objectAssignments = objectAssignments.map((s) => s.slice(4));
		}
		const testCode = [
			`// Verify UI contains correct text content for state: ${stateName}`,
			...objectAssignments,
			`expect(demoText).toContain(machineStateDemoTextMap.get("${stateName}"));`,
		];
		return testCode.join('\n');
	}

	function generatePuppeteerCodeForSimpleEvent(simpleEvent: SimpleEventType): string {
		const testData = simpleEventTestDetailsMap.get(simpleEvent);
		if (testData) {
			const { variableName, id } = testData;
			const testCode = [];
			testCode.push(`// Click ${simpleEvent} button`);
			if (!instantiatedNavButtons.get(simpleEvent)) {
				testCode.push(`const ${variableName} = await page.waitForSelector(\`[data-testid="${id}"]\`);`);
				testCode.push(`await ${variableName}.click();`);
				instantiatedNavButtons.set(simpleEvent, true);
			} else {
				testCode.push(`await ${variableName}.click();`);
			}
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
		const simpleEvent = dataEventToSimpleEventMap.get(dataEvent.type);
		if (!simpleEvent) {
			return changeFormSettingsCode.join('\n');
		}
		const testCode = [changeFormSettingsCode.join('\n'), generatePuppeteerCodeForSimpleEvent(simpleEvent)];
		return testCode.join('\n\n');
	}

	function getPuppeteerCodeToChangeEncodingSetting(encoding: StringEncoding | Base64Encoding): string {
		const inputType = isStringEncoding(encoding) ? 'input' : 'output';
		const encodingSettingMap = encodingSettingElementIdMap.get(encoding);
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
			if (!instantiatedHtmlElements.get(menuItemId)) {
				testCode.push(`const ${menuItemName} = await page.waitForSelector(\`[data-testid="${menuItemId}"]\`);`);
				testCode.push(`await ${menuItemName}.click();`);
				instantiatedHtmlElements.set(menuItemId, true);
			} else {
				testCode.push(`await ${menuItemName}.click();`);
			}
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
		testCode.push(`await page.waitForTimeout(${timeoutMs});`);
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
/* c8 ignore stop */
