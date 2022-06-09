import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

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
				testTimeout: 30_000,
				hookTimeout: 30_000,
			},
		},
	},
};

export default config;
