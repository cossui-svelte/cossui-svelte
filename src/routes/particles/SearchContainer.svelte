<script lang="ts">
	import { getCategorySortOrder } from "$lib/registry/registry-categories";
	import { allParticles } from "$lib/registry/registry-particles";
	import SearchField, { type SearchItem } from "./SearchField.svelte";
	import { browser } from "$app/environment";
	import { goto } from "$app/navigation";
	import { page } from "$app/state";

	const uniqueCategories = Array.from(
		// new Set(particles.flatMap((p) => p.categories ?? [])),
		new Set(Object.values(allParticles).flatMap((p) => p.tags)),
	).sort((a, b) => getCategorySortOrder(a) - getCategorySortOrder(b));

	const searchItems: SearchItem[] = uniqueCategories.map((category) => ({
		label: category
			.split(" ")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" "),
		value: category,
	}));

	const selectedItems = $derived(
		(
			(browser ? page.url.searchParams.get("tags") : null)
				?.split(",")
				.filter(Boolean) ?? []
		)
			.map((tag) => searchItems.find((item) => item.value === tag))
			.filter((item): item is SearchItem => !!item),
	);

	function updateSelectedItems(items: SearchItem[]) {
		const tags =
			items.length > 0 ? items.map((i) => i.value).join(",") : "";
		const newUrl = tags
			? `${page.url.pathname}?tags=${encodeURIComponent(tags)}`
			: page.url.pathname;
		goto(newUrl, { noScroll: true });
	}
</script>

<div class="mb-8 md:mb-12 lg:mb-16">
	<SearchField
		items={searchItems}
		{selectedItems}
		onItemsChange={updateSelectedItems}
	/>
</div>
