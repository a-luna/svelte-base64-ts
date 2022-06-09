import type { Page } from 'puppeteer';

const asciiHappyPath = async (page: Page): Promise<void> => {
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

	// Click GO_TO_NEXT_STEP button
	const nextStepButton = await page.waitForSelector(`[data-testid="next-step-button"]`);
	await nextStepButton.click();
	// Verify machine state transitioned to validateInputText-success after event VALIDATE_TEXT
	await page.waitForSelector('[data-state="validateInputText"]');
	await page.waitForSelector('[data-sub-state="success"]');

	// Click GO_TO_NEXT_STEP button
	await nextStepButton.click();
	// Verify machine state transitioned to encodeInput-idle after event GO_TO_NEXT_STEP
	await page.waitForSelector('[data-state="encodeInput"]');
	await page.waitForSelector('[data-sub-state="idle"]');

	// Click GO_TO_NEXT_STEP button
	await nextStepButton.click();
	// Verify machine state transitioned to encodeInput-encodeByte after event GO_TO_NEXT_STEP
	await page.waitForSelector('[data-sub-state="encodeByte"]');

	// Click GO_TO_NEXT_STEP button
	await nextStepButton.click();
	// Verify machine state transitioned to encodeInput-encodeByte after event GO_TO_NEXT_STEP
	await page.waitForSelector('[data-sub-state="encodeByte"]');

	// Click GO_TO_NEXT_STEP button
	await nextStepButton.click();
	// Verify machine state transitioned to encodeInput-encodeByte after event GO_TO_NEXT_STEP
	await page.waitForSelector('[data-sub-state="encodeByte"]');

	// Click GO_TO_NEXT_STEP button
	await nextStepButton.click();
	// Verify machine state transitioned to encodeInput-encodeByte after event GO_TO_NEXT_STEP
	await page.waitForSelector('[data-sub-state="encodeByte"]');

	// Click GO_TO_NEXT_STEP button
	await nextStepButton.click();
	// Verify machine state transitioned to encodeInput-explainByteMapping after event GO_TO_NEXT_STEP
	await page.waitForSelector('[data-sub-state="explainByteMapping"]');

	// Click GO_TO_NEXT_STEP button
	await nextStepButton.click();
	// Verify machine state transitioned to createInputChunks-regularIdle after event GO_TO_NEXT_STEP
	await page.waitForSelector('[data-state="createInputChunks"]');
	await page.waitForSelector('[data-sub-state="regularIdle"]');

	// Click GO_TO_NEXT_STEP button
	await nextStepButton.click();
	// Verify machine state transitioned to createInputChunks-createInputChunk after event GO_TO_NEXT_STEP
	await page.waitForSelector('[data-sub-state="createInputChunk"]');

	// Click GO_TO_NEXT_STEP button
	await nextStepButton.click();
	// Verify machine state transitioned to createInputChunks-explainLastPaddedChunk after event GO_TO_NEXT_STEP
	await page.waitForSelector('[data-sub-state="explainLastPaddedChunk"]');

	// Click GO_TO_NEXT_STEP button
	await nextStepButton.click();
	// Verify machine state transitioned to createInputChunks-createLastPaddedChunk after event GO_TO_NEXT_STEP
	await page.waitForSelector('[data-sub-state="createLastPaddedChunk"]');

	// Click GO_TO_NEXT_STEP button
	await nextStepButton.click();
	// Verify machine state transitioned to createOutputChunks-regularIdle after event GO_TO_NEXT_STEP
	await page.waitForSelector('[data-state="createOutputChunks"]');
	await page.waitForSelector('[data-sub-state="regularIdle"]');

	// Click GO_TO_NEXT_STEP button
	await nextStepButton.click();
	// Verify machine state transitioned to createOutputChunks-createOutputChunk after event GO_TO_NEXT_STEP
	await page.waitForSelector('[data-sub-state="createOutputChunk"]');

	// Click GO_TO_NEXT_STEP button
	await nextStepButton.click();
	// Verify machine state transitioned to createOutputChunks-explainLastPaddedChunk after event GO_TO_NEXT_STEP
	await page.waitForSelector('[data-sub-state="explainLastPaddedChunk"]');

	// Click GO_TO_NEXT_STEP button
	await nextStepButton.click();
	// Verify machine state transitioned to createOutputChunks-explainPadCharacter after event GO_TO_NEXT_STEP
	await page.waitForSelector('[data-sub-state="explainPadCharacter"]');

	// Click GO_TO_NEXT_STEP button
	await nextStepButton.click();
	// Verify machine state transitioned to createOutputChunks-createLastPaddedChunk after event GO_TO_NEXT_STEP
	await page.waitForSelector('[data-sub-state="createLastPaddedChunk"]');

	// Click GO_TO_NEXT_STEP button
	await nextStepButton.click();
	// Verify machine state transitioned to encodeOutput-idle after event GO_TO_NEXT_STEP
	await page.waitForSelector('[data-state="encodeOutput"]');
	await page.waitForSelector('[data-sub-state="idle"]');

	// Click GO_TO_NEXT_STEP button
	await nextStepButton.click();
	// Verify machine state transitioned to encodeOutput-encodeBase64 after event GO_TO_NEXT_STEP
	await page.waitForSelector('[data-sub-state="encodeBase64"]');

	// Click GO_TO_NEXT_STEP button
	await nextStepButton.click();
	// Verify machine state transitioned to encodeOutput-encodeBase64 after event GO_TO_NEXT_STEP
	await page.waitForSelector('[data-sub-state="encodeBase64"]');

	// Click GO_TO_NEXT_STEP button
	await nextStepButton.click();
	// Verify machine state transitioned to encodeOutput-encodeBase64 after event GO_TO_NEXT_STEP
	await page.waitForSelector('[data-sub-state="encodeBase64"]');

	// Click GO_TO_NEXT_STEP button
	await nextStepButton.click();
	// Verify machine state transitioned to encodeOutput-encodeBase64 after event GO_TO_NEXT_STEP
	await page.waitForSelector('[data-sub-state="encodeBase64"]');

	// Click GO_TO_NEXT_STEP button
	await nextStepButton.click();
	// Verify machine state transitioned to encodeOutput-encodeBase64 after event GO_TO_NEXT_STEP
	await page.waitForSelector('[data-sub-state="encodeBase64"]');

	// Click GO_TO_NEXT_STEP button
	await nextStepButton.click();
	// Verify machine state transitioned to encodeOutput-encodeBase64 after event GO_TO_NEXT_STEP
	await page.waitForSelector('[data-sub-state="encodeBase64"]');

	// Click GO_TO_NEXT_STEP button
	await nextStepButton.click();
	// Verify machine state transitioned to encodeOutput-encodeBase64 after event GO_TO_NEXT_STEP
	await page.waitForSelector('[data-sub-state="encodeBase64"]');

	// Click GO_TO_NEXT_STEP button
	await nextStepButton.click();
	// Verify machine state transitioned to encodeOutput-encodeBase64 after event GO_TO_NEXT_STEP
	await page.waitForSelector('[data-sub-state="encodeBase64"]');

	// Click GO_TO_NEXT_STEP button
	await nextStepButton.click();
	// Verify machine state transitioned to finished after event GO_TO_NEXT_STEP
	await page.waitForSelector('[data-state="finished"]');
	await page.waitForSelector('[data-sub-state="none"]');
};

const asciiHappyPathAutoplay = async (page: Page): Promise<void> => {
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

const asciiHappyPathSkipDemo = async (page: Page): Promise<void> => {
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

export type XStateTestPath = { description: string; test: (page: Page) => Promise<void> };
export const testPaths: XStateTestPath[] = [
	{ description: 'encode ascii text, execute all steps manually', test: asciiHappyPath },
	{ description: 'encode ascii text, execute all steps with autoplay', test: asciiHappyPathAutoplay },
	{ description: 'encode ascii text, skip demo', test: asciiHappyPathSkipDemo },
];
