/* c8 ignore start */
import MainForm from '$lib/components/AlgorithmDemo/MainForm.svelte';
import { testPaths } from '$lib/xstate/b64Encode.test/testPaths';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import type { Browser, Page } from 'puppeteer';
import puppeteer from 'puppeteer';
import { afterAll, beforeAll, describe, test } from 'vitest';
import { testPathsPuppeteer } from './testPathsPuppeteer';

describe('base64 encoding demo', () => {
	let container: HTMLElement;

	testPaths.forEach(({ description, testFunction }) => {
		test(description, async ({ expect }) => {
			({ container } = render(MainForm));
			await testFunction(screen, userEvent.setup(), expect);
			container.firstChild?.remove();
			const mainForm = screen.queryByTestId('demo-form');
			expect(mainForm).toBeFalsy();
		});
	});
});

describe('puppeteer tests', () => {
	let browser: Browser;
	let page: Page;

	beforeAll(async () => {
		browser = await puppeteer.launch({ headless: false });
		page = await browser.newPage();
	});

	afterAll(async () => {
		await browser.close();
	});

	testPathsPuppeteer.forEach(({ description, testFunction }) => {
		test(description, async ({ expect }) => {
			await testFunction(page, expect);
		});
	});
});
/* c8 ignore stop */
