module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: '2020',
		sourceType: 'module',
		tsconfigRootDir: __dirname,
		project: ['./tsconfig.eslint.json'],
		extraFileExtensions: ['.svelte'],
	},
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
	settings: {
		'svelte3/typescript': true,
	},
	overrides: [
		{
			files: ['*.svelte'],
			processor: 'svelte3/svelte3',
		},
		{
			files: ['*.ts'],
			rules: {
				'no-mixed-spaces-and-tabs': 'off',
			},
		},
	],
};
