<script lang="ts">
  import { Menu as MenuPrimitive } from '@shardsui/svelte/menu';
  import type { ComponentProps, Snippet } from 'svelte';
  import { cn } from '$lib/utils';

  type Props = Omit<ComponentProps<typeof MenuPrimitive.LinkItem>, 'children'> & {
    children?: Snippet;
    inset?: boolean;
    variant?: 'default' | 'destructive';
  };

  let { children, class: className, inset, variant = 'default', ...restProps }: Props = $props();
</script>

<MenuPrimitive.LinkItem
  class={cn(
    "[&>svg]:-mx-0.5 flex min-h-8 cursor-default select-none items-center gap-2 rounded-sm px-2 py-1 text-base text-foreground outline-none data-disabled:pointer-events-none data-highlighted:bg-accent data-inset:ps-8 data-[variant=destructive]:text-destructive-foreground data-highlighted:text-accent-foreground data-disabled:opacity-64 sm:min-h-7 sm:text-sm [&>svg:not([class*='opacity-'])]:opacity-80 [&>svg:not([class*='size-'])]:size-4.5 sm:[&>svg:not([class*='size-'])]:size-4 [&>svg]:pointer-events-none [&>svg]:shrink-0",
    className
  )}
  data-inset={inset}
  data-slot="menu-link-item"
  data-variant={variant}
  {...restProps}
>
  {@render children?.()}
</MenuPrimitive.LinkItem>
