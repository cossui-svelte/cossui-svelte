<script lang="ts">
	import Search from "@lucide/svelte/icons/search";
	import Tag from "@lucide/svelte/icons/tag";
	import { allParticles } from "$lib/registry/registry-particles";
	import { getCategorySortOrder } from "$lib/registry/registry-categories.js";
	import {
		Combobox,
		ComboboxChip,
		ComboboxChips,
		ComboboxChipsInput,
		ComboboxGroup,
		ComboboxGroupLabel,
		ComboboxItem,
		ComboboxList,
		ComboboxPopup,
		ComboboxSeparator,
	} from "$lib/components/ui/combobox";

	export interface SearchItem {
		label: string;
		value: string;
	}

	let {
		items,
		selectedItems,
		onItemsChange,
	}: {
		items: SearchItem[];
		selectedItems: SearchItem[];
		onItemsChange: (items: SearchItem[]) => void;
	} = $props();

	let inputValue = $state("");
	let open = $state(selectedItems.length === 0);

	$effect(() => {
		if (selectedItems.length === 0) open = true;
	});

	const selectedValues = $derived(selectedItems.map((i) => i.value));

	const groupedItems = $derived(() => {
		const q = inputValue.toLowerCase();
		const visible = q
			? items.filter((i) => i.label.toLowerCase().includes(q))
			: items;

		const enabled: SearchItem[] = [];
		const disabled: SearchItem[] = [];

		for (const item of visible) {
			if (selectedValues.includes(item.value)) {
				enabled.push(item);
				continue;
			}
			const testValues = [...selectedValues, item.value];
			const hasMatches = Object.values(allParticles).some((p) => {
				const cats = p.tags ?? [];
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
			return (
				getCategorySortOrder(a.value) - getCategorySortOrder(b.value)
			);
		});

		const sortedDisabled = [...disabled].sort(
			(a, b) =>
				getCategorySortOrder(a.value) - getCategorySortOrder(b.value),
		);

		return { enabled: sortedEnabled, disabled: sortedDisabled };
	});

	function handleValueChange(newValues: string[]) {
		const newItems = newValues
			.map((v) => items.find((i) => i.value === v))
			.filter((i): i is SearchItem => !!i);
		onItemsChange(newItems);
		inputValue = "";
		open = false;
	}

	function removeItem(value: string) {
		handleValueChange(selectedValues.filter((v) => v !== value));
	}
</script>

<div class="mx-auto max-w-2xl">
	<Combobox
		type="multiple"
		value={selectedValues}
		onValueChange={handleValueChange}
		{open}
		onOpenChange={(v) => (open = v)}
		inputValue={inputValue}
	>
		<ComboboxChips>
			{#snippet startAddon()}
				<Search class="size-4 text-muted-foreground" strokeWidth={2} />
			{/snippet}
			{#each selectedItems as item (item.value)}
				<ComboboxChip
					removeProps={{ onclick: () => removeItem(item.value) }}
				>
					<Tag class="size-3 opacity-80" strokeWidth={2} />
					{item.label}
				</ComboboxChip>
			{/each}
			<ComboboxChipsInput
				oninput={(e) =>
					(inputValue = (e.currentTarget as HTMLInputElement).value)}
				placeholder={selectedItems.length === 0
					? "Search components..."
					: ""}
				aria-label="Filter particles"
			/>
		</ComboboxChips>

		<ComboboxPopup>
			<ComboboxList>
				{#if groupedItems().enabled.length === 0 && groupedItems().disabled.length === 0}
					<div
						class="p-2 text-center text-muted-foreground text-sm"
					>
						No filters found.
					</div>
				{/if}

				{#if groupedItems().enabled.length > 0}
					<ComboboxGroup>
						<ComboboxGroupLabel>Filter particles</ComboboxGroupLabel>
						{#each groupedItems().enabled as item (item.value)}
							<ComboboxItem value={item.value} label={item.label}>
								{#snippet children()}
									<Tag
										class="size-3.5 opacity-80"
										strokeWidth={2}
									/>
									{item.label}
								{/snippet}
							</ComboboxItem>
						{/each}
					</ComboboxGroup>
				{/if}

				{#if groupedItems().disabled.length > 0}
					<ComboboxSeparator />
					<ComboboxGroup>
						<ComboboxGroupLabel>No matches</ComboboxGroupLabel>
						{#each groupedItems().disabled as item (item.value)}
							<ComboboxItem
								value={item.value}
								label={item.label}
								disabled
							>
								{#snippet children()}
									<Tag
										class="size-3.5 opacity-80"
										strokeWidth={2}
									/>
									{item.label}
								{/snippet}
							</ComboboxItem>
						{/each}
					</ComboboxGroup>
				{/if}
			</ComboboxList>
		</ComboboxPopup>
	</Combobox>
</div>
