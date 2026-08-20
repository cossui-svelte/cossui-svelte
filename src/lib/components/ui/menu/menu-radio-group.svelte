<script lang="ts">
  import { Menu as MenuPrimitive } from '@shardsui/svelte/menu';
  import type { ComponentProps, Snippet } from 'svelte';

  type Props = Omit<ComponentProps<typeof MenuPrimitive.RadioGroup>, 'children'> & {
    children?: Snippet;
  };

  let { children, value = $bindable(), ...restProps }: Props = $props();
</script>

<MenuPrimitive.RadioGroup bind:value data-slot="menu-radio-group" {...restProps}>
  {@render children?.()}
</MenuPrimitive.RadioGroup>
