<script lang="ts">
	import { hotkeysCoreFeature, syncDataLoaderFeature } from '@headless-tree/core';
	import FileIcon from '@lucide/svelte/icons/file';
	import FolderIcon from '@lucide/svelte/icons/folder';
	import FolderOpenIcon from '@lucide/svelte/icons/folder-open';
	import { Tree, TreeItem, TreeLabel, useTree } from '$lib/components/ui/tree';

	interface Item {
		children?: string[];
		name: string;
	}
	const items: Record<string, Item> = {
		apis: { name: 'APIs' },
		backend: { children: ['apis', 'infrastructure'], name: 'Backend' },
		company: {
			children: ['engineering', 'marketing', 'operations'],
			name: 'Company'
		},
		components: { name: 'Components' },
		content: { name: 'Content' },
		'design-system': {
			children: ['components', 'tokens', 'guidelines'],
			name: 'Design System'
		},
		engineering: {
			children: ['frontend', 'backend', 'platform-team'],
			name: 'Engineering'
		},
		finance: { name: 'Finance' },
		frontend: { children: ['design-system', 'web-platform'], name: 'Frontend' },
		guidelines: { name: 'Guidelines' },
		hr: { name: 'HR' },
		infrastructure: { name: 'Infrastructure' },
		marketing: { children: ['content', 'seo'], name: 'Marketing' },
		operations: { children: ['hr', 'finance'], name: 'Operations' },
		'platform-team': { name: 'Platform Team' },
		seo: { name: 'SEO' },
		tokens: { name: 'Tokens' },
		'web-platform': { name: 'Web Platform' }
	};

	const indent = 20;

	const tree = useTree<Item>({
		dataLoader: {
			getChildren: (itemId) => items[itemId].children ?? [],
			getItem: (itemId) => items[itemId]
		},
		features: [syncDataLoaderFeature, hotkeysCoreFeature],
		getItemName: (item) => item.getItemData().name,
		indent,
		initialState: {
			expandedItems: ['engineering', 'frontend', 'design-system']
		},
		isItemFolder: (item) => (item.getItemData()?.children?.length ?? 0) > 0,
		rootItemId: 'company'
	});
</script>

<div class="flex h-full flex-col gap-2 *:first:grow">
	<div>
		<Tree
			class="relative before:absolute before:inset-0 before:-ms-1 before:bg-[repeating-linear-gradient(to_right,transparent_0,transparent_calc(var(--tree-indent)-1px),hsl(var(--border))_calc(var(--tree-indent)-1px),hsl(var(--border))_calc(var(--tree-indent)))]"
			{indent}
			{tree}
		>
			{#each tree.current.getItems() as item (item.getId())}
				<TreeItem {item}>
					<TreeLabel
						class="before:bg-background relative before:absolute before:inset-x-0 before:-inset-y-0.5 before:-z-10"
					>
						<span class="flex items-center gap-2">
							{#if item.isFolder()}
								{#if item.isExpanded()}
									<FolderOpenIcon class="text-muted-foreground pointer-events-none size-4" />
								{:else}
									<FolderIcon class="text-muted-foreground pointer-events-none size-4" />
								{/if}
							{:else}
								<FileIcon class="text-muted-foreground pointer-events-none size-4" />
							{/if}

							{item.getItemName()}
						</span>
					</TreeLabel>
				</TreeItem>
			{/each}
		</Tree>
	</div>
	<p aria-live="polite" role="region" class="text-muted-foreground mt-2 text-xs">
		Basic tree with icons ∙
		<a
			href="https://headless-tree.lukasbach.com"
			class="hover:text-foreground underline"
			target="_blank"
			rel="noopener noreferrer"
		>
			Headless Tree
		</a>
		∙
		<a
			href="https://github.com/max-got/originui-svelte/blob/main/src/lib/components/ui/tree/use-tree.svelte.ts"
			class="hover:text-foreground underline"
			target="_blank"
			rel="noopener noreferrer"
		>
			Svelte Integration
		</a>
	</p>
</div>
