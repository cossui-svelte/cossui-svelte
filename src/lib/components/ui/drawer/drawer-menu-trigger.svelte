<script lang="ts">
  import ChevronRight from '@lucide/svelte/icons/chevron-right';
  import type { ComponentProps, Snippet } from 'svelte';
  import { cn } from '$lib/utils';
  import DrawerTrigger from './drawer-trigger.svelte';

  type Props = Omit<ComponentProps<typeof DrawerTrigger>, 'children'> & { children?: Snippet };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<DrawerTrigger
  class={cn(
    "flex min-h-9 w-full cursor-default select-none items-center gap-2 rounded-sm px-2 py-1 text-base text-foreground outline-none hover:bg-accent hover:text-accent-foreground sm:min-h-8 sm:text-sm [&_svg:not(:last-child)]:-mx-0.5 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
    className
  )}
  data-slot="drawer-menu-trigger"
  {...restProps}
>
  {@render children?.()}
  <ChevronRight class="-me-0.5 ms-auto opacity-80" />
</DrawerTrigger>
