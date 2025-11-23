import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
	globalIgnores(["dist"]),
	{
		files: ["**/*.{mts,ts,tsx}"],
		extends: [js.configs.recommended, tseslint.configs.recommendedTypeChecked],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.node,
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
	{
		rules: {
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{
					args: "all",
					argsIgnorePattern: "^_",
					caughtErrors: "all",
					caughtErrorsIgnorePattern: "^_",
					destructuredArrayIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					ignoreRestSiblings: true,
				},
			],
			"prefer-template": "warn",
			"object-shorthand": "warn",
		},
	},
	{
		files: ["**/*.{mjs,js,jsx}"],
		extends: [js.configs.recommended, tseslint.configs.recommended],
	},
]);
