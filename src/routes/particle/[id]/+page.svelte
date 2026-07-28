<script lang="ts">
	import PageHeader from "$lib/components/app/page-header.svelte";
	import PageHeaderDescription from "$lib/components/app/page-header-description.svelte";
	import PageHeaderHeading from "$lib/components/app/page-header-heading.svelte";
	import { allParticles } from "$lib/registry/registry-particles";
	import ParticleCard from "../../particles/particle-card.svelte";
	import type { PageData } from "./$types";

	let { data }: { data: PageData } = $props();

	const particle = $derived(allParticles[data.id]);
	const className = $derived(particle.meta?.class as string | undefined);
	const colSpan = $derived(particle.meta?.colSpan as number | undefined);
</script>

<div class="container w-full">
	<PageHeader class="*:pb-8!">
		<PageHeaderHeading>{particle.name}</PageHeaderHeading>
		{#if particle.description}
			<PageHeaderDescription class="max-w-2xl">
				{particle.description}
			</PageHeaderDescription>
		{/if}
	</PageHeader>

	<div class="grid flex-1 items-stretch gap-9 pb-12">
		<ParticleCard {particle} class={className} {colSpan} />
	</div>
</div>
