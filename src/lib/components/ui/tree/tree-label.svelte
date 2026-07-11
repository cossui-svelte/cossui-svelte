<!-- eslint-disable-next-line @typescript-eslint/no-explicit-any -->
<script lang="ts" generics="T = any">
	import type { ItemInstance } from '@headless-tree/core';
	import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';
	import { useTreeContext } from './tree-context.svelte';

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	interface TreeItemLabelProps<T = unknown> extends HTMLAttributes<HTMLElement> {
		item?: ItemInstance<T>;
	}

	const {
		children,
		class: className,
		item: propItem,
		...restProps
	}: TreeItemLabelProps<T> = $props();

	const ctx = useTreeContext<T>();
	const item = propItem || ctx.currentItem;

	if (!item) {
		console.warn('TreeItemLabel: No item provided via props or context');
	}
</script>

{#if item}
	<span
		data-slot="tree-item-label"
		class={cn(
			'bg-background hover:bg-accent data-[selected=true]:bg-accent group-data-[selected=true]/tree-item:text-accent-foreground flex items-center gap-1 rounded-sm px-2 py-1.5  text-sm transition-colors data-[folder=true]:ps-7 [&_svg]:pointer-events-none [&_svg]:shrink-0',
			'group-data-[drag-target=true]/tree-item:bg-accent group-data-[selected=true]/tree-item:bg-accent group-data-[search-match=true]/tree-item:bg-blue-400/20',
			'group-focus-visible/tree-item:ring-ring/50 group-focus-visible/tree-item:ring-[3px] group-focus-visible/tree-item:outline-none',
			className
		)}
		{...restProps}
	>
		{#if item.isFolder()}
			<ChevronDownIcon class="text-muted-foreground size-4 aria-[expanded=false]:-rotate-90" />
		{/if}
		{#if children}
			{@render children?.()}
		{:else}
			{typeof item.getItemName === 'function' ? item.getItemName() : null}
		{/if}
	</span>
{/if}
