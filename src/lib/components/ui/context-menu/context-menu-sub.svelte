<script lang="ts">
  import { ContextMenu as ContextMenuPrimitive } from '@shardsui/svelte/context-menu';
  import type { ComponentProps, Snippet } from 'svelte';

  type Props = Omit<ComponentProps<typeof ContextMenuPrimitive.SubmenuRoot>, 'children'> & {
    children?: Snippet;
  };

  let { children, ...restProps }: Props = $props();
</script>

<ContextMenuPrimitive.SubmenuRoot {...restProps}>
  {@render children?.()}
</ContextMenuPrimitive.SubmenuRoot>
