/* c8 ignore start */
import MainForm from '$lib/components/AlgorithmDemo/MainForm.svelte';
import { testPaths } from '$lib/xstate/b64Encode.test/testPaths';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, test } from 'vitest';

describe('base64 encoding demo', () => {
	let container: HTMLElement;

	afterEach(() => {
		container.firstChild?.remove();
		const mainForm = screen.queryByTestId('demo-form');
		expect(mainForm).toBeFalsy();
	});

	testPaths.forEach(({ description, testFunction }) => {
		test(description, async () => {
			({ container } = render(MainForm));
			await testFunction(screen, userEvent.setup(), expect);
		});
	});
});
/* c8 ignore stop */
