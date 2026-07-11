<script lang="ts">
	import {
		hotkeysCoreFeature,
		type ItemInstance,
		renamingFeature,
		selectionFeature,
		syncDataLoaderFeature
	} from '@headless-tree/core';
	import FolderIcon from '@lucide/svelte/icons/folder';
	import FolderOpenIcon from '@lucide/svelte/icons/folder-open';
	import { Tree, TreeItem, TreeLabel, useTree } from '$lib/components/ui/tree';

	interface Item {
		children?: string[];
		name: string;
	}
	const initialItems: Record<string, Item> = {
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
	let items = $state.raw(initialItems);

	const indent = 20;

	const onRename = (item: ItemInstance<Item>, value: string) => {
		items[item.getId()].name = value;
	};
	const tree = useTree<Item>({
		canReorder: true,
		dataLoader: {
			getChildren: (itemId) => items[itemId].children ?? [],
			getItem: (itemId) => items[itemId]
		},
		features: [syncDataLoaderFeature, hotkeysCoreFeature, renamingFeature, selectionFeature],
		getItemName: (item) => item.getItemData().name,
		indent,
		initialState: {
			expandedItems: ['engineering', 'frontend', 'design-system'],
			selectedItems: ['components']
		},
		isItemFolder: (item) => (item.getItemData()?.children?.length ?? 0) > 0,
		onRename,
		rootItemId: 'company'
	});
</script>

<div class="flex h-full flex-col gap-2 *:first:grow">
	<div>
		<Tree {indent} {tree}>
			{#each tree.current.getItems() as item (item.getId())}
				<TreeItem {item}>
					{#snippet child({ props })}
						<TreeLabel {...props}>
							<span class="flex items-center gap-2">
								{#if item.isFolder()}
									{#if item.isExpanded()}
										<FolderOpenIcon class="text-muted-foreground pointer-events-none size-4" />
									{:else}
										<FolderIcon class="text-muted-foreground pointer-events-none size-4" />
									{/if}
								{/if}

								{#if tree.reactive(() => item.isRenaming())}
									{@const { attacher, ...rest } = item.getRenameInputProps()}
									<input
										{...attacher}
										{...rest}
										class="border-input bg-background text-foreground placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-ring/20 flex h-6 w-full rounded-lg border px-1 py-0 text-sm shadow-sm shadow-black/5 transition-shadow focus-visible:ring-[3px] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
									/>
								{:else}
									{item.getItemName()}
								{/if}
							</span>
						</TreeLabel>
					{/snippet}
				</TreeItem>
			{/each}
		</Tree>
	</div>
	<p aria-live="polite" role="region" class="text-muted-foreground mt-2 text-xs">
		Tree with renaming (press F2 to rename) ∙
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
