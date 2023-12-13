/** @type {import('eslint').Linter.Config} */
module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'next/core-web-vitals',
		'plugin:eslint-plugin-next-on-pages/recommended',
		'plugin:prettier/recommended',
	],
	plugins: ['eslint-plugin-next-on-pages', 'only-warn'],
	rules: {
		'no-unused-vars': [
			'warn',
			{
				varsIgnorePattern: '^_',
				argsIgnorePattern: '^_',
				caughtErrorsIgnorePattern: '^_',
			},
		],
		'prettier/prettier': 'off',
	},
};
