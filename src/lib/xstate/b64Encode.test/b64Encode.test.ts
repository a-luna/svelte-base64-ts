import MainForm from '$lib/components/AlgorithmDemo/MainForm.svelte';
import { testPaths } from '$lib/xstate/b64Encode.test/testPaths';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, test } from 'vitest';

describe('base64 encoding demo', () => {
	testPaths.forEach(({ description, testFunction }) => {
		test(description, async ({ expect }) => {
			const { container } = render(MainForm);
			await testFunction(screen, userEvent.setup(), expect);
			container.firstChild?.remove();
		});
	});
});
