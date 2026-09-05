<script lang="ts">
  import { cn } from '$lib/utils';

  interface TocItem {
    depth: number;
    title: string;
    url: string;
  }

  interface Props {
    class?: string;
    toc: TocItem[];
  }

  let { toc, class: className }: Props = $props();

  let activeId = $state<string | null>(null);

  $effect(() => {
    const itemIds = toc.map((item) => item.url.replace('#', ''));

    if (!activeId && itemIds.length) {
      activeId = itemIds[0] ?? null;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            activeId = entry.target.id;
          }
        }
      },
      { rootMargin: '0% 0% -80% 0%' }
    );

    for (const id of itemIds) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }

    return () => {
      observer.disconnect();
    };
  });
</script>

{#if toc.length}
  <div class={cn('z-10 flex flex-col gap-1 py-2 ps-6 pe-4 text-sm', className)}>
    <p class="flex h-7 items-center font-medium text-xs">On This Page</p>
    <div
      class="relative ms-3.5 flex flex-col gap-0.5 before:absolute before:inset-y-0 before:-left-3.25 before:w-px before:bg-border"
    >
      <!-- eslint-disable svelte/no-navigation-without-resolve -- item.url is a same-page heading anchor (#id), not an app route -->
      {#each toc as item (item.url)}
        <a
          class="relative py-1 text-[.8125rem] text-sidebar-foreground leading-4.5 no-underline transition-colors before:absolute before:inset-y-px before:-left-3.25 before:w-px before:rounded-full hover:bg-transparent hover:text-foreground data-[active=true]:bg-transparent data-[depth=3]:ps-3.5 data-[depth=4]:ps-5.5 data-[active=true]:text-foreground data-[active=true]:before:w-0.5 data-[active=true]:before:bg-primary"
          data-active={item.url === `#${activeId}`}
          data-depth={item.depth}
          href={item.url}
        >
          {item.title}
        </a>
      {/each}
      <!-- eslint-enable svelte/no-navigation-without-resolve -->
      <!-- eslint-enable svelte/no-navigation-without-resolve -->
      <!-- eslint-enable svelte/no-navigation-without-resolve -->
      <!-- eslint-enable svelte/no-navigation-without-resolve -->
      <!-- eslint-enable svelte/no-navigation-without-resolve -->
      <!-- eslint-enable svelte/no-navigation-without-resolve -->
      <!-- eslint-enable svelte/no-navigation-without-resolve -->
      <!-- eslint-enable svelte/no-navigation-without-resolve -->
      <!-- eslint-enable svelte/no-navigation-without-resolve -->
      <!-- eslint-enable svelte/no-navigation-without-resolve -->
      <!-- eslint-enable svelte/no-navigation-without-resolve -->
      <!-- eslint-enable svelte/no-navigation-without-resolve -->
      <!-- eslint-enable svelte/no-navigation-without-resolve -->
      <!-- eslint-enable svelte/no-navigation-without-resolve -->
      <!-- eslint-enable svelte/no-navigation-without-resolve -->
      <!-- eslint-enable svelte/no-navigation-without-resolve -->
    </div>
  </div>
{/if}
