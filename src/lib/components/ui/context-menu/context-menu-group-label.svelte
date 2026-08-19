<script lang="ts">
  import { ContextMenu as ContextMenuPrimitive } from '@shardsui/svelte/context-menu';
  import type { ComponentProps, Snippet } from 'svelte';
  import { cn } from '$lib/utils';

  type Props = Omit<ComponentProps<typeof ContextMenuPrimitive.GroupLabel>, 'children'> & {
    children?: Snippet;
    inset?: boolean;
  };

  let { children, class: className, inset, ...restProps }: Props = $props();
</script>

<ContextMenuPrimitive.GroupLabel
  class={cn(
    'px-2 py-1.5 font-medium text-muted-foreground text-xs data-inset:ps-9 sm:data-inset:ps-8',
    className
  )}
  data-inset={inset}
  data-slot="context-menu-label"
  {...restProps}
>
  {@render children?.()}
</ContextMenuPrimitive.GroupLabel>
