/// <reference types="vitest" />
import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import { configDefaults } from 'vitest/config';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		preprocess({
			postcss: true,
		}),
	],

	kit: {
		prerender: {
			default: true,
		},
		adapter: adapter(),

		vite: {
			ssr: {
				noExternal: [],
			},
			optimizeDeps: {},
			test: {
				globals: false,
				environment: 'jsdom',
				moduleNameMapper: {
					'^\\$lib(.*)$': '<rootDir>/src/lib$1',
					'^\\$app(.*)$': ['<rootDir>/.svelte-kit/dev/runtime/app$1', '<rootDir>/.svelte-kit/build/runtime/app$1'],
				},
				deps: {
					inline: ['xstate'],
				},
				coverage: {
					skipFull: true,
					exclude: [...configDefaults.exclude, '<rootDir>/src/lib/xstate/b64Encode.test/*'],
				},
				testTimeout: 30_000,
			},
		},
	},
};

export default config;
