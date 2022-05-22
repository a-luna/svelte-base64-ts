import adapter from '@sveltejs/adapter-static';
import path from 'path';
import preprocess from 'svelte-preprocess';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
			resolve: {
				alias: {
					'core-js/modules': path.resolve(
						__dirname,
						'..',
						'node_modules/core-js/modules'
					),
				}
			},
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
			},
		},
	},
};

export default config;
