module.exports = {
	printWidth: 100,
	tabWidth: 2,
	useTabs: true,
	semi: true,
	singleQuote: true,
	quoteProps: 'as-needed',
	trailingComma: 'all',
	bracketSpacing: true,
	arrowParens: 'avoid',
	endOfLine: 'lf',
	overrides: [
		{ files: ['*.js', '*.jsx', '*.cjs', '*.mjs'], options: { parser: 'babel' } },
		{ files: ['*.ts', '*.tsx', '*.cts', '*.mts'], options: { parser: 'typescript' } },
		{ files: ['*.json'], options: { parser: 'json' } },
		{ files: ['*.md'], options: { parser: 'markdown' } },
		{ files: ['*.yaml', '*.yml'], options: { parser: 'yaml' } },
	],
};
