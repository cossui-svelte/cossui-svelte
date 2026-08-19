<script lang="ts">
  import { Menu as MenuPrimitive } from '@shardsui/svelte/menu';
  import type { ComponentProps, Snippet } from 'svelte';

  type Props = Omit<ComponentProps<typeof MenuPrimitive.Group>, 'children'> & {
    children?: Snippet;
  };

  let { children, ...restProps }: Props = $props();
</script>

<MenuPrimitive.Group data-slot="menu-group" {...restProps}>
  {@render children?.()}
</MenuPrimitive.Group>
