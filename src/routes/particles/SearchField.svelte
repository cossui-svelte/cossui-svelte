<script lang="ts">
	import { Combobox } from 'bits-ui';
	import { Search, Tag, X } from 'lucide-svelte';
	import { cn } from '$lib/utils.js';
	import { particles } from '$lib/registry/registry-particles.js';
	import { getCategorySortOrder } from '$lib/registry/registry-categories.js';

	export interface SearchItem {
		label: string;
		value: string;
	}

	interface Props {
		items: SearchItem[];
		selectedItems: SearchItem[];
		onItemsChange: (items: SearchItem[]) => void;
	}

	let { items, selectedItems, onItemsChange }: Props = $props();

	let inputValue = $state('');
	let open = $state(selectedItems.length === 0);

	$effect(() => {
		if (selectedItems.length === 0) open = true;
	});

	const selectedValues = $derived(selectedItems.map((i) => i.value));

	const groupedItems = $derived(() => {
		const q = inputValue.toLowerCase();
		const visible = q ? items.filter((i) => i.label.toLowerCase().includes(q)) : items;

		const enabled: SearchItem[] = [];
		const disabled: SearchItem[] = [];

		for (const item of visible) {
			if (selectedValues.includes(item.value)) {
				enabled.push(item);
				continue;
			}
			const testValues = [...selectedValues, item.value];
			const hasMatches = particles.some((p) => {
				const cats = p.categories ?? [];
				return testValues.every((v) => cats.includes(v));
			});
			if (hasMatches) enabled.push(item);
			else disabled.push(item);
		}

		const sortedEnabled = [...enabled].sort((a, b) => {
			const aSelected = selectedValues.includes(a.value);
			const bSelected = selectedValues.includes(b.value);
			if (aSelected && !bSelected) return -1;
			if (!aSelected && bSelected) return 1;
			return getCategorySortOrder(a.value) - getCategorySortOrder(b.value);
		});

		const sortedDisabled = [...disabled].sort(
			(a, b) => getCategorySortOrder(a.value) - getCategorySortOrder(b.value)
		);

		return { enabled: sortedEnabled, disabled: sortedDisabled };
	});

	function handleValueChange(newValues: string[]) {
		const newItems = newValues
			.map((v) => items.find((i) => i.value === v))
			.filter((i): i is SearchItem => !!i);
		onItemsChange(newItems);
		open = false;
	}

	function removeItem(value: string) {
		handleValueChange(selectedValues.filter((v) => v !== value));
	}
</script>

<div class="mx-auto max-w-2xl">
	<Combobox.Root
		type="multiple"
		value={selectedValues}
		onValueChange={handleValueChange}
		{open}
		onOpenChange={(v) => (open = v)}
	>
		<div
			class="flex flex-wrap items-center gap-1.5 rounded-xl border border-input bg-background p-2 focus-within:ring-2 focus-within:ring-ring"
		>
			<Search class="size-5 shrink-0 text-muted-foreground" strokeWidth={2} />

			{#each selectedItems as item (item.value)}
				<span
					class="flex items-center gap-1 rounded-md border border-input bg-accent px-2 py-0.5 text-sm"
				>
					<Tag class="size-3 opacity-80" strokeWidth={2} />
					{item.label}
					<button
						class="ml-0.5 opacity-60 hover:opacity-100"
						type="button"
						onclick={() => removeItem(item.value)}
						aria-label="Remove {item.label}"
					>
						<X class="size-3" />
					</button>
				</span>
			{/each}

			<Combobox.Input
				class="min-w-24 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground sm:text-sm"
				placeholder={selectedItems.length === 0 ? 'Search components...' : ''}
				aria-label="Filter particles"
				oninput={(e) => (inputValue = e.currentTarget.value)}
			/>
		</div>

		<Combobox.Portal>
			<Combobox.Content
				class={cn(
					'relative mt-1 flex max-h-80 min-w-(--bits-combobox-anchor-width) flex-col overflow-y-auto rounded-lg border bg-popover p-1 shadow-lg',
					'origin-[--bits-combobox-content-transform-origin] transition-[scale,opacity]',
					'data-[state=closed]:scale-98 data-[state=closed]:opacity-0 data-[state=open]:scale-100 data-[state=open]:opacity-100'
				)}
			>
				{#if groupedItems().enabled.length === 0 && groupedItems().disabled.length === 0}
					<div class="p-2 text-center text-muted-foreground text-sm">No filters found.</div>
				{/if}

				{#if groupedItems().enabled.length > 0}
					<Combobox.Group>
						<Combobox.GroupHeading class="px-2 py-1 text-muted-foreground text-xs font-medium">
							Filter particles
						</Combobox.GroupHeading>
						{#each groupedItems().enabled as item (item.value)}
							<Combobox.Item
								value={item.value}
								label={item.label}
								class="grid min-h-8 cursor-default grid-cols-[1rem_1fr] items-center gap-2 rounded-sm py-1 ps-2 pe-4 text-base outline-none data-highlighted:bg-accent data-highlighted:text-accent-foreground sm:min-h-7 sm:text-sm"
							>
								{#snippet children({ selected })}
									<svg
										class={cn('col-start-1 size-4', !selected && 'invisible')}
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<path d="M5.252 12.7 10.2 18.63 18.748 5.37" />
									</svg>
									<span class="col-start-2 flex items-center gap-2">
										<Tag class="size-3.5 opacity-80" strokeWidth={2} />
										{item.label}
									</span>
								{/snippet}
							</Combobox.Item>
						{/each}
					</Combobox.Group>
				{/if}

				{#if groupedItems().disabled.length > 0}
					<Combobox.Separator class="my-1 -mx-1 h-px bg-border" />
					<Combobox.Group>
						<Combobox.GroupHeading class="px-2 py-1 text-muted-foreground text-xs font-medium">
							No matches
						</Combobox.GroupHeading>
						{#each groupedItems().disabled as item (item.value)}
							<Combobox.Item
								value={item.value}
								label={item.label}
								disabled
								class="grid min-h-8 cursor-default grid-cols-[1rem_1fr] items-center gap-2 rounded-sm py-1 ps-2 pe-4 text-base outline-none data-disabled:pointer-events-none data-disabled:opacity-50 sm:min-h-7 sm:text-sm"
							>
								{#snippet children({ selected })}
									<svg
										class={cn('col-start-1 size-4', !selected && 'invisible')}
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<path d="M5.252 12.7 10.2 18.63 18.748 5.37" />
									</svg>
									<span class="col-start-2 flex items-center gap-2">
										<Tag class="size-3.5 opacity-80" strokeWidth={2} />
										{item.label}
									</span>
								{/snippet}
							</Combobox.Item>
						{/each}
					</Combobox.Group>
				{/if}
			</Combobox.Content>
		</Combobox.Portal>
	</Combobox.Root>
</div>
