import { defineConfig, Config } from 'jsrepo';
import shadcn from "@jsrepo/shadcn"; 

import { componentDependenciesOutput } from './scripts/component-dependencies-output.ts';
import { getRegistryItems } from './scripts/registry-items.ts';

// soon
// import { output as shadcnSvelteOutput } from '@jsrepo/shadcn-svelte';
import { output as shadcnOutput } from '@jsrepo/shadcn';

export default defineConfig({
	registry: async ({ cwd }) => ({
		name: '@cossui-svelte',

	version: 'package',
		authors: ['Olivier Refalo'],
		bugs: 'https://github.com/cossui-svelte/cossui-svelte/issues',
		description: 'A new, modern UI component library for Svelte',
		homepage: 'https://cossui-svelte.com',
		repository: 'https://github.com/cossui-svelte/cossui-svelte',
		tags: ['svelte', 'cossui' ,'shadcn', 'typescript', 'components', 'utilities'],
		excludeDeps: ['svelte', '@sveltejs/kit'],
		outputs: [
			shadcnOutput({ dir: './static/r', format: true }),
			componentDependenciesOutput({ path: './src/lib/registry/generated-componentDependencies.ts' })
		],
		items: await getRegistryItems(cwd),
		defaultPaths: {
			component: '$lib/components/ui'
		},
	}),
	providers: [shadcn()],
	paths: {
		ui: './src/lib/components/ui',
		// component: '$lib/components',
		block: './src/lib/components/particles',
		hook: './src/lib/hooks',
		// action: '$lib/actions',
		util: './src/lib/utils',
		lib: './src/lib'
	},
	registries: []
});

