<script lang="ts">
  import { resolve } from '$app/paths';
  import { Badge } from '#lib/components/ui/badge/index.js';
  import { Button } from '#lib/components/ui/button/index.js';
  import {
    Card,
    CardFrame,
    CardFrameDescription,
    CardFrameHeader,
    CardFrameTitle,
    CardPanel
  } from '#lib/components/ui/card/index.js';
  import AgentPromptButton from '#lib/components/app/agent-prompt-button.svelte';
  import PrimitivesBlueprint from '#lib/components/app/blueprint/primitives-blueprint.svelte';
  import PrimitivesMotion from '#lib/components/app/blueprint/primitives-motion.svelte';
  import CategoryThumbnail from '#lib/components/app/component-thumbnails.svelte';
  import PageHeaderDescription from '#lib/components/app/page-header-description.svelte';
  import PageHeaderHeading from '#lib/components/app/page-header-heading.svelte';
  import {
    allComponents,
    type RegistryUIEntry
  } from '#lib/registry/generated-registry-components.js';
  import { allParticles } from '#lib/registry/registry-particles.js';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  const description = $derived(data.SEO.description);

  const particleCount = Object.keys(allParticles).length;

  const landingEntries = Object.entries(allComponents).sort(([a], [b]) => a.localeCompare(b));
</script>

{#snippet categoryCard(slug: string, meta: RegistryUIEntry)}
  <CardFrame
    class="w-full after:pointer-events-none after:absolute after:-inset-[5px] after:-z-1 after:rounded-[calc(var(--radius-xl)+4px)] after:border after:border-border/64"
  >
    <CardFrameHeader class="static grid grid-rows-[auto_1fr]">
      <CardFrameTitle
        class="font-bold font-heading text-base [font-variation-settings:'GEOM'_50,'opsz'_32]"
      >
        <h2>
          <a class="before:absolute before:inset-0" href={resolve(`particles?tags=${slug}`)}
            >{meta.name}</a
          >
        </h2>
      </CardFrameTitle>
      <CardFrameDescription class="line-clamp-2 sm:h-[2lh]">
        <p>{meta.description || '\u00A0'}</p>
      </CardFrameDescription>
    </CardFrameHeader>
    <Card
      class="pointer-events-none min-h-55 flex-1 flex-col flex-wrap overflow-x-auto bg-[color-mix(in_srgb,var(--color-card),var(--color-sidebar))] dark:bg-background"
    >
      {#if meta.istodo}
        <Badge class="absolute end-3 top-3" variant="warning">To do</Badge>
      {:else if meta.isnew}
        <Badge class="absolute end-3 top-3" variant="info">New</Badge>
      {/if}
      <CardPanel
        class="flex flex-1 items-center justify-center px-8 [--border:--alpha(var(--color-black)/7%)] [--btn-from:--alpha(var(--color-primary)/90%)] [--btn-to:var(--color-primary)] in-[[data-slot=card-frame]:has(a:not(:hover))]:*:translate-y-0.5 *:transition-transform *:duration-200 dark:[--border:--alpha(var(--color-white)/3%)] dark:[--btn-from:var(--color-primary)] dark:[--btn-to:--alpha(var(--color-primary)/90%)]"
        ><CategoryThumbnail {slug} /></CardPanel
      >
    </Card>
  </CardFrame>
{/snippet}

<section
  class="container grid w-full items-center gap-6 py-10 md:py-14 lg:grid-cols-2 lg:gap-10 lg:py-28 xl:gap-16"
>
  <div
    class="flex w-full min-w-0 max-w-xl flex-col items-start gap-5 [font-optical-sizing:auto] [font-synthesis:none]"
  >
    <PageHeaderHeading
      class="text-balance text-[clamp(2.25rem,1.5rem+2.6vw,4rem)] leading-none [font-variation-settings:'GEOM'_50] lg:text-[clamp(2.25rem,1.5rem+2.6vw,4rem)]"
    >
      A modern Svelte UI component library.
    </PageHeaderHeading>
    <PageHeaderDescription>{description}</PageHeaderDescription>
    <div class="mt-1 flex flex-wrap gap-2">
      <Button size="lg"><a href={resolve('docs')}>Get started</a></Button>
      <AgentPromptButton />
      <Button size="lg" variant="outline"
        ><a href={resolve('particles')}>Browse {particleCount} particles</a></Button
      >
    </div>
  </div>
  <div class="pointer-events-none mx-auto hidden w-full max-w-140 select-none lg:-my-24 lg:block">
    <PrimitivesMotion>
      <PrimitivesBlueprint />
    </PrimitivesMotion>
  </div>
</section>
<div class="relative before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-border/64">
  <!-- that decoration-->
  <div
    aria-hidden="true"
    class="container pointer-events-none absolute inset-0 z-50 before:absolute before:top-[-3.5px] before:left-[-11.5px] before:z-1 before:-ml-1 before:size-2 before:rounded-[2px] before:border before:border-border before:bg-popover before:bg-clip-padding before:shadow-xs after:absolute after:top-[-3.5px] after:right-[-11.5px] after:z-1 after:-mr-1 after:size-2 after:rounded-[2px] after:border after:border-border after:bg-background after:bg-clip-padding after:shadow-xs dark:after:bg-clip-border dark:before:bg-clip-border"
  ></div>
  <div class="container w-full">
    <div class="grid gap-6 pt-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
      {#each landingEntries as [id, meta] (id)}
        {@render categoryCard(id, meta)}
      {/each}
    </div>
  </div>
</div>
