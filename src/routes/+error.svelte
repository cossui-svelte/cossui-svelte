<script lang="ts">
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import { Button } from '#lib/components/ui/button/index.js';
  import NotFoundBlueprint from '#lib/components/app/blueprint/not-found-blueprint.svelte';
  import NotFoundMotion from '#lib/components/app/blueprint/not-found-motion.svelte';
  import PageHeaderDescription from '#lib/components/app/page-header-description.svelte';
  import PageHeaderHeading from '#lib/components/app/page-header-heading.svelte';
  import RiArrowLeftLine from '#lib/components/icons/ArrowLeftLineArrows.svelte';
</script>

<svelte:head>
  <title>Page Not Found {page.status}: {page.error?.message}</title>
  <meta
    name="description"
    content="The page you’re looking for doesn’t exist or may have been moved."
  />
</svelte:head>

<section
  class="container flex w-full flex-1 flex-col items-center gap-5 py-10 text-center [font-optical-sizing:auto] [font-synthesis:none] md:py-14 lg:py-16"
>
  <div class="pointer-events-none w-full max-w-140 select-none lg:-my-12">
    <NotFoundMotion>
      <NotFoundBlueprint />
    </NotFoundMotion>
  </div>
  <PageHeaderHeading class="text-balance leading-[1.08] [font-variation-settings:'GEOM'_50]">
    Page Not Found
  </PageHeaderHeading>
  <PageHeaderDescription class="max-w-md text-pretty">
    The page you’re looking for doesn’t exist or may have been moved.
  </PageHeaderDescription>
  <div class="mt-1">
    <Button class="group" size="lg">
      <a class="flex items-center gap-1" href={resolve('/')}>
        <RiArrowLeftLine aria-hidden="true" class="opacity-60" />Back to Home
      </a>
    </Button>
  </div>
</section>
