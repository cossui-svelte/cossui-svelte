<script lang="ts">
  import { Menu as MenuPrimitive } from '@shardsui/svelte/menu';
  import type { ComponentProps, Snippet } from 'svelte';

  type Props = Omit<ComponentProps<typeof MenuPrimitive.SubmenuRoot>, 'children'> & {
    children?: Snippet;
  };

  let { children, ...restProps }: Props = $props();
</script>

<MenuPrimitive.SubmenuRoot {...restProps}> {@render children?.()} </MenuPrimitive.SubmenuRoot>
