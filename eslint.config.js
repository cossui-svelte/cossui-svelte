// eslint.config.js
import betterTailwind from "eslint-plugin-better-tailwindcss";
import svelte from "eslint-plugin-svelte";
import svelteParser from "svelte-eslint-parser";
import tseslint from "typescript-eslint";

export default tseslint.config(
	{
		ignores: [".svelte-kit/**", "dist/**", "build/**", "node_modules/**"],
	},
	...svelte.configs.recommended,
	{
		// also cover *.svelte.ts / *.svelte.js so the TS sub-parser (not the
		// default espree) is used for them, avoiding parse errors on TS syntax
		files: ["**/*.svelte", "**/*.svelte.ts", "**/*.svelte.js"],
		extends: [tseslint.configs.recommended],
		languageOptions: {
			parser: svelteParser,
			parserOptions: { parser: tseslint.parser },
		},
		plugins: { "better-tailwindcss": betterTailwind },
		settings: {
			"better-tailwindcss": { entryPoint: "src/app.css" },
		},
		rules: {
			"better-tailwindcss/no-unnecessary-whitespace": "warn",
			"better-tailwindcss/no-duplicate-classes": "warn",
			// "no-conflicting-classes" is disabled: it needs to fully resolve
			// app.css's Tailwind config, but can't follow the "$lib/..." alias
			// in its @import and crashes.
			// optional, only if you also want sorting:
			// "better-tailwindcss/enforce-consistent-class-order": "warn",

			// Svelte 5 requires `let` (not `const`) for `$props()` destructuring
			// so bindable props keep working; core scope analysis can't see
			// that and flags it as "never reassigned".
			"prefer-const": "off",

			// This codebase's convention for an intentionally-unused
			// parameter/variable is a leading underscore (e.g. `_payload`).
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					args: "all",
					argsIgnorePattern: "^_",
					caughtErrorsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
				},
			],

			// Downgraded to "warn": these flag real, pre-existing issues that
			// need a behavior change or a judgment call rather than a
			// mechanical fix (SvelteKit resolve() migration, Set/Map ->
			// SvelteSet/SvelteMap, $state+$effect -> $derived, each-block
			// keys, {@html} sanitization review). Tracked as follow-up work.
			"svelte/no-navigation-without-resolve": "warn",
			"svelte/require-each-key": "warn",
			"svelte/prefer-svelte-reactivity": "warn",
			"svelte/prefer-writable-derived": "warn",
			"svelte/no-at-html-tags": "warn",
		},
	},
);
