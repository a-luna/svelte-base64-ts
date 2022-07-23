/// <reference types="vitest" />
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
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
		hookTimeout: 30_000,
	},
});
