import type { JSDomTestCase, JSDomTestFunction } from '$lib/xstate/b64Encode.test/types';
import type { Screen } from '@testing-library/svelte';
import type { UserEvent } from '@testing-library/user-event/dist/types/setup';

const asciiHappyPath: JSDomTestFunction = async (
	screen: Screen,
	userEvent: UserEvent,
	expect: Vi.ExpectStatic,
): Promise<void> => {
	// Set the value of the input data text box: test
	const inputTextBox = await screen.findByTestId('input-text');
	await userEvent.type(inputTextBox, 'test');
	// Change input encoding setting to ASCII
	const stringEncodingMenu = await screen.findByTestId('select-string-encoding-open-list-button');
	await userEvent.click(stringEncodingMenu);
	const asciiEncodingMenuItem = await screen.findByTestId('select-string-encoding-option-1');
	await userEvent.click(asciiEncodingMenuItem);
	// Change output encoding setting to base64url
	const base64EncodingMenu = await screen.findByTestId('select-base64-encoding-open-list-button');
	await userEvent.click(base64EncodingMenu);
	const base64urlEncodingMenuItem = await screen.findByTestId('select-base64-encoding-option-2');
	await userEvent.click(base64urlEncodingMenuItem);

	// Click GO_TO_NEXT_STEP button
	const nextStepButton = await screen.findByTestId('next-step-button');
	await userEvent.click(nextStepButton);
	// Verify transition to state: validateInputText-success after event VALIDATE_TEXT
	let domReflectsCurrentState = document.querySelector('[data-state="validateInputText"][data-sub-state="success"]');
	expect(domReflectsCurrentState).toBeTruthy();
	const demoText = await screen.findByTestId('demo-text');
	let expectedTextForState = `Nicely done! The value you provided looks, smells and tastes like a valid`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Click GO_TO_NEXT_STEP button
	await userEvent.click(nextStepButton);
	// Verify transition to state: encodeInput-idle after event GO_TO_NEXT_STEP
	domReflectsCurrentState = document.querySelector('[data-state="encodeInput"][data-sub-state="idle"]');
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `The first step in the Base64 encoding process is to convert the input data to binary`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Click GO_TO_NEXT_STEP button
	await userEvent.click(nextStepButton);
	// Verify transition to state: encodeInput-encodeByte after event GO_TO_NEXT_STEP
	domReflectsCurrentState = document.querySelector('[data-state="encodeInput"][data-sub-state="encodeByte"]');
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `, which has binary value`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Click GO_TO_NEXT_STEP button
	await userEvent.click(nextStepButton);
	// Verify transition to state: encodeInput-encodeByte after event GO_TO_NEXT_STEP
	domReflectsCurrentState = document.querySelector('[data-state="encodeInput"][data-sub-state="encodeByte"]');
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `, which has binary value`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Click GO_TO_NEXT_STEP button
	await userEvent.click(nextStepButton);
	// Verify transition to state: encodeInput-encodeByte after event GO_TO_NEXT_STEP
	domReflectsCurrentState = document.querySelector('[data-state="encodeInput"][data-sub-state="encodeByte"]');
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `, which has binary value`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Click GO_TO_NEXT_STEP button
	await userEvent.click(nextStepButton);
	// Verify transition to state: encodeInput-encodeByte after event GO_TO_NEXT_STEP
	domReflectsCurrentState = document.querySelector('[data-state="encodeInput"][data-sub-state="encodeByte"]');
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `, which has binary value`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Click GO_TO_NEXT_STEP button
	await userEvent.click(nextStepButton);
	// Verify transition to state: encodeInput-explainByteMapping after event GO_TO_NEXT_STEP
	domReflectsCurrentState = document.querySelector('[data-state="encodeInput"][data-sub-state="explainByteMapping"]');
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `the input data has been converted to a sequence of 8-bit bytes.`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Click GO_TO_NEXT_STEP button
	await userEvent.click(nextStepButton);
	// Verify transition to state: createInputChunks-regularIdle after event GO_TO_NEXT_STEP
	domReflectsCurrentState = document.querySelector('[data-state="createInputChunks"][data-sub-state="regularIdle"]');
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `Three 8-bit bytes of input data (3x8 = 24 bits) can be represented by four 6-bit Base64 digits (4x6 = 24 bits).`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Click GO_TO_NEXT_STEP button
	await userEvent.click(nextStepButton);
	// Verify transition to state: createInputChunks-createInputChunk after event GO_TO_NEXT_STEP
	domReflectsCurrentState = document.querySelector(
		'[data-state="createInputChunks"][data-sub-state="createInputChunk"]',
	);
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = ` chunk (`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Click GO_TO_NEXT_STEP button
	await userEvent.click(nextStepButton);
	// Verify transition to state: createInputChunks-explainLastPaddedChunk after event GO_TO_NEXT_STEP
	domReflectsCurrentState = document.querySelector(
		'[data-state="createInputChunks"][data-sub-state="explainLastPaddedChunk"]',
	);
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `The chunk size of 24-bits was chosen because it is divisible by 6`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Click GO_TO_NEXT_STEP button
	await userEvent.click(nextStepButton);
	// Verify transition to state: createInputChunks-createLastPaddedChunk after event GO_TO_NEXT_STEP
	domReflectsCurrentState = document.querySelector(
		'[data-state="createInputChunks"][data-sub-state="createLastPaddedChunk"]',
	);
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = ` and final chunk (`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Click GO_TO_NEXT_STEP button
	await userEvent.click(nextStepButton);
	// Verify transition to state: createOutputChunks-regularIdle after event GO_TO_NEXT_STEP
	domReflectsCurrentState = document.querySelector('[data-state="createOutputChunks"][data-sub-state="regularIdle"]');
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `Next, for each chunk of input data with three 8-bit bytes`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Click GO_TO_NEXT_STEP button
	await userEvent.click(nextStepButton);
	// Verify transition to state: createOutputChunks-createOutputChunk after event GO_TO_NEXT_STEP
	domReflectsCurrentState = document.querySelector(
		'[data-state="createOutputChunks"][data-sub-state="createOutputChunk"]',
	);
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = ` bits in this chunk are taken from `;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Click GO_TO_NEXT_STEP button
	await userEvent.click(nextStepButton);
	// Verify transition to state: createOutputChunks-explainLastPaddedChunk after event GO_TO_NEXT_STEP
	domReflectsCurrentState = document.querySelector(
		'[data-state="createOutputChunks"][data-sub-state="explainLastPaddedChunk"]',
	);
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `Since the final input chunk only contains `;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Click GO_TO_NEXT_STEP button
	await userEvent.click(nextStepButton);
	// Verify transition to state: createOutputChunks-explainPadCharacter after event GO_TO_NEXT_STEP
	domReflectsCurrentState = document.querySelector(
		'[data-state="createOutputChunks"][data-sub-state="explainPadCharacter"]',
	);
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `For various reasons, it is considered best practice to always structure Base64 data in groups of four digits.`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Click GO_TO_NEXT_STEP button
	await userEvent.click(nextStepButton);
	// Verify transition to state: createOutputChunks-createLastPaddedChunk after event GO_TO_NEXT_STEP
	domReflectsCurrentState = document.querySelector(
		'[data-state="createOutputChunks"][data-sub-state="createLastPaddedChunk"]',
	);
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = ` bits in this chunk are taken from `;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Click GO_TO_NEXT_STEP button
	await userEvent.click(nextStepButton);
	// Verify transition to state: encodeOutput-idle after event GO_TO_NEXT_STEP
	domReflectsCurrentState = document.querySelector('[data-state="encodeOutput"][data-sub-state="idle"]');
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `The final step is to convert each 6-bit value to the corresponding Base64 digit.`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Click GO_TO_NEXT_STEP button
	await userEvent.click(nextStepButton);
	// Verify transition to state: encodeOutput-encodeBase64 after event GO_TO_NEXT_STEP
	domReflectsCurrentState = document.querySelector('[data-state="encodeOutput"][data-sub-state="encodeBase64"]');
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `Base64 digit`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Click GO_TO_NEXT_STEP button
	await userEvent.click(nextStepButton);
	// Verify transition to state: encodeOutput-encodeBase64 after event GO_TO_NEXT_STEP
	domReflectsCurrentState = document.querySelector('[data-state="encodeOutput"][data-sub-state="encodeBase64"]');
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `Base64 digit`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Click GO_TO_NEXT_STEP button
	await userEvent.click(nextStepButton);
	// Verify transition to state: encodeOutput-encodeBase64 after event GO_TO_NEXT_STEP
	domReflectsCurrentState = document.querySelector('[data-state="encodeOutput"][data-sub-state="encodeBase64"]');
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `Base64 digit`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Click GO_TO_NEXT_STEP button
	await userEvent.click(nextStepButton);
	// Verify transition to state: encodeOutput-encodeBase64 after event GO_TO_NEXT_STEP
	domReflectsCurrentState = document.querySelector('[data-state="encodeOutput"][data-sub-state="encodeBase64"]');
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `Base64 digit`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Click GO_TO_NEXT_STEP button
	await userEvent.click(nextStepButton);
	// Verify transition to state: encodeOutput-encodeBase64 after event GO_TO_NEXT_STEP
	domReflectsCurrentState = document.querySelector('[data-state="encodeOutput"][data-sub-state="encodeBase64"]');
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `Base64 digit`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Click GO_TO_NEXT_STEP button
	await userEvent.click(nextStepButton);
	// Verify transition to state: encodeOutput-encodeBase64 after event GO_TO_NEXT_STEP
	domReflectsCurrentState = document.querySelector('[data-state="encodeOutput"][data-sub-state="encodeBase64"]');
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `Base64 digit`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Click GO_TO_NEXT_STEP button
	await userEvent.click(nextStepButton);
	// Verify transition to state: encodeOutput-encodeBase64 after event GO_TO_NEXT_STEP
	domReflectsCurrentState = document.querySelector('[data-state="encodeOutput"][data-sub-state="encodeBase64"]');
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `Base64 digit`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Click GO_TO_NEXT_STEP button
	await userEvent.click(nextStepButton);
	// Verify transition to state: encodeOutput-encodeBase64 after event GO_TO_NEXT_STEP
	domReflectsCurrentState = document.querySelector('[data-state="encodeOutput"][data-sub-state="encodeBase64"]');
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `Base64 digit`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Click GO_TO_NEXT_STEP button
	await userEvent.click(nextStepButton);
	// Verify transition to state: finished after event GO_TO_NEXT_STEP
	domReflectsCurrentState = document.querySelector('[data-state="finished"][data-sub-state="none"]');
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `The encoding process is complete!`;
	expect(demoText.innerHTML).toContain(expectedTextForState);
};

const asciiHappyPathAutoplay = async (screen: Screen, userEvent: UserEvent, expect: Vi.ExpectStatic): Promise<void> => {
	// Set the value of the input data text box: test
	const inputTextBox = await screen.findByTestId('input-text');
	await userEvent.type(inputTextBox, 'test');
	// Change input encoding setting to ASCII
	const stringEncodingMenu = await screen.findByTestId('select-string-encoding-open-list-button');
	await userEvent.click(stringEncodingMenu);
	const asciiEncodingMenuItem = await screen.findByTestId('select-string-encoding-option-1');
	await userEvent.click(asciiEncodingMenuItem);
	// Change output encoding setting to base64url
	const base64EncodingMenu = await screen.findByTestId('select-base64-encoding-open-list-button');
	await userEvent.click(base64EncodingMenu);
	const base64urlEncodingMenuItem = await screen.findByTestId('select-base64-encoding-option-2');
	await userEvent.click(base64urlEncodingMenuItem);

	// Click RESUME_AUTO_PLAY button
	const startAutoplayButton = await screen.findByTestId('start-autoplay-button');
	await userEvent.click(startAutoplayButton);
	// Verify transition to state: validateInputText-success after event START_AUTOPLAY
	let domReflectsCurrentState = document.querySelector('[data-state="validateInputText"][data-sub-state="success"]');
	expect(domReflectsCurrentState).toBeTruthy();
	const demoText = await screen.findByTestId('demo-text');
	let expectedTextForState = `Nicely done! The value you provided looks, smells and tastes like a valid`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Verify machine automatically transitions to next state: encodeInput-idle
	await new Promise((r) => setTimeout(r, 1100));
	domReflectsCurrentState = document.querySelector('[data-state="encodeInput"][data-sub-state="idle"]');
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `The first step in the Base64 encoding process is to convert the input data to binary`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Verify machine automatically transitions to next state: encodeInput-autoPlayEncodeByte
	await new Promise((r) => setTimeout(r, 1100));
	domReflectsCurrentState = document.querySelector('[data-state="encodeInput"][data-sub-state="autoPlayEncodeByte"]');
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `, which has binary value`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Verify machine automatically transitions to next state: encodeInput-autoPlayEncodeByte
	await new Promise((r) => setTimeout(r, 1100));
	domReflectsCurrentState = document.querySelector('[data-state="encodeInput"][data-sub-state="autoPlayEncodeByte"]');
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `, which has binary value`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Verify machine automatically transitions to next state: encodeInput-autoPlayEncodeByte
	await new Promise((r) => setTimeout(r, 1100));
	domReflectsCurrentState = document.querySelector('[data-state="encodeInput"][data-sub-state="autoPlayEncodeByte"]');
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `, which has binary value`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Verify machine automatically transitions to next state: encodeInput-autoPlayEncodeByte
	await new Promise((r) => setTimeout(r, 1100));
	domReflectsCurrentState = document.querySelector('[data-state="encodeInput"][data-sub-state="autoPlayEncodeByte"]');
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `, which has binary value`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Verify machine automatically transitions to next state: encodeInput-explainByteMapping
	await new Promise((r) => setTimeout(r, 1100));
	domReflectsCurrentState = document.querySelector('[data-state="encodeInput"][data-sub-state="explainByteMapping"]');
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `the input data has been converted to a sequence of 8-bit bytes.`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Verify machine automatically transitions to next state: createInputChunks-autoPlayIdle
	await new Promise((r) => setTimeout(r, 1100));
	domReflectsCurrentState = document.querySelector('[data-state="createInputChunks"][data-sub-state="autoPlayIdle"]');
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `Three 8-bit bytes of input data (3x8 = 24 bits) can be represented by four 6-bit Base64 digits (4x6 = 24 bits).`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Verify machine automatically transitions to next state: createInputChunks-autoPlayCreateInputChunk
	await new Promise((r) => setTimeout(r, 1100));
	domReflectsCurrentState = document.querySelector(
		'[data-state="createInputChunks"][data-sub-state="autoPlayCreateInputChunk"]',
	);
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = ` chunk (`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Verify machine automatically transitions to next state: createInputChunks-explainLastPaddedChunk
	await new Promise((r) => setTimeout(r, 1100));
	domReflectsCurrentState = document.querySelector(
		'[data-state="createInputChunks"][data-sub-state="explainLastPaddedChunk"]',
	);
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `The chunk size of 24-bits was chosen because it is divisible by 6`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Verify machine automatically transitions to next state: createInputChunks-createLastPaddedChunk
	await new Promise((r) => setTimeout(r, 200));
	domReflectsCurrentState = document.querySelector(
		'[data-state="createInputChunks"][data-sub-state="createLastPaddedChunk"]',
	);
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = ` and final chunk (`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Verify machine automatically transitions to next state: createOutputChunks-autoPlayIdle
	await new Promise((r) => setTimeout(r, 1100));
	domReflectsCurrentState = document.querySelector('[data-state="createOutputChunks"][data-sub-state="autoPlayIdle"]');
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `Next, for each chunk of input data with three 8-bit bytes`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Verify machine automatically transitions to next state: createOutputChunks-autoPlayCreateOutputChunk
	await new Promise((r) => setTimeout(r, 1100));
	domReflectsCurrentState = document.querySelector(
		'[data-state="createOutputChunks"][data-sub-state="autoPlayCreateOutputChunk"]',
	);
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = ` bits in this chunk are taken from `;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Verify machine automatically transitions to next state: createOutputChunks-explainLastPaddedChunk
	await new Promise((r) => setTimeout(r, 1100));
	domReflectsCurrentState = document.querySelector(
		'[data-state="createOutputChunks"][data-sub-state="explainLastPaddedChunk"]',
	);
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `Since the final input chunk only contains `;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Verify machine automatically transitions to next state: createOutputChunks-explainPadCharacter
	await new Promise((r) => setTimeout(r, 1100));
	domReflectsCurrentState = document.querySelector(
		'[data-state="createOutputChunks"][data-sub-state="explainPadCharacter"]',
	);
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `For various reasons, it is considered best practice to always structure Base64 data in groups of four digits.`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Verify machine automatically transitions to next state: createOutputChunks-createLastPaddedChunk
	await new Promise((r) => setTimeout(r, 1100));
	domReflectsCurrentState = document.querySelector(
		'[data-state="createOutputChunks"][data-sub-state="createLastPaddedChunk"]',
	);
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = ` bits in this chunk are taken from `;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Verify machine automatically transitions to next state: encodeOutput-idle
	await new Promise((r) => setTimeout(r, 1100));
	domReflectsCurrentState = document.querySelector('[data-state="encodeOutput"][data-sub-state="idle"]');
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `The final step is to convert each 6-bit value to the corresponding Base64 digit.`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Verify machine automatically transitions to next state: encodeOutput-autoPlayEncodeBase64
	await new Promise((r) => setTimeout(r, 1100));
	domReflectsCurrentState = document.querySelector(
		'[data-state="encodeOutput"][data-sub-state="autoPlayEncodeBase64"]',
	);
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `Base64 digit`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Verify machine automatically transitions to next state: encodeOutput-autoPlayEncodeBase64
	await new Promise((r) => setTimeout(r, 1100));
	domReflectsCurrentState = document.querySelector(
		'[data-state="encodeOutput"][data-sub-state="autoPlayEncodeBase64"]',
	);
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `Base64 digit`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Verify machine automatically transitions to next state: encodeOutput-autoPlayEncodeBase64
	await new Promise((r) => setTimeout(r, 1100));
	domReflectsCurrentState = document.querySelector(
		'[data-state="encodeOutput"][data-sub-state="autoPlayEncodeBase64"]',
	);
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `Base64 digit`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Verify machine automatically transitions to next state: encodeOutput-autoPlayEncodeBase64
	await new Promise((r) => setTimeout(r, 1100));
	domReflectsCurrentState = document.querySelector(
		'[data-state="encodeOutput"][data-sub-state="autoPlayEncodeBase64"]',
	);
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `Base64 digit`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Verify machine automatically transitions to next state: encodeOutput-autoPlayEncodeBase64
	await new Promise((r) => setTimeout(r, 1100));
	domReflectsCurrentState = document.querySelector(
		'[data-state="encodeOutput"][data-sub-state="autoPlayEncodeBase64"]',
	);
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `Base64 digit`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Verify machine automatically transitions to next state: encodeOutput-autoPlayEncodeBase64
	await new Promise((r) => setTimeout(r, 1100));
	domReflectsCurrentState = document.querySelector(
		'[data-state="encodeOutput"][data-sub-state="autoPlayEncodeBase64"]',
	);
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `Base64 digit`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Verify machine automatically transitions to next state: encodeOutput-autoPlayEncodeBase64
	await new Promise((r) => setTimeout(r, 1100));
	domReflectsCurrentState = document.querySelector(
		'[data-state="encodeOutput"][data-sub-state="autoPlayEncodeBase64"]',
	);
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `Base64 digit`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Verify machine automatically transitions to next state: encodeOutput-encodeLastBase64
	await new Promise((r) => setTimeout(r, 100));
	domReflectsCurrentState = document.querySelector(
		'[data-state="encodeOutput"][data-sub-state="autoPlayEncodeBase64"]',
	);
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `Base64 digit`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Verify machine automatically transitions to next state: finished
	await new Promise((r) => setTimeout(r, 1100));
	domReflectsCurrentState = document.querySelector('[data-state="finished"][data-sub-state="none"]');
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `The encoding process is complete!`;
	expect(demoText.innerHTML).toContain(expectedTextForState);
};

const asciiHappyPathSkipDemo = async (screen: Screen, userEvent: UserEvent, expect: Vi.ExpectStatic): Promise<void> => {
	// Set the value of the input data text box: test
	const inputTextBox = await screen.findByTestId('input-text');
	await userEvent.type(inputTextBox, 'test');
	// Change input encoding setting to ASCII
	const stringEncodingMenu = await screen.findByTestId('select-string-encoding-open-list-button');
	await userEvent.click(stringEncodingMenu);
	const asciiEncodingMenuItem = await screen.findByTestId('select-string-encoding-option-1');
	await userEvent.click(asciiEncodingMenuItem);
	// Change output encoding setting to base64url
	const base64EncodingMenu = await screen.findByTestId('select-base64-encoding-open-list-button');
	await userEvent.click(base64EncodingMenu);
	const base64urlEncodingMenuItem = await screen.findByTestId('select-base64-encoding-option-2');
	await userEvent.click(base64urlEncodingMenuItem);

	// Click GO_TO_LAST_STEP button
	const lastStepButton = await screen.findByTestId('last-step-button');
	await userEvent.click(lastStepButton);
	// Verify transition to state: finished after event SKIP_DEMO
	const domReflectsCurrentState = document.querySelector('[data-state="finished"][data-sub-state="none"]');
	expect(domReflectsCurrentState).toBeTruthy();
	const demoText = await screen.findByTestId('demo-text');
	const expectedTextForState = `The encoding process is complete!`;
	expect(demoText.innerHTML).toContain(expectedTextForState);
};

const asciiValidationError = async (screen: Screen, userEvent: UserEvent, expect: Vi.ExpectStatic): Promise<void> => {
	// Change input encoding setting to ASCII
	const stringEncodingMenu = await screen.findByTestId('select-string-encoding-open-list-button');
	await userEvent.click(stringEncodingMenu);
	const asciiEncodingMenuItem = await screen.findByTestId('select-string-encoding-option-1');
	await userEvent.click(asciiEncodingMenuItem);
	// Change output encoding setting to base64url
	const base64EncodingMenu = await screen.findByTestId('select-base64-encoding-open-list-button');
	await userEvent.click(base64EncodingMenu);
	const base64urlEncodingMenuItem = await screen.findByTestId('select-base64-encoding-option-2');
	await userEvent.click(base64urlEncodingMenuItem);

	// Click RESUME_AUTO_PLAY button
	const startAutoplayButton = await screen.findByTestId('start-autoplay-button');
	await userEvent.click(startAutoplayButton);
	// Verify transition to state: validateInputText-error after event START_AUTOPLAY
	let domReflectsCurrentState = document.querySelector('[data-state="validateInputText"][data-sub-state="error"]');
	expect(domReflectsCurrentState).toBeTruthy();
	// Wait for state machine to transition back to 'inactive' state
	await new Promise((r) => setTimeout(r, 1100));
	domReflectsCurrentState = document.querySelector('[data-state="inactive"][data-sub-state="none"]');
	expect(domReflectsCurrentState).toBeTruthy();

	// Set the value of the input data text box: do§
	const inputTextBox = await screen.findByTestId('input-text');
	await userEvent.type(inputTextBox, 'do§');
	// Change input encoding setting to ASCII
	await userEvent.click(stringEncodingMenu);
	await userEvent.click(asciiEncodingMenuItem);
	// Change output encoding setting to base64url
	await userEvent.click(base64EncodingMenu);
	await userEvent.click(base64urlEncodingMenuItem);

	// Click GO_TO_LAST_STEP button
	const lastStepButton = await screen.findByTestId('last-step-button');
	await userEvent.click(lastStepButton);
	// Verify transition to state: validateInputText-error after event SKIP_DEMO
	domReflectsCurrentState = document.querySelector('[data-state="validateInputText"][data-sub-state="error"]');
	expect(domReflectsCurrentState).toBeTruthy();
	// Wait for state machine to transition back to 'inactive' state
	await new Promise((r) => setTimeout(r, 1100));
	domReflectsCurrentState = document.querySelector('[data-state="inactive"][data-sub-state="none"]');
	expect(domReflectsCurrentState).toBeTruthy();

	// Set the value of the input data text box: dog
	await userEvent.clear(inputTextBox);
	await userEvent.type(inputTextBox, 'dog');
	// Change input encoding setting to ASCII
	await userEvent.click(stringEncodingMenu);
	await userEvent.click(asciiEncodingMenuItem);
	// Change output encoding setting to base64url
	await userEvent.click(base64EncodingMenu);
	await userEvent.click(base64urlEncodingMenuItem);

	// Click GO_TO_NEXT_STEP button
	const nextStepButton = await screen.findByTestId('next-step-button');
	await userEvent.click(nextStepButton);
	// Verify transition to state: validateInputText-success after event VALIDATE_TEXT
	domReflectsCurrentState = document.querySelector('[data-state="validateInputText"][data-sub-state="success"]');
	expect(domReflectsCurrentState).toBeTruthy();
	const demoText = await screen.findByTestId('demo-text');
	let expectedTextForState = `Nicely done! The value you provided looks, smells and tastes like a valid`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Click GO_TO_NEXT_STEP button
	await userEvent.click(nextStepButton);
	// Verify transition to state: encodeInput-idle after event GO_TO_NEXT_STEP
	domReflectsCurrentState = document.querySelector('[data-state="encodeInput"][data-sub-state="idle"]');
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `The first step in the Base64 encoding process is to convert the input data to binary`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Click GO_TO_NEXT_STEP button
	await userEvent.click(nextStepButton);
	// Verify transition to state: encodeInput-encodeByte after event GO_TO_NEXT_STEP
	domReflectsCurrentState = document.querySelector('[data-state="encodeInput"][data-sub-state="encodeByte"]');
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `, which has binary value`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Click GO_TO_NEXT_STEP button
	await userEvent.click(nextStepButton);
	// Verify transition to state: encodeInput-encodeByte after event GO_TO_NEXT_STEP
	domReflectsCurrentState = document.querySelector('[data-state="encodeInput"][data-sub-state="encodeByte"]');
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `, which has binary value`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Click GO_TO_NEXT_STEP button
	await userEvent.click(nextStepButton);
	// Verify transition to state: encodeInput-encodeByte after event GO_TO_NEXT_STEP
	domReflectsCurrentState = document.querySelector('[data-state="encodeInput"][data-sub-state="encodeByte"]');
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `, which has binary value`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Click GO_TO_NEXT_STEP button
	await userEvent.click(nextStepButton);
	// Verify transition to state: encodeInput-explainByteMapping after event GO_TO_NEXT_STEP
	domReflectsCurrentState = document.querySelector('[data-state="encodeInput"][data-sub-state="explainByteMapping"]');
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `the input data has been converted to a sequence of 8-bit bytes.`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Click GO_TO_NEXT_STEP button
	await userEvent.click(nextStepButton);
	// Verify transition to state: createInputChunks-regularIdle after event GO_TO_NEXT_STEP
	domReflectsCurrentState = document.querySelector('[data-state="createInputChunks"][data-sub-state="regularIdle"]');
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `Three 8-bit bytes of input data (3x8 = 24 bits) can be represented by four 6-bit Base64 digits (4x6 = 24 bits).`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Click GO_TO_NEXT_STEP button
	await userEvent.click(nextStepButton);
	// Verify transition to state: createInputChunks-createInputChunk after event GO_TO_NEXT_STEP
	domReflectsCurrentState = document.querySelector(
		'[data-state="createInputChunks"][data-sub-state="createInputChunk"]',
	);
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = ` chunk (`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Click GO_TO_NEXT_STEP button
	await userEvent.click(nextStepButton);
	// Verify transition to state: createOutputChunks-regularIdle after event GO_TO_NEXT_STEP
	domReflectsCurrentState = document.querySelector('[data-state="createOutputChunks"][data-sub-state="regularIdle"]');
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `Next, for each chunk of input data with three 8-bit bytes`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Click GO_TO_NEXT_STEP button
	await userEvent.click(nextStepButton);
	// Verify transition to state: createOutputChunks-createOutputChunk after event GO_TO_NEXT_STEP
	domReflectsCurrentState = document.querySelector(
		'[data-state="createOutputChunks"][data-sub-state="createOutputChunk"]',
	);
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = ` bits in this chunk are taken from `;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Click GO_TO_NEXT_STEP button
	await userEvent.click(nextStepButton);
	// Verify transition to state: encodeOutput-idle after event GO_TO_NEXT_STEP
	domReflectsCurrentState = document.querySelector('[data-state="encodeOutput"][data-sub-state="idle"]');
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `The final step is to convert each 6-bit value to the corresponding Base64 digit.`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Click GO_TO_NEXT_STEP button
	await userEvent.click(nextStepButton);
	// Verify transition to state: encodeOutput-encodeBase64 after event GO_TO_NEXT_STEP
	domReflectsCurrentState = document.querySelector('[data-state="encodeOutput"][data-sub-state="encodeBase64"]');
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `Base64 digit`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Click GO_TO_NEXT_STEP button
	await userEvent.click(nextStepButton);
	// Verify transition to state: encodeOutput-encodeBase64 after event GO_TO_NEXT_STEP
	domReflectsCurrentState = document.querySelector('[data-state="encodeOutput"][data-sub-state="encodeBase64"]');
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `Base64 digit`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Click GO_TO_NEXT_STEP button
	await userEvent.click(nextStepButton);
	// Verify transition to state: encodeOutput-encodeBase64 after event GO_TO_NEXT_STEP
	domReflectsCurrentState = document.querySelector('[data-state="encodeOutput"][data-sub-state="encodeBase64"]');
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `Base64 digit`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Click GO_TO_NEXT_STEP button
	await userEvent.click(nextStepButton);
	// Verify transition to state: encodeOutput-encodeBase64 after event GO_TO_NEXT_STEP
	domReflectsCurrentState = document.querySelector('[data-state="encodeOutput"][data-sub-state="encodeBase64"]');
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `Base64 digit`;
	expect(demoText.innerHTML).toContain(expectedTextForState);

	// Click GO_TO_NEXT_STEP button
	await userEvent.click(nextStepButton);
	// Verify transition to state: finished after event GO_TO_NEXT_STEP
	domReflectsCurrentState = document.querySelector('[data-state="finished"][data-sub-state="none"]');
	expect(domReflectsCurrentState).toBeTruthy();
	expectedTextForState = `The encoding process is complete!`;
	expect(demoText.innerHTML).toContain(expectedTextForState);
};

export const testPaths: JSDomTestCase[] = [
	{ description: 'encode ascii text, execute all steps manually', testFunction: asciiHappyPath },
	{ description: 'encode ascii text, execute all steps with autoplay', testFunction: asciiHappyPathAutoplay },
	{ description: 'encode ascii text, skip demo', testFunction: asciiHappyPathSkipDemo },
	{ description: 'encode ascii text, validation error', testFunction: asciiValidationError },
];
