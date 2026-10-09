<script lang="ts">
  import EllipsisIcon from '@lucide/svelte/icons/ellipsis';
  import PlusIcon from '@lucide/svelte/icons/plus';
  import { Button, buttonVariants } from '#lib/components/ui/button/index.js';
  import { cn } from '#lib/utils.js';
  import { navFooterItems, navMainItems } from '../lib/navigation-data.js';
  import { href, router } from '../lib/router.svelte.js';
  import { useScrollHide } from '../lib/scroll-hide.svelte.js';
  import {
    AdaptiveMenu,
    AdaptiveMenuGroup,
    AdaptiveMenuItem,
    AdaptiveMenuPopup,
    AdaptiveMenuSeparator,
    AdaptiveMenuTrigger
  } from './adaptive-menu/index.js';
  import WorkflowsBadge from './workflows-badge.svelte';

  const primaryNavItems = navMainItems.slice(0, 3);
  const remainingMainItems = navMainItems.slice(3);

  const isHidden = useScrollHide();
</script>

<footer
  class={cn(
    'fixed inset-x-0 bottom-0 z-50 flex items-center justify-center gap-2 pb-4 transition-transform duration-500 ease-in-out before:pointer-events-none before:absolute before:inset-x-0 before:-bottom-1 before:h-[200%] before:bg-linear-to-t before:from-60% before:from-background before:transition-opacity before:duration-500 before:ease-in-out md:hidden',
    isHidden.current ? 'translate-y-full before:opacity-0' : 'translate-y-0 before:opacity-100'
  )}
>
  <div
    class="relative flex w-fit items-center justify-around gap-1 rounded-full border bg-popover p-1 shadow-black/5 shadow-lg backdrop-blur-sm before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/6%)]"
  >
    {#each primaryNavItems as item (item.title)}
      <a
        aria-current={router.isWithin(item.matchPath ?? item.url) ? 'page' : undefined}
        class="flex size-11 items-center justify-center rounded-full text-sidebar-foreground/80 aria-[current=page]:bg-sidebar-accent aria-[current=page]:text-sidebar-accent-foreground"
        href={href(item.url)}
      >
        <item.icon class="size-5" />
      </a>
    {/each}
    <AdaptiveMenu>
      <AdaptiveMenuTrigger
        aria-label="More options"
        class={cn(buttonVariants({ variant: 'ghost' }), 'size-11! rounded-full')}
      >
        <EllipsisIcon class="size-5" aria-hidden="true" />
      </AdaptiveMenuTrigger>
      <AdaptiveMenuPopup>
        <AdaptiveMenuGroup>
          {#each remainingMainItems as item (item.title)}
            <AdaptiveMenuItem href={href(item.url)}>
              <item.icon />
              <span>{item.title}</span>
              {#if item.title === 'Workflows'}
                <WorkflowsBadge class="ms-2" />
              {/if}
            </AdaptiveMenuItem>
          {/each}
        </AdaptiveMenuGroup>
        <AdaptiveMenuSeparator />
        <AdaptiveMenuGroup>
          {#each navFooterItems as item (item.title)}
            <AdaptiveMenuItem href={href(item.url)}>
              <item.icon />
              <span>{item.title}</span>
            </AdaptiveMenuItem>
          {/each}
        </AdaptiveMenuGroup>
      </AdaptiveMenuPopup>
    </AdaptiveMenu>
  </div>
  <Button class="size-12 rounded-full sm:size-12">
    <PlusIcon class="size-5" />
  </Button>
</footer>
