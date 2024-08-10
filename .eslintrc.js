const path = require('path');


module.exports = {
	extends: [
		'plugin:@next/next/recommended',
		'plugin:@stylistic/recommended-extends' // https://github.com/eslint-stylistic/eslint-stylistic/blob/main/packages/eslint-plugin/configs/customize.ts#L103
	],
	plugins: [
		'@stylistic', // https://www.npmjs.com/package/@stylistic/eslint-plugin
		'@typescript-eslint', // https://www.npmjs.com/package/@typescript-eslint/eslint-plugin
		'import', // https://www.npmjs.com/package/eslint-plugin-import
		'import-alias', // https://www.npmjs.com/package/eslint-plugin-import-alias
		'typescript-sort-keys', // https://www.npmjs.com/package/eslint-plugin-typescript-sort-keys
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: path.resolve(__dirname, './tsconfig.json'),
		tsconfigRootDir: __dirname,
		ecmaVersion: 'next', // Allows for the parsing of modern ECMAScript features
		sourceType: 'module', // Allows for the use of imports
		ecmaFeatures: {
			jsx: true // Allows for the parsing of JSX
		},
	},
	rules: {
		'curly': ['error', 'all'],
		'no-duplicate-imports': 'error',
		'one-var': ['error', 'never'],
		'arrow-body-style': ['error', 'as-needed'],
		'no-console': 'warn',

		// Plugin: @stylistic
		'@stylistic/padding-line-between-statements': [
			'error',
			{blankLine: 'always', prev: ['const', 'let', 'if', 'for'], next: '*'},
			{blankLine: 'any', prev: ['const', 'let'], next: ['const', 'let']},
			{blankLine: 'always', prev: '*', next: 'return'}
		],
		'@stylistic/object-curly-newline': [
			'error', {
				multiline: true,
				consistent: true
			}
		],
		'@stylistic/space-before-function-paren': [
			'error',
			{
				anonymous: 'always', // default: always
				asyncArrow: 'never', // default: always
				named: 'never', // default: never
			}
		],
		'@stylistic/padded-blocks': ["error", "never"],
		'@stylistic/max-len': ['error', {
			code: 120,
			ignoreComments: true,
			ignoreUrls: true,
		}],
		'@stylistic/indent': ['error', 'tab'],
		'@stylistic/no-tabs': ['error', {allowIndentationTabs: true}],
		'@stylistic/no-multiple-empty-lines': ['error', {
			max: 2,
			maxBOF: 0,
			maxEOF: 1,
		}],
		'@stylistic/object-curly-spacing': ['error', 'always'],
		'@stylistic/explicit-module-boundary-types': 'off',
		'@stylistic/member-delimiter-style': ['error', {
			multiline: {
				delimiter: 'semi',
				requireLast: true
			},
			singleline: {
				delimiter: 'semi',
				requireLast: false
			},
			multilineDetection: 'brackets'
		}],
		'@stylistic/comma-dangle': [
			'error',
			{
				arrays: 'always-multiline',
				objects: 'always-multiline',
				imports: 'always-multiline',
				exports: 'always-multiline',
				functions: 'never',
				enums: 'always-multiline'
			}
		],
		'@stylistic/semi': ['error', 'always'],
		'@stylistic/brace-style': ['error', '1tbs'],
		'@stylistic/arrow-parens': ['error', 'always'],
		'@stylistic/jsx-indent-props': ['error', 'tab'],

		// Plugin: @typescript-eslint
		'@typescript-eslint/naming-convention': [ // feature frozen...
			'error',
			{
				selector: 'variable',
				types: ['boolean'],
				format: ['PascalCase'],
				prefix: ['can', 'has', 'is']
			}
		],

		// Plugin: import
		'import/newline-after-import': ['error', {count: 2}],
		'import/order': [
			'error',
			{
				alphabetize: {
					order: 'asc',
					caseInsensitive: true
				},
				groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
				pathGroups: [
					{
						pattern: '@/pages/**',
						group: 'internal',
						position: 'before'
					},
					{
						pattern: '@/**',
						group: 'internal',
						position: 'before'
					}
				],
				'newlines-between': 'always'
			}
		],

		// Plugin: import-alias
		'import-alias/import-alias': [
			'error',
			{
				relativeDepth: 1,
				aliases: [
					{alias: '@/components', matcher: '^components'},
				]
			}
		],

		'typescript-sort-keys/interface': [
			'error',
			'asc',
			{
				caseSensitive: true,
				natural: false,
				requiredFirst: true
			}
		],
	},
};
