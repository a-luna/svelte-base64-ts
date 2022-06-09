import { testPaths } from '$lib/xstate/testPaths';
import type { Browser, Page } from 'puppeteer';
import puppeteer from 'puppeteer';
import type { PreviewServer } from 'vite';
import { afterAll, beforeAll, describe, it } from 'vitest';

describe('base64 encoding demo', async () => {
	let server: PreviewServer;
	let browser: Browser;
	let page: Page;

	beforeAll(async () => {
		// server = await preview({ preview: { port: 3800 }, test: { testTimeout: 30_000 } });
		browser = await puppeteer.launch({ headless: false });
		page = await browser.newPage();
	});

	afterAll(async () => {
		await browser.close();
		// await new Promise<void>((resolve, reject) => {
		// 	server.httpServer.close((error) => (error ? reject(error) : resolve()));
		// });
	});

	testPaths.forEach(({ description, test }) => {
		it(description, async () => {
			await test(page);
		});
	});
});
