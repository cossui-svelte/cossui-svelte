<script lang="ts" module>
  import type { Component } from 'svelte';

  export type Tab = {
    icon?: Component<{ class?: string }>;
    title: string;
    url: string;
  };

  export type TabbedNavProps = {
    ariaLabel?: string;
    class?: string;
    dataSlot?: string;
    tabs: Tab[];
  };

  function readView(): string | null {
    if (typeof window === 'undefined') return null;
    const query = window.location.hash.split('?')[1];
    return new URLSearchParams(query ?? '').get('view');
  }
</script>

<script lang="ts">
  import { cn } from '#lib/utils.js';
  import { href, router } from '../../lib/router.svelte.js';

  let { ariaLabel, class: className, dataSlot, tabs }: TabbedNavProps = $props();

  let currentView = $state<string | null>(readView());

  $effect(() => {
    const sync = () => {
      currentView = readView();
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  });

  const pathname = $derived(router.path);
  const anyTabHasQuery = $derived(tabs.some((t) => t.url.includes('?')));

  function isTabActive(tab: Tab): boolean {
    const tabUrl = tab.url.split('?')[0];
    const tabHasQuery = tab.url.includes('?');
    const tabView = tab.url.split('?view=')[1];

    if (anyTabHasQuery) {
      if (tabHasQuery) {
        return pathname === tabUrl && tabView === currentView;
      }
      return pathname === tabUrl && !currentView;
    }
    return pathname === tabUrl;
  }
</script>

<nav
  aria-label={ariaLabel}
  class={cn(
    'flex w-fit items-center gap-x-0.5 rounded-lg bg-muted p-0.5 text-muted-foreground/72',
    className
  )}
  data-slot={dataSlot}
>
  {#each tabs as tab (tab.url)}
    {@const isActive = isTabActive(tab)}
    {@const isIconOnly = !!tab.icon}
    <a
      aria-current={isActive ? 'page' : undefined}
      aria-label={isIconOnly ? tab.title : undefined}
      class={cn(
        'relative flex h-8 shrink-0 cursor-pointer items-center justify-center rounded-md font-medium text-sm outline-none transition-[color,background-color,box-shadow] not-aria-[current=page]:hover:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring aria-[current=page]:bg-background aria-[current=page]:text-foreground aria-[current=page]:shadow-sm/5 dark:aria-[current=page]:bg-input',
        isIconOnly ? 'w-8' : 'gap-1.5 whitespace-nowrap px-2.5'
      )}
      href={href(tab.url)}
    >
      {#if tab.icon}
        <tab.icon class="size-4" />
      {:else}
        {tab.title}
      {/if}
    </a>
  {/each}
</nav>
