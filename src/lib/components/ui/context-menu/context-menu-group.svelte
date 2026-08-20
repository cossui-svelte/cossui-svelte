<script lang="ts">
  import { ContextMenu as ContextMenuPrimitive } from '@shardsui/svelte/context-menu';
  import type { ComponentProps, Snippet } from 'svelte';

  type Props = Omit<ComponentProps<typeof ContextMenuPrimitive.Group>, 'children'> & {
    children?: Snippet;
  };

  let { children, ...restProps }: Props = $props();
</script>

<ContextMenuPrimitive.Group data-slot="context-menu-group" {...restProps}>
  {@render children?.()}
</ContextMenuPrimitive.Group>
