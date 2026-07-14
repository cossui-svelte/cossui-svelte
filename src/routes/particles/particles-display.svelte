<script lang="ts">

	import { allParticles } from "$lib/registry/registry-particles.js";
	import type { RegistryCategory } from "$lib/registry/registry-tags.js";
	import ParticleCard from "./particle-card.svelte";

	interface Props {
		selectedCategories: RegistryCategory[];
	}

	let { selectedCategories }: Props = $props();

	function calculateRelevanceWeight(
		particle: (typeof allParticles)[number],
		searchTerms: RegistryCategory[],
	): number {
		let weight = 0;
		for (const term of searchTerms) {
			const normalizedTerm = term.replace(/\s+/g, "-");
			if (particle.name.startsWith(`p-${normalizedTerm}-`)) weight += 30;
			const deps = particle.registryDependencies ?? [];
			if (deps.some((dep) => dep === normalizedTerm))
				weight += 20;
			const cats = particle.tags ?? [];
			if (cats[0] === term) weight += 10;
		}
		return weight;
	}

	const filteredParticles = $derived(
		Object.values(allParticles)
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
			{@const className = particle.meta?.class as string | undefined}
			{@const colSpan = particle.meta?.colSpan as number | undefined}

			<ParticleCard {particle} class={className} {colSpan} />
		{/each}
	</div>
{/if}
