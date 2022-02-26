import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		preprocess({
			postcss: true
		})
	],

	kit: {
		adapter: adapter(),

		vite: {
			ssr: {
				noExternal: []
			},
			optimizeDeps: {},
			test: {
				globals: false,
				environment: 'jsdom',
				moduleNameMapper: {
					'^\\$lib(.*)$': '<rootDir>/src/lib$1',
					'^\\$app(.*)$': ['<rootDir>/.svelte-kit/dev/runtime/app$1', '<rootDir>/.svelte-kit/build/runtime/app$1']
				}
			}
		}
	}
};

export default config;
