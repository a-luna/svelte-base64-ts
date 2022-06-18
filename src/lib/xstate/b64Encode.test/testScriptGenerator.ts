/* c8 ignore start */
import { isStringEncoding } from '$lib/typeguards';
import type { Base64Encoding, StringEncoding } from '$lib/types';
import { getRandomHexString } from '$lib/util';
import type {
	DataEvent,
	MachineEvent,
	MachineState,
	MachineTestStepData,
	SimpleEventType,
} from '$lib/xstate/b64Encode.test/types';
import {
	dataEventToSimpleEventMap,
	encodingSettingElementIdMap,
	formatStateName,
	getElementHandleTracker,
	getNavButtonTracker,
	getScripObjectTracker,
	isDataMachineEvent,
	isSimpleMachineEvent,
	machineStateDemoTextMap,
	simpleEventTestDetailsMap,
} from '$lib/xstate/b64Encode.test/util';

const getAutoplayTimeout = (machineState: MachineState): number =>
	machineState.state === 'createInputChunks' && machineState.substate === 'createLastPaddedChunk'
		? 200
		: machineState.state === 'encodeOutput' && machineState.substate === 'encodeLastBase64'
		? 100
		: 1100;

export function createTestScript(
	testSteps: MachineTestStepData[],
	scriptName: string,
	ignoreUpdateTextEvents = true,
): string {
	const instantiatedScriptObjects = getScripObjectTracker();
	const instantiatedNavButtons = getNavButtonTracker();
	const instantiatedHtmlElements = getElementHandleTracker();

	function generateCodeForTestStep(testStep: MachineTestStepData): string {
		const { event, expectedState } = testStep;
		let testCode: string[] = [];
		if (isSimpleMachineEvent(event)) {
			testCode = generateCodeForSimpleEvent(event.type);
		}
		if (isDataMachineEvent(event)) {
			testCode = generateCodeForDataEvent(event);
		}
		testCode = [...testCode, ...generateCodeForStateVerification(event, expectedState)];
		return testCode.join('\n');
	}

	function generateCodeForStateVerification(event: MachineEvent, machineState: MachineState): string[] {
		const substate = machineState.substate === 'encodeLastBase64' ? 'autoPlayEncodeBase64' : machineState.substate;
		const stateName = formatStateName(machineState);
		const testCode: string[] = [];
		if (event.type === 'BEGIN_DEMO') {
			testCode.push(`// Verify initial state of machine is ${stateName}`);
		} else if (event.type === 'AUTOPLAYING') {
			const autoplayTimeout = getAutoplayTimeout(machineState);
			testCode.push(`// Verify machine automatically transitions to next state: ${stateName}`);
			testCode.push(`await new Promise((r) => setTimeout(r, ${autoplayTimeout}));`);
		} else {
			testCode.push(`// Verify transition to state: ${stateName} after event ${event.type}`);
		}

		const queryExpectedMachineState = `let domReflectsCurrentState = document.querySelector('[data-state="${machineState.state}"][data-sub-state="${substate}"]');`;
		const verifyExpectedMachineState = `expect(domReflectsCurrentState).toBeTruthy();`;
		const instantiateDemoTextObject = `const demoText = await screen.findByTestId('demo-text');`;
		const getExpectedDemoText = `let expectedTextForState = \`${machineStateDemoTextMap.get(stateName)}\`;`;
		const verifyExpectedDemoText = `expect(demoText.innerHTML).toContain(expectedTextForState);`;

		if (!instantiatedScriptObjects.get('domReflectsCurrentState')) {
			instantiatedScriptObjects.set('domReflectsCurrentState', true);
			testCode.push(queryExpectedMachineState);
		} else {
			testCode.push(queryExpectedMachineState.slice(4));
		}
		testCode.push(verifyExpectedMachineState);
		if (machineState.state === 'validateInputText' && machineState.substate === 'error') {
			testCode.push(`// Wait for state machine to transition back to 'inactive' state`);
			testCode.push(`await new Promise((r) => setTimeout(r, 1100));`);
			testCode.push(
				`domReflectsCurrentState = document.querySelector('[data-state="inactive"][data-sub-state="none"]');`,
			);
			testCode.push(`expect(domReflectsCurrentState).toBeTruthy();`);
		} else {
			if (!instantiatedScriptObjects.get('demoText')) {
				instantiatedScriptObjects.set('demoText', true);
				testCode.push(instantiateDemoTextObject);
				testCode.push(getExpectedDemoText);
			} else {
				testCode.push(getExpectedDemoText.slice(4));
			}
			testCode.push(verifyExpectedDemoText);
		}
		return testCode;
	}

	function generateCodeForSimpleEvent(simpleEvent: SimpleEventType): string[] {
		const testData = simpleEventTestDetailsMap.get(simpleEvent);
		if (testData) {
			const { variableName, id } = testData;
			const testCode: string[] = [];
			testCode.push(`// Click ${simpleEvent} button`);
			if (!instantiatedNavButtons.get(simpleEvent)) {
				testCode.push(`const ${variableName} = await screen.findByTestId('${id}');`);
				instantiatedNavButtons.set(simpleEvent, true);
			}
			testCode.push(`await userEvent.click(${variableName});`);
			return testCode;
		}
	}

	function generateCodeForDataEvent(dataEvent: DataEvent): string[] {
		const { inputText, inputEncoding, outputEncoding } = dataEvent;
		const changeFormSettingsCode = [
			...getCodeToEditTextBox('input-text', inputText),
			...getCodeToChangeEncodingSetting(inputEncoding),
			...getCodeToChangeEncodingSetting(outputEncoding),
		];
		const simpleEvent = dataEventToSimpleEventMap.get(dataEvent.type);
		if (!simpleEvent) {
			return changeFormSettingsCode;
		}
		return [...changeFormSettingsCode, '\n\n', ...generateCodeForSimpleEvent(simpleEvent)];
	}

	function getCodeToEditTextBox(testId: string, input: string): string[] {
		const testCode: string[] = [];
		if (input) {
			testCode.push(`// Set the value of the input data text box: ${input}`);
			if (!instantiatedHtmlElements.get(testId)) {
				instantiatedHtmlElements.set(testId, true);
				testCode.push(`const inputTextBox = await screen.findByTestId('${testId}');`);
				testCode.push(`await userEvent.type(inputTextBox, '${input}');`);
			} else {
				testCode.push(`await userEvent.clear(inputTextBox);`);
				testCode.push(`await userEvent.type(inputTextBox, '${input}');`);
			}
		}
		return testCode;
	}

	function getCodeToChangeEncodingSetting(encoding: StringEncoding | Base64Encoding): string[] {
		const inputType = isStringEncoding(encoding) ? 'input' : 'output';
		const encodingSettingMap = encodingSettingElementIdMap.get(encoding);
		if (encodingSettingMap) {
			const [menuId, menuItemId] = encodingSettingMap.ids;
			const [menuName, menuItemName] = encodingSettingMap.variableNames;
			const testCode: string[] = [];
			testCode.push(`// Change ${inputType} encoding setting to ${encoding}`);
			if (!instantiatedHtmlElements.get(menuId)) {
				testCode.push(`const ${menuName} = await screen.findByTestId('${menuId}');`);
				instantiatedHtmlElements.set(menuId, true);
			}
			testCode.push(`await userEvent.click(${menuName});`);
			if (!instantiatedHtmlElements.get(menuItemId)) {
				testCode.push(`const ${menuItemName} = await screen.findByTestId('${menuItemId}');`);
				instantiatedHtmlElements.set(menuItemId, true);
			}
			testCode.push(`await userEvent.click(${menuItemName});`);
			return testCode;
		}
	}

	if (scriptName === null) {
		scriptName = `test${getRandomHexString(4)}`;
	}
	const functionDeclaration = `const ${scriptName}: JSDomTestFunction = async (screen: Screen, userEvent: UserEvent, expect: Vi.ExpectStatic): Promise<void> => {`;

	const testScript = testSteps
		.filter((step) => step)
		.filter((step) => step.event.type !== 'UPDATE_TEXT' || !ignoreUpdateTextEvents)
		.map(generateCodeForTestStep)
		.join('\n\n');

	return [functionDeclaration, testScript, '};'].join('\n');
}
/* c8 ignore stop */
