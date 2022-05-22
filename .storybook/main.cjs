const { resolve } = require('path');
const { svelte } = require('@sveltejs/vite-plugin-svelte');
const { typescript: svelteTS } = require('svelte-preprocess');

module.exports = {
	framework: '@storybook/svelte',
	stories: [resolve('src/lib/components/**/*.stories.@(ts|svelte)')],
	addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-svelte-csf'],
	core: {
		builder: '@storybook/builder-vite',
	},
	async viteFinal(config) {
		const { default: svelteConfig } = await import('../svelte.config.js');
		const viteConfig = svelteConfig.kit.vite;

		const svelteIndex = config.plugins.findIndex(
		({ name }) => name === 'vite-plugin-svelte'
		);

		config.plugins[svelteIndex] = svelte({
		preprocess: [svelteTS()],
		});

		// customize the Vite config here
		config.resolve.alias = viteConfig.resolve.alias;

		// return the customized config
		return config;
	},
};