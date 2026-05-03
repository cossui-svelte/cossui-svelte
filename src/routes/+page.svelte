<script lang="ts">
  import PageHeaderDescription from "$lib/components/shared-components/page-header-description.svelte";
  import PageHeaderHeading from "$lib/components/shared-components/page-header-heading.svelte";
  import PageHeader from "$lib/components/shared-components/page-header.svelte";
  import SiteFooter from "$lib/components/shared-components/site-footer.svelte";
  import { Badge } from "$lib/components/ui/badge";
  import { Button } from "$lib/components/ui/button";
  import {
    Card,
    CardFrame,
    CardFrameDescription,
    CardFrameHeader,
    CardFrameTitle,
    CardPanel,
  } from "$lib/components/ui/card";

  type Category = {
    slug: string;
    name: string;
    description?: string;
    thumbnail: string;
  };

  const description = "Built for developers and AI.";

  // TODO: Import from actual config once available
  const categories: Category[] = [];

  // TODO: Populate with pages marked as new
  const PAGES_NEW: string[] = [];

  // TODO: Import actual particle count from registry
  const particleCount = 0;

  // thumbnail={getCategoryThumbnail(category.slug)}
</script>

<svelte:head>
  <title
    >A new, modern UI component library built on top of Bits UI - coss ui-svelte</title
  >
  <meta name="description" content={description} />
</svelte:head>

{#snippet categoryCard(
  slug: string,
  name: string,
  desc: string | undefined,
  thumbnail: string,
)}
  {@const href = `/docs/components/${slug}`}
  {@const isNew = PAGES_NEW.includes(href)}
  <CardFrame
    class="after:-inset-[5px] after:-z-1 w-full after:pointer-events-none after:absolute after:rounded-[calc(var(--radius-xl)+4px)] after:border after:border-border/64"
  >
    <CardFrameHeader class="static grid grid-rows-[auto_1fr]">
      <CardFrameTitle class="font-heading text-base">
        <h2>
          <a class="before:absolute before:inset-0" {href}>{name}</a>
        </h2>
      </CardFrameTitle>
      <CardFrameDescription class="line-clamp-2 sm:h-[2lh]">
        <p>{description || "\u00A0"}</p>
      </CardFrameDescription>
    </CardFrameHeader>
    <Card
      class="pointer-events-none min-h-55 flex-1 flex-col flex-wrap overflow-x-auto bg-[color-mix(in_srgb,var(--color-card),var(--color-sidebar))] dark:bg-background"
    >
      {#if isNew}
        <Badge class="absolute end-3 top-3" variant="info">New</Badge>
      {/if}
      <CardPanel
        class="flex flex-1 items-center justify-center px-8 [--border:--alpha(var(--color-black)/7%)] [--btn-from:--alpha(var(--color-primary)/90%)] [--btn-to:var(--color-primary)] in-[[data-slot=card-frame]:has(a:not(:hover))]:*:translate-y-0.5 *:transition-transform *:duration-200 dark:[--border:--alpha(var(--color-white)/3%)] dark:[--btn-from:var(--color-primary)] dark:[--btn-to:--alpha(var(--color-primary)/90%)]"
      >
        {thumbnail}
      </CardPanel>
    </Card>
  </CardFrame>
{/snippet}

<div class="container w-full">
  <PageHeader class="max-w-2xl *:items-start *:text-left">
    <PageHeaderHeading>
      A new, modern UI component library built on top of Bits UI.
    </PageHeaderHeading>
    <PageHeaderDescription>{description}</PageHeaderDescription>
    <div class="mt-2 flex gap-2">
      <Button size="lg">
        <a href="/docs">Get started</a>
      </Button>
      <Button size="lg" variant="outline">
        <a href="/particles">Browse {particleCount} particles</a>
      </Button>
    </div>
  </PageHeader>
</div>
<div
  class="relative before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-border/64"
>
  <div
    aria-hidden="true"
    class="before:-left-[11.5px] before:-ml-1 after:-right-[11.5px] after:-mr-1 container pointer-events-none absolute inset-0 z-50 before:absolute before:top-[-3.5px] before:z-1 before:size-2 before:rounded-[2px] before:border before:border-border before:bg-popover before:bg-clip-padding before:shadow-xs after:absolute after:top-[-3.5px] after:z-1 after:size-2 after:rounded-[2px] after:border after:border-border after:bg-background after:bg-clip-padding after:shadow-xs dark:after:bg-clip-border dark:before:bg-clip-border"
  />
  <div class="container w-full">
    <div
      class="grid gap-6 pt-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4"
    >
      {#each categories as category (category.slug)}
        {@render categoryCard(
          category.slug,
          category.name,
          category.description,
          category.thumbnail,
        )}
      {/each}
    </div>
  </div>
</div>
<SiteFooter />
