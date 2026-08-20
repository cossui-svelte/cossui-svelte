<script lang="ts">
  import ChevronRight from '@lucide/svelte/icons/chevron-right';
  import { Menu as MenuPrimitive } from '@shardsui/svelte/menu';
  import type { ComponentProps, Snippet } from 'svelte';
  import { cn } from '$lib/utils';

  type Props = Omit<ComponentProps<typeof MenuPrimitive.SubmenuTrigger>, 'children'> & {
    children?: Snippet;
    inset?: boolean;
  };

  let { children, class: className, inset, ...restProps }: Props = $props();
</script>

<MenuPrimitive.SubmenuTrigger
  class={cn(
    "[&>svg:not(:last-child)]:-mx-0.5 flex min-h-8 items-center gap-2 rounded-sm px-2 py-1 text-base text-foreground outline-none data-disabled:pointer-events-none data-highlighted:bg-accent data-popup-open:bg-accent data-inset:ps-8 data-highlighted:text-accent-foreground data-popup-open:text-accent-foreground data-disabled:opacity-64 sm:min-h-7 sm:text-sm [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
    className
  )}
  data-inset={inset}
  data-slot="menu-sub-trigger"
  {...restProps}
>
  {@render children?.()}
  <ChevronRight class="-me-0.5 ms-auto opacity-80" />
</MenuPrimitive.SubmenuTrigger>
