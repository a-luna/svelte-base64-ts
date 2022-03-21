module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
	],
	globals: {
		NodeJS: true,
	},
	plugins: ['svelte3', '@typescript-eslint'],
	ignorePatterns: ['*.cjs'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: '2020',
		sourceType: 'module',
		tsconfigRootDir: __dirname,
		project: ['./tsconfig.json'],
		extraFileExtensions: ['.svelte'],
	},
	settings: {
		'svelte3/typescript': () => require('typescript'),
	},
	overrides: [
		{ 
			files: ['*.svelte'], 
			rules: {
				"no-unsafe-argument": "off",
				"no-unsafe-member-access": "off",
				"no-inner-declarations": "off",
			},
			processor: 'svelte3/svelte3',
		}
	]
};
