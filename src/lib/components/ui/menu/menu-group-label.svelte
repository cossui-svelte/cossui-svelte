<script lang="ts">
  import { Menu as MenuPrimitive } from '@shardsui/svelte/menu';
  import type { ComponentProps, Snippet } from 'svelte';
  import { cn } from '$lib/utils';

  type Props = Omit<ComponentProps<typeof MenuPrimitive.GroupLabel>, 'children'> & {
    children?: Snippet;
    inset?: boolean;
  };

  let { children, class: className, inset, ...restProps }: Props = $props();
</script>

<MenuPrimitive.GroupLabel
  class={cn(
    'px-2 py-1.5 font-medium text-muted-foreground text-xs data-inset:ps-9 sm:data-inset:ps-8',
    className
  )}
  data-inset={inset}
  data-slot="menu-label"
  {...restProps}
>
  {@render children?.()}
</MenuPrimitive.GroupLabel>
