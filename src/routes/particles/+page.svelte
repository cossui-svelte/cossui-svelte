<script lang="ts">
  import { browser } from '$app/env';
  import { page } from '$app/state';
  import ParticlesBlueprint from '#lib/components/app/blueprint/particles-blueprint.svelte';
  import ParticlesMotion from '#lib/components/app/blueprint/particles-motion.svelte';
  import PageHeaderDescription from '#lib/components/app/page-header-description.svelte';
  import PageHeaderHeading from '#lib/components/app/page-header-heading.svelte';
  import { isValidRegistryCategory, type RegistryCategory } from '#lib/registry/registry-tags.js';
  import type { PageData } from './$types';
  import ParticlesDisplay from './particles-display.svelte';
  import SearchContainer from './search-container.svelte';

  let { data }: { data: PageData } = $props();

  const description = $derived(data.SEO.description);

  const selectedCategories = $derived.by(() => {
    if (!browser) return { hasInvalid: false, valid: [] };

    const rawCategories = page.url.searchParams.get('tags')?.split(',').filter(Boolean) ?? [];
    const validCategories = rawCategories.filter(isValidRegistryCategory) as RegistryCategory[];

    const hasInvalid = rawCategories.some((c) => !isValidRegistryCategory(c));
    return { hasInvalid, valid: validCategories };
  });
</script>

<section
  class="container grid w-full items-center gap-6 py-10 md:py-14 lg:grid-cols-2 lg:gap-10 lg:py-28 xl:gap-16"
>
  <div
    class="flex w-full min-w-0 max-w-xl flex-col items-start gap-5 [font-optical-sizing:auto] [font-synthesis:none]"
  >
    <PageHeaderHeading
      class="text-balance text-[clamp(2.25rem,1.5rem+2.6vw,4rem)] leading-none [font-variation-settings:'GEOM'_50] lg:text-[clamp(2.25rem,1.5rem+2.6vw,4rem)]"
    >
      Build more with Particles.
    </PageHeaderHeading>
    <PageHeaderDescription class="text-pretty">
      {description}
    </PageHeaderDescription>
    <div class="mt-2 min-h-12 w-full sm:min-h-11">
      <SearchContainer />
    </div>
  </div>
  <div class="pointer-events-none mx-auto hidden w-full max-w-140 select-none lg:-my-24 lg:block">
    <ParticlesMotion>
      <ParticlesBlueprint />
    </ParticlesMotion>
  </div>
</section>
<div
  class="relative flex-1 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-border/64"
>
  <div
    aria-hidden="true"
    class="container pointer-events-none absolute inset-0 z-50 before:absolute before:top-[-3.5px] before:left-[-11.5px] before:z-1 before:-ml-1 before:size-2 before:rounded-[2px] before:border before:border-border before:bg-popover before:bg-clip-padding before:shadow-xs after:absolute after:top-[-3.5px] after:right-[-11.5px] after:z-1 after:-mr-1 after:size-2 after:rounded-[2px] after:border after:border-border after:bg-background after:bg-clip-padding after:shadow-xs dark:after:bg-clip-border dark:before:bg-clip-border"
  ></div>
  <div class="container w-full pt-8 md:pt-12">
    {#if selectedCategories.hasInvalid}
      <div class="text-center">
        <p class="text-muted-foreground">No particles found for the selected filters</p>
      </div>
    {:else if selectedCategories.valid.length > 0}
      <ParticlesDisplay selectedCategories={selectedCategories.valid} />
    {/if}
  </div>
</div>
