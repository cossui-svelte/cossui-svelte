<script lang="ts">
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import type { Snippet } from 'svelte';
  import PageHeaderDescription from '#lib/components/app/page-header-description.svelte';
  import PageHeaderHeading from '#lib/components/app/page-header-heading.svelte';
  import PageHeader from '#lib/components/app/page-header.svelte';
  import { blocCategories } from '#lib/components/blocs/bloc-metadata.js';
  import { buttonVariants } from '#lib/components/ui/button/index.js';
  import { cn } from '#lib/utils.js';

  let { children }: { children: Snippet } = $props();

  const isView = $derived(page.route.id === '/blocs/view/[name]');
</script>

{#if isView}
  {@render children()}
{:else}
  <div class="container w-full">
    <PageHeader class="*:pb-8!">
      <PageHeaderHeading>Building Blocs</PageHeaderHeading>
      <PageHeaderDescription class="max-w-2xl">
        Reusable, ready-made parts of your application. Copy and paste into your apps.
      </PageHeaderDescription>
    </PageHeader>

    <nav class="flex flex-wrap justify-center gap-2 pb-10">
      <a
        href={resolve('blocs')}
        class={cn(
          buttonVariants({
            size: 'sm',
            variant: page.route.id === '/blocs' ? 'default' : 'outline'
          }),
          'rounded-full'
        )}
      >
        Featured
      </a>
      {#each blocCategories as category (category.slug)}
        <a
          href={resolve('/blocs/[category]', { category: category.slug })}
          class={cn(
            buttonVariants({
              size: 'sm',
              variant: page.params.category === category.slug ? 'default' : 'outline'
            }),
            'rounded-full'
          )}
        >
          {category.name}
        </a>
      {/each}
    </nav>

    <div class="flex flex-col gap-16 pb-16 md:gap-24">
      {@render children()}
    </div>
  </div>
{/if}
