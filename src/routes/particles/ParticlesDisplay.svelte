<script lang="ts">
	// import { Skeleton } from "$lib/components/ui/skeleton";
	import { particles } from "$lib/registry/registry-particles.js";
	// import { getCategorySortOrder } from "$lib/registry/registry-categories.js";
	import type { RegistryCategory } from "$lib/registry/registry-categories.js";
	import ParticleCard from "./ParticleCard.svelte";
	// import ParticleCardContainer from "./ParticleCardContainer.svelte";

	interface Props {
		selectedCategories: RegistryCategory[];
	}

	let { selectedCategories }: Props = $props();

	function calculateRelevanceWeight(
		particle: (typeof particles)[number],
		searchTerms: RegistryCategory[],
	): number {
		let weight = 0;
		for (const term of searchTerms) {
			const normalizedTerm = term.replace(/\s+/g, "-");
			if (particle.name.startsWith(`p-${normalizedTerm}-`)) weight += 30;
			const deps = particle.registryDependencies ?? [];
			if (deps.some((dep) => dep === `@coss/${normalizedTerm}`))
				weight += 20;
			const cats = particle.tags ?? [];
			if (cats[0] === term) weight += 10;
		}
		return weight;
	}

	const filteredParticles = $derived(
		Object.values(particles)
			.filter((p) => {
				const cats = p.tags ?? [];
				return selectedCategories.every((v) => cats.includes(v));
			})
			.sort((a, b) => {
				const wA = calculateRelevanceWeight(a, selectedCategories);
				const wB = calculateRelevanceWeight(b, selectedCategories);
				return wB - wA;
			}),
	);
</script>

{#if filteredParticles.length === 0}
	<div class="text-center">
		<p class="text-muted-foreground">
			No particles found for the selected filters
		</p>
	</div>
{:else}
	<div
		class="grid flex-1 items-stretch gap-9 pb-12 lg:grid-cols-2 lg:gap-6 xl:gap-9"
	>
		{#each filteredParticles as particle (particle.name)}
			<ParticleCard
				{particle}
				// class={particle?.className}
				// colSpan={particle?.colSpan}
			/>
		{/each}
	</div>
{/if}
