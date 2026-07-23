<script lang="ts">
	import PageHeader from "$lib/components/app/page-header.svelte";
	import PageHeaderDescription from "$lib/components/app/page-header-description.svelte";
	import PageHeaderHeading from "$lib/components/app/page-header-heading.svelte";
	import { allParticles } from "$lib/registry/registry-particles";
	import {
		isValidRegistryCategory,
		type RegistryCategory,
	} from "$lib/registry/registry-tags.js";
	import ParticlesDisplay from "./particles-display.svelte";
	import SearchContainer from "./search-container.svelte";
	import { browser } from "$app/env";
	import { page } from "$app/state";

	const particleCount = Object.keys(allParticles).length;
	const description = `Discover ${particleCount} ready-to-use particles, the building blocks of your design system. Filter by category to find the perfect component for your project.`;

	const selectedCategories = $derived.by(() => {
		if (!browser) return { hasInvalid: false, valid: [] };

		const rawCategories =
			page.url.searchParams.get("tags")?.split(",").filter(Boolean) ?? [];
		const validCategories = rawCategories.filter(
			isValidRegistryCategory,
		) as RegistryCategory[];

		const hasInvalid = rawCategories.some(
			(c) => !isValidRegistryCategory(c),
		);
		return { hasInvalid, valid: validCategories };
	});
</script>

<svelte:head>
	<title>Browse Particles - coss ui</title>
	<meta name="description" content={description} />
</svelte:head>

<div class="container w-full">
	<PageHeader class="*:pb-8!">
		<PageHeaderHeading>Browse Particles</PageHeaderHeading>
		<PageHeaderDescription class="max-w-2xl">
			{description}
		</PageHeaderDescription>
	</PageHeader>

	<SearchContainer />

	{#if selectedCategories.hasInvalid}
		<div class="text-center">
			<p class="text-muted-foreground">
				No particles found for the selected filters
			</p>
		</div>
	{:else if selectedCategories.valid.length > 0}
		<ParticlesDisplay selectedCategories={selectedCategories.valid} />
	{/if}
</div>
