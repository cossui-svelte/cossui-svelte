<script lang="ts">
import { page } from '$app/state';
import PageHeader from '$lib/components/shared-components/page-header.svelte';
import PageHeaderDescription from '$lib/components/shared-components/page-header-description.svelte';
import PageHeaderHeading from '$lib/components/shared-components/page-header-heading.svelte';
import { isValidRegistryCategory } from '$lib/registry/registry-categories.js';
import { particles } from '$lib/registry/registry-particles.js';
import ParticlesDisplay from './ParticlesDisplay.svelte';
import SearchContainer from './SearchContainer.svelte';

const particleCount = particles.length;
const description = `Discover ${particleCount} ready-to-use particles, the building blocks of your design system. Filter by category to find the perfect component for your project.`;

const selectedCategories = $derived(() => {
  const rawCategories = page.url.searchParams.get('tags')?.split(',').filter(Boolean) ?? [];
  const validCategories = rawCategories.filter(isValidRegistryCategory);
  const hasInvalid = rawCategories.some((c) => !isValidRegistryCategory(c));
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

	{#if selectedCategories().hasInvalid}
		<div class="text-center">
			<p class="text-muted-foreground">No particles found for the selected filters</p>
		</div>
	{:else if selectedCategories().valid.length > 0}
		<ParticlesDisplay selectedCategories={selectedCategories().valid} />
	{/if}
</div>
