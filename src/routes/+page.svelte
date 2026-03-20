<script lang="ts">
  import Badge from "$lib/components/ui/badge/badge.svelte";
  import Button from "$lib/components/ui/button.svelte";
  import Card from "$lib/components/ui/card/Card.svelte";
  import CardPanel from "$lib/components/ui/card/CardPanel.svelte";
  import SiteFooter from "$lib/app-components/site-footer.svelte";

  type Category = {
    slug: string;
    name: string;
    description?: string;
  };

  const description = "Built for developers and AI.";

  // TODO: Import from actual config once available
  const categories: Category[] = [];

  // TODO: Populate with pages marked as new
  const PAGES_NEW: string[] = [];

  // TODO: Import actual particle count from registry
  const particleCount = 0;
</script>

<svelte:head>
  <title
    >A new, modern UI component library built on top of Base UI - coss ui</title
  >
  <meta name="description" content={description} />
</svelte:head>

{#snippet categoryCard(slug: string, name: string, desc: string | undefined)}
  {@const href = `/docs/components/${slug}`}
  {@const isNew = PAGES_NEW.includes(href)}
  <div
    class="after:-inset-[5px] after:-z-1 relative flex w-full flex-col rounded-2xl bg-muted/72 p-1 after:pointer-events-none after:absolute after:rounded-[calc(var(--radius-xl)+4px)] after:border after:border-border/64"
    data-slot="card-frame"
  >
    <div
      class="static grid grid-rows-[auto_1fr] p-3"
      data-slot="card-frame-header"
    >
      <div
        class="font-heading text-base font-semibold leading-none"
        data-slot="card-frame-title"
      >
        <h2>
          <a class="before:absolute before:inset-0" {href}>{name}</a>
        </h2>
      </div>
      <div
        class="text-muted-foreground line-clamp-2 text-sm sm:h-[2lh]"
        data-slot="card-frame-description"
      >
        {desc || "\u00A0"}
      </div>
    </div>
    <Card
      class="pointer-events-none min-h-55 flex-1 flex-col flex-wrap overflow-x-auto bg-[color-mix(in_srgb,var(--color-card),var(--color-sidebar))] dark:bg-background"
    >
      {#if isNew}
        <Badge class="absolute end-3 top-3" variant="info">New</Badge>
      {/if}
      <CardPanel
        class="flex flex-1 items-center justify-center px-8 [--border:--alpha(var(--color-black)/7%)] [--btn-from:--alpha(var(--color-primary)/90%)] [--btn-to:var(--color-primary)] in-[[data-slot=card-frame]:has(a:not(:hover))]:*:translate-y-0.5 *:transition-transform *:duration-200 dark:[--border:--alpha(var(--color-white)/3%)] dark:[--btn-from:var(--color-primary)] dark:[--btn-to:--alpha(var(--color-primary)/90%)]"
      >
        <!-- TODO: Render category thumbnail via getCategoryThumbnail(slug) -->
      </CardPanel>
    </Card>
  </div>
{/snippet}

<div class="container w-full">
  <header class="max-w-2xl *:items-start *:text-left" data-slot="page-header">
    <h1
      class="font-heading text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]"
    >
      A new, modern UI component library built on top of Base UI.
    </h1>
    <p class="text-muted-foreground max-w-[750px] text-lg sm:text-xl">
      {description}
    </p>
    <div class="mt-2 flex gap-2">
      <Button href="/docs" size="lg">Get started</Button>
      <Button href="/particles" size="lg" variant="outline">
        Browse {particleCount} particles
      </Button>
    </div>
  </header>
</div>

<div
  class="relative before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-border/64"
>
  <div
    aria-hidden="true"
    class="before:-left-[11.5px] before:-ml-1 after:-right-[11.5px] after:-mr-1 container pointer-events-none absolute inset-0 z-50 before:absolute before:top-[-3.5px] before:z-1 before:size-2 before:rounded-[2px] before:border before:border-border before:bg-popover before:bg-clip-padding before:shadow-xs after:absolute after:top-[-3.5px] after:z-1 after:size-2 after:rounded-[2px] after:border after:border-border after:bg-background after:bg-clip-padding after:shadow-xs dark:after:bg-clip-border dark:before:bg-clip-border"
  ></div>
  <div class="container w-full">
    <div
      class="grid gap-6 pt-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4"
    >
      {#each categories as category (category.slug)}
        {@render categoryCard(
          category.slug,
          category.name,
          category.description,
        )}
      {/each}
    </div>
  </div>
</div>

<!-- <SiteFooter /> -->
