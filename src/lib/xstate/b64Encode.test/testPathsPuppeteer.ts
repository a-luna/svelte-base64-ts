/* c8 ignore start */
import type { PuppeteerTestCase } from '$lib/xstate/b64Encode.test/types';
import { machineStateDemoTextMap } from '$lib/xstate/b64Encode.test/util';
import type { ElementHandle, Page } from 'puppeteer';

async function getInnerTextFromDomElements(results: ElementHandle<Element>[]): Promise<string> {
	const textContent = await Promise.all(
		results.map(async (result) => {
			const p = await result.getProperty('innerText');
			return p.toString().replace('JSHandle:', '');
		}),
	);
	return textContent.join(' ');
}

// const getInnerText = async (page: Page, elHandle: ElementHandle<Node>): Promise<string> => await page.evaluate(el => el.innerText, elHandle);

const asciiHappyPath = async (page: Page, expect: Vi.ExpectStatic): Promise<void> => {
	await page.goto('http://localhost:3500', { waitUntil: 'networkidle0' });

	// Set the value of the input data text box: test
	const inputTextBox = await page.waitForSelector(`[data-testid="input-text"]`);
	await inputTextBox.type('test', { delay: 50 });
	await page.waitForTimeout(300);
	// Change input encoding setting to ASCII
	const stringEncodingMenu = await page.waitForSelector(`[data-testid="select-string-encoding-open-list-button"]`);
	await stringEncodingMenu.click();
	const asciiEncodingMenuItem = await page.waitForSelector(`[data-testid="select-string-encoding-option-1"]`);
	await asciiEncodingMenuItem.click();
	// Change output encoding setting to base64url
	const base64EncodingMenu = await page.waitForSelector(`[data-testid="select-base64-encoding-open-list-button"]`);
	await base64EncodingMenu.click();
	const base64urlEncodingMenuItem = await page.waitForSelector(`[data-testid="select-base64-encoding-option-2"]`);
	await base64urlEncodingMenuItem.click();

	// Click GO_TO_NEXT_STEP button
	const nextStepButton = await page.waitForSelector(`[data-testid="next-step-button"]`);
	await nextStepButton.click();
	// Verify machine state transitioned to validateInputText-success after event VALIDATE_TEXT
	await page.waitForSelector('[data-state="validateInputText"]');
	await page.waitForSelector('[data-sub-state="success"]');
	// Verify UI contains correct text content for state: [object Object]
	let results = await page.$x('//div[@data-state="validateInputText" and @data-sub-state="success"]//p');
	let demoText = await getInnerTextFromDomElements(results);
	expect(demoText).toContain(machineStateDemoTextMap.get('validateInputText-success'));

	// Click GO_TO_NEXT_STEP button
	await nextStepButton.click();
	// Verify machine state transitioned to encodeInput-idle after event GO_TO_NEXT_STEP
	await page.waitForSelector('[data-state="encodeInput"]');
	await page.waitForSelector('[data-sub-state="idle"]');
	// Verify UI contains correct text content for state: [object Object]
	results = await page.$x('//div[@data-state="encodeInput" and @data-sub-state="idle"]//p');
	demoText = await getInnerTextFromDomElements(results);
	expect(demoText).toContain(machineStateDemoTextMap.get('encodeInput-idle'));

	// Click GO_TO_NEXT_STEP button
	await nextStepButton.click();
	// Verify machine state transitioned to encodeInput-encodeByte after event GO_TO_NEXT_STEP
	await page.waitForSelector('[data-sub-state="encodeByte"]');
	// Verify UI contains correct text content for state: [object Object]
	results = await page.$x('//div[@data-state="encodeInput" and @data-sub-state="encodeByte"]//p');
	demoText = await getInnerTextFromDomElements(results);
	expect(demoText).toContain(machineStateDemoTextMap.get('encodeInput-encodeByte'));

	// Click GO_TO_NEXT_STEP button
	await nextStepButton.click();
	// Verify machine state transitioned to encodeInput-encodeByte after event GO_TO_NEXT_STEP
	await page.waitForSelector('[data-sub-state="encodeByte"]');
	// Verify UI contains correct text content for state: [object Object]
	results = await page.$x('//div[@data-state="encodeInput" and @data-sub-state="encodeByte"]//p');
	demoText = await getInnerTextFromDomElements(results);
	expect(demoText).toContain(machineStateDemoTextMap.get('encodeInput-encodeByte'));

	// Click GO_TO_NEXT_STEP button
	await nextStepButton.click();
	// Verify machine state transitioned to encodeInput-encodeByte after event GO_TO_NEXT_STEP
	await page.waitForSelector('[data-sub-state="encodeByte"]');
	// Verify UI contains correct text content for state: [object Object]
	results = await page.$x('//div[@data-state="encodeInput" and @data-sub-state="encodeByte"]//p');
	demoText = await getInnerTextFromDomElements(results);
	expect(demoText).toContain(machineStateDemoTextMap.get('encodeInput-encodeByte'));

	// Click GO_TO_NEXT_STEP button
	await nextStepButton.click();
	// Verify machine state transitioned to encodeInput-encodeByte after event GO_TO_NEXT_STEP
	await page.waitForSelector('[data-sub-state="encodeByte"]');
	// Verify UI contains correct text content for state: [object Object]
	results = await page.$x('//div[@data-state="encodeInput" and @data-sub-state="encodeByte"]//p');
	demoText = await getInnerTextFromDomElements(results);
	expect(demoText).toContain(machineStateDemoTextMap.get('encodeInput-encodeByte'));

	// Click GO_TO_NEXT_STEP button
	await nextStepButton.click();
	// Verify machine state transitioned to encodeInput-explainByteMapping after event GO_TO_NEXT_STEP
	await page.waitForSelector('[data-sub-state="explainByteMapping"]');
	// Verify UI contains correct text content for state: [object Object]
	results = await page.$x('//div[@data-state="encodeInput" and @data-sub-state="explainByteMapping"]//p');
	demoText = await getInnerTextFromDomElements(results);
	expect(demoText).toContain(machineStateDemoTextMap.get('encodeInput-explainByteMapping'));

	// Click GO_TO_NEXT_STEP button
	await nextStepButton.click();
	// Verify machine state transitioned to createInputChunks-regularIdle after event GO_TO_NEXT_STEP
	await page.waitForSelector('[data-state="createInputChunks"]');
	await page.waitForSelector('[data-sub-state="regularIdle"]');
	// Verify UI contains correct text content for state: [object Object]
	results = await page.$x('//div[@data-state="createInputChunks" and @data-sub-state="regularIdle"]//p');
	demoText = await getInnerTextFromDomElements(results);
	expect(demoText).toContain(machineStateDemoTextMap.get('createInputChunks-regularIdle'));

	// Click GO_TO_NEXT_STEP button
	await nextStepButton.click();
	// Verify machine state transitioned to createInputChunks-createInputChunk after event GO_TO_NEXT_STEP
	await page.waitForSelector('[data-sub-state="createInputChunk"]');
	// Verify UI contains correct text content for state: [object Object]
	results = await page.$x('//div[@data-state="createInputChunks" and @data-sub-state="createInputChunk"]//p');
	demoText = await getInnerTextFromDomElements(results);
	expect(demoText).toContain(machineStateDemoTextMap.get('createInputChunks-createInputChunk'));

	// Click GO_TO_NEXT_STEP button
	await nextStepButton.click();
	// Verify machine state transitioned to createInputChunks-explainLastPaddedChunk after event GO_TO_NEXT_STEP
	await page.waitForSelector('[data-sub-state="explainLastPaddedChunk"]');
	// Verify UI contains correct text content for state: [object Object]
	results = await page.$x('//div[@data-state="createInputChunks" and @data-sub-state="explainLastPaddedChunk"]//p');
	demoText = await getInnerTextFromDomElements(results);
	expect(demoText).toContain(machineStateDemoTextMap.get('createInputChunks-explainLastPaddedChunk'));

	// Click GO_TO_NEXT_STEP button
	await nextStepButton.click();
	// Verify machine state transitioned to createInputChunks-createLastPaddedChunk after event GO_TO_NEXT_STEP
	await page.waitForSelector('[data-sub-state="createLastPaddedChunk"]');
	// Verify UI contains correct text content for state: [object Object]
	results = await page.$x('//div[@data-state="createInputChunks" and @data-sub-state="createLastPaddedChunk"]//p');
	demoText = await getInnerTextFromDomElements(results);
	expect(demoText).toContain(machineStateDemoTextMap.get('createInputChunks-createLastPaddedChunk'));

	// Click GO_TO_NEXT_STEP button
	await nextStepButton.click();
	// Verify machine state transitioned to createOutputChunks-regularIdle after event GO_TO_NEXT_STEP
	await page.waitForSelector('[data-state="createOutputChunks"]');
	await page.waitForSelector('[data-sub-state="regularIdle"]');
	// Verify UI contains correct text content for state: [object Object]
	results = await page.$x('//div[@data-state="createOutputChunks" and @data-sub-state="regularIdle"]//p');
	demoText = await getInnerTextFromDomElements(results);
	expect(demoText).toContain(machineStateDemoTextMap.get('createOutputChunks-regularIdle'));

	// Click GO_TO_NEXT_STEP button
	await nextStepButton.click();
	// Verify machine state transitioned to createOutputChunks-createOutputChunk after event GO_TO_NEXT_STEP
	await page.waitForSelector('[data-sub-state="createOutputChunk"]');
	// Verify UI contains correct text content for state: [object Object]
	results = await page.$x('//div[@data-state="createOutputChunks" and @data-sub-state="createOutputChunk"]//p');
	demoText = await getInnerTextFromDomElements(results);
	expect(demoText).toContain(machineStateDemoTextMap.get('createOutputChunks-createOutputChunk'));

	// Click GO_TO_NEXT_STEP button
	await nextStepButton.click();
	// Verify machine state transitioned to createOutputChunks-explainLastPaddedChunk after event GO_TO_NEXT_STEP
	await page.waitForSelector('[data-sub-state="explainLastPaddedChunk"]');
	// Verify UI contains correct text content for state: [object Object]
	results = await page.$x('//div[@data-state="createOutputChunks" and @data-sub-state="explainLastPaddedChunk"]//p');
	demoText = await getInnerTextFromDomElements(results);
	expect(demoText).toContain(machineStateDemoTextMap.get('createOutputChunks-explainLastPaddedChunk'));

	// Click GO_TO_NEXT_STEP button
	await nextStepButton.click();
	// Verify machine state transitioned to createOutputChunks-explainPadCharacter after event GO_TO_NEXT_STEP
	await page.waitForSelector('[data-sub-state="explainPadCharacter"]');
	// Verify UI contains correct text content for state: [object Object]
	results = await page.$x('//div[@data-state="createOutputChunks" and @data-sub-state="explainPadCharacter"]//p');
	demoText = await getInnerTextFromDomElements(results);
	expect(demoText).toContain(machineStateDemoTextMap.get('createOutputChunks-explainPadCharacter'));

	// Click GO_TO_NEXT_STEP button
	await nextStepButton.click();
	// Verify machine state transitioned to createOutputChunks-createLastPaddedChunk after event GO_TO_NEXT_STEP
	await page.waitForSelector('[data-sub-state="createLastPaddedChunk"]');
	// Verify UI contains correct text content for state: [object Object]
	results = await page.$x('//div[@data-state="createOutputChunks" and @data-sub-state="createLastPaddedChunk"]//p');
	demoText = await getInnerTextFromDomElements(results);
	expect(demoText).toContain(machineStateDemoTextMap.get('createOutputChunks-createLastPaddedChunk'));

	// Click GO_TO_NEXT_STEP button
	await nextStepButton.click();
	// Verify machine state transitioned to encodeOutput-idle after event GO_TO_NEXT_STEP
	await page.waitForSelector('[data-state="encodeOutput"]');
	await page.waitForSelector('[data-sub-state="idle"]');
	// Verify UI contains correct text content for state: [object Object]
	results = await page.$x('//div[@data-state="encodeOutput" and @data-sub-state="idle"]//p');
	demoText = await getInnerTextFromDomElements(results);
	expect(demoText).toContain(machineStateDemoTextMap.get('encodeOutput-idle'));

	// Click GO_TO_NEXT_STEP button
	await nextStepButton.click();
	// Verify machine state transitioned to encodeOutput-encodeBase64 after event GO_TO_NEXT_STEP
	await page.waitForSelector('[data-sub-state="encodeBase64"]');
	// Verify UI contains correct text content for state: [object Object]
	results = await page.$x('//div[@data-state="encodeOutput" and @data-sub-state="encodeBase64"]//p');
	demoText = await getInnerTextFromDomElements(results);
	expect(demoText).toContain(machineStateDemoTextMap.get('encodeOutput-encodeBase64'));

	// Click GO_TO_NEXT_STEP button
	await nextStepButton.click();
	// Verify machine state transitioned to encodeOutput-encodeBase64 after event GO_TO_NEXT_STEP
	await page.waitForSelector('[data-sub-state="encodeBase64"]');
	// Verify UI contains correct text content for state: [object Object]
	results = await page.$x('//div[@data-state="encodeOutput" and @data-sub-state="encodeBase64"]//p');
	demoText = await getInnerTextFromDomElements(results);
	expect(demoText).toContain(machineStateDemoTextMap.get('encodeOutput-encodeBase64'));

	// Click GO_TO_NEXT_STEP button
	await nextStepButton.click();
	// Verify machine state transitioned to encodeOutput-encodeBase64 after event GO_TO_NEXT_STEP
	await page.waitForSelector('[data-sub-state="encodeBase64"]');
	// Verify UI contains correct text content for state: [object Object]
	results = await page.$x('//div[@data-state="encodeOutput" and @data-sub-state="encodeBase64"]//p');
	demoText = await getInnerTextFromDomElements(results);
	expect(demoText).toContain(machineStateDemoTextMap.get('encodeOutput-encodeBase64'));

	// Click GO_TO_NEXT_STEP button
	await nextStepButton.click();
	// Verify machine state transitioned to encodeOutput-encodeBase64 after event GO_TO_NEXT_STEP
	await page.waitForSelector('[data-sub-state="encodeBase64"]');
	// Verify UI contains correct text content for state: [object Object]
	results = await page.$x('//div[@data-state="encodeOutput" and @data-sub-state="encodeBase64"]//p');
	demoText = await getInnerTextFromDomElements(results);
	expect(demoText).toContain(machineStateDemoTextMap.get('encodeOutput-encodeBase64'));

	// Click GO_TO_NEXT_STEP button
	await nextStepButton.click();
	// Verify machine state transitioned to encodeOutput-encodeBase64 after event GO_TO_NEXT_STEP
	await page.waitForSelector('[data-sub-state="encodeBase64"]');
	// Verify UI contains correct text content for state: [object Object]
	results = await page.$x('//div[@data-state="encodeOutput" and @data-sub-state="encodeBase64"]//p');
	demoText = await getInnerTextFromDomElements(results);
	expect(demoText).toContain(machineStateDemoTextMap.get('encodeOutput-encodeBase64'));

	// Click GO_TO_NEXT_STEP button
	await nextStepButton.click();
	// Verify machine state transitioned to encodeOutput-encodeBase64 after event GO_TO_NEXT_STEP
	await page.waitForSelector('[data-sub-state="encodeBase64"]');
	// Verify UI contains correct text content for state: [object Object]
	results = await page.$x('//div[@data-state="encodeOutput" and @data-sub-state="encodeBase64"]//p');
	demoText = await getInnerTextFromDomElements(results);
	expect(demoText).toContain(machineStateDemoTextMap.get('encodeOutput-encodeBase64'));

	// Click GO_TO_NEXT_STEP button
	await nextStepButton.click();
	// Verify machine state transitioned to encodeOutput-encodeBase64 after event GO_TO_NEXT_STEP
	await page.waitForSelector('[data-sub-state="encodeBase64"]');
	// Verify UI contains correct text content for state: [object Object]
	results = await page.$x('//div[@data-state="encodeOutput" and @data-sub-state="encodeBase64"]//p');
	demoText = await getInnerTextFromDomElements(results);
	expect(demoText).toContain(machineStateDemoTextMap.get('encodeOutput-encodeBase64'));

	// Click GO_TO_NEXT_STEP button
	await nextStepButton.click();
	// Verify machine state transitioned to encodeOutput-encodeBase64 after event GO_TO_NEXT_STEP
	await page.waitForSelector('[data-sub-state="encodeBase64"]');
	// Verify UI contains correct text content for state: [object Object]
	results = await page.$x('//div[@data-state="encodeOutput" and @data-sub-state="encodeBase64"]//p');
	demoText = await getInnerTextFromDomElements(results);
	expect(demoText).toContain(machineStateDemoTextMap.get('encodeOutput-encodeBase64'));

	// Click GO_TO_NEXT_STEP button
	await nextStepButton.click();
	// Verify machine state transitioned to finished after event GO_TO_NEXT_STEP
	await page.waitForSelector('[data-state="finished"]');
	await page.waitForSelector('[data-sub-state="none"]');
	// Verify UI contains correct text content for state: [object Object]
	results = await page.$x('//div[@data-state="finished" and @data-sub-state="none"]//p');
	demoText = await getInnerTextFromDomElements(results);
	expect(demoText).toContain(machineStateDemoTextMap.get('finished'));
};

const asciiHappyPathAutoplay = async (page: Page, expect: Vi.ExpectStatic): Promise<void> => {
	await page.goto('http://localhost:3500', { waitUntil: 'networkidle0' });

	// Set the value of the input data text box: test
	const inputTextBox = await page.waitForSelector(`[data-testid="input-text"]`);
	await inputTextBox.type('test', { delay: 50 });
	await page.waitForTimeout(300);
	// Change input encoding setting to ASCII
	const stringEncodingMenu = await page.waitForSelector(`[data-testid="select-string-encoding-open-list-button"]`);
	await stringEncodingMenu.click();
	const asciiEncodingMenuItem = await page.waitForSelector(`[data-testid="select-string-encoding-option-1"]`);
	await asciiEncodingMenuItem.click();
	// Change output encoding setting to base64url
	const base64EncodingMenu = await page.waitForSelector(`[data-testid="select-base64-encoding-open-list-button"]`);
	await base64EncodingMenu.click();
	const base64urlEncodingMenuItem = await page.waitForSelector(`[data-testid="select-base64-encoding-option-2"]`);
	await base64urlEncodingMenuItem.click();

	// Click RESUME_AUTO_PLAY button
	const startAutoplayButton = await page.waitForSelector(`[data-testid="start-autoplay-button"]`);
	await startAutoplayButton.click();
	// Verify machine state transitioned to validateInputText-success after event START_AUTOPLAY
	await page.waitForSelector('[data-state="validateInputText"]');
	await page.waitForSelector('[data-sub-state="success"]');

	// Verify machine automatically transitions to next state: encodeInput-idle
	await page.waitForSelector('[data-state="encodeInput"]');
	await page.waitForSelector('[data-sub-state="idle"]');

	// Verify machine automatically transitions to next state: encodeInput-autoPlayEncodeByte
	await page.waitForSelector('[data-sub-state="autoPlayEncodeByte"]');

	// Verify machine automatically transitions to next state: encodeInput-explainByteMapping
	await page.waitForSelector('[data-sub-state="explainByteMapping"]');

	// Verify machine automatically transitions to next state: createInputChunks-autoPlayIdle
	await page.waitForSelector('[data-state="createInputChunks"]');
	await page.waitForSelector('[data-sub-state="autoPlayIdle"]');

	// Verify machine automatically transitions to next state: createInputChunks-autoPlayCreateInputChunk
	await page.waitForSelector('[data-sub-state="autoPlayCreateInputChunk"]');

	// Verify machine automatically transitions to next state: createInputChunks-explainLastPaddedChunk
	await page.waitForSelector('[data-sub-state="explainLastPaddedChunk"]');

	// Verify machine automatically transitions to next state: createInputChunks-createLastPaddedChunk
	await page.waitForSelector('[data-sub-state="createLastPaddedChunk"]');

	// Verify machine automatically transitions to next state: createOutputChunks-autoPlayIdle
	await page.waitForSelector('[data-state="createOutputChunks"]');
	await page.waitForSelector('[data-sub-state="autoPlayIdle"]');

	// Verify machine automatically transitions to next state: createOutputChunks-autoPlayCreateOutputChunk
	await page.waitForSelector('[data-sub-state="autoPlayCreateOutputChunk"]');

	// Verify machine automatically transitions to next state: createOutputChunks-explainLastPaddedChunk
	await page.waitForSelector('[data-sub-state="explainLastPaddedChunk"]');

	// Verify machine automatically transitions to next state: createOutputChunks-explainPadCharacter
	await page.waitForSelector('[data-sub-state="explainPadCharacter"]');

	// Verify machine automatically transitions to next state: createOutputChunks-createLastPaddedChunk
	await page.waitForSelector('[data-sub-state="createLastPaddedChunk"]');

	// Verify machine automatically transitions to next state: encodeOutput-idle
	await page.waitForSelector('[data-state="encodeOutput"]');
	await page.waitForSelector('[data-sub-state="idle"]');

	// Verify machine automatically transitions to next state: encodeOutput-autoPlayEncodeBase64
	await page.waitForSelector('[data-sub-state="autoPlayEncodeBase64"]');

	// Verify machine automatically transitions to next state: finished
	await page.waitForSelector('[data-state="finished"]');
	await page.waitForSelector('[data-sub-state="none"]');
};

const asciiHappyPathSkipDemo = async (page: Page, expect: Vi.ExpectStatic): Promise<void> => {
	await page.goto('http://localhost:3500', { waitUntil: 'networkidle0' });

	// Set the value of the input data text box: test
	const inputTextBox = await page.waitForSelector(`[data-testid="input-text"]`);
	await inputTextBox.type('test', { delay: 50 });
	// await page.waitForTimeout(300);
	// Change input encoding setting to ASCII
	const stringEncodingMenu = await page.waitForSelector(`[data-testid="select-string-encoding-open-list-button"]`);
	await stringEncodingMenu.click();
	const asciiEncodingMenuItem = await page.waitForSelector(`[data-testid="select-string-encoding-option-1"]`);
	await asciiEncodingMenuItem.click();
	// Change output encoding setting to base64url
	const base64EncodingMenu = await page.waitForSelector(`[data-testid="select-base64-encoding-open-list-button"]`);
	await base64EncodingMenu.click();
	const base64urlEncodingMenuItem = await page.waitForSelector(`[data-testid="select-base64-encoding-option-2"]`);
	await base64urlEncodingMenuItem.click();

	// Click GO_TO_LAST_STEP button
	const lastStepButton = await page.waitForSelector(`[data-testid="last-step-button"]`);
	await lastStepButton.click();
	// Verify machine state transitioned to finished after event SKIP_DEMO
	await page.waitForSelector('[data-state="finished"]');
	await page.waitForSelector('[data-sub-state="none"]');
};

export const testPathsPuppeteer: PuppeteerTestCase[] = [
	{ description: 'encode ascii text, execute all steps manually', testFunction: asciiHappyPath },
	{ description: 'encode ascii text, execute all steps with autoplay', testFunction: asciiHappyPathAutoplay },
	{ description: 'encode ascii text, skip demo', testFunction: asciiHappyPathSkipDemo },
];
/* c8 ignore stop */
