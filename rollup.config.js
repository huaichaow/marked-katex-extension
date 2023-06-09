/* eslint-disable @typescript-eslint/no-var-requires */

const { defineConfig } = require('rollup');
const ts = require('rollup-plugin-ts');

module.exports = defineConfig([
	{
		input: 'src/index.ts',
		output: {
			file: 'lib/marked-katex-extension.js',
			format: 'cjs',
		},
		plugins: [
			ts(),
		],
	},
	{
		input: 'src/index.ts',
		output: {
			file: 'lib/marked-katex-extension.esm.js',
			format: 'esm',
		},
		plugins: [
			ts(),
		],
	},
	{
		input: 'src/index.ts',
		output: {
			file: 'lib/marked-katex-extension.umd.js',
			format: 'umd',
			name: 'markedTocExtension',
		},
		plugins: [
			ts(),
		],
	},
]);
