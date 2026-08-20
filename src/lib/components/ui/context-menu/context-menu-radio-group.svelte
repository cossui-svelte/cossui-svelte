<script lang="ts">
  import { ContextMenu as ContextMenuPrimitive } from '@shardsui/svelte/context-menu';
  import type { ComponentProps, Snippet } from 'svelte';

  type Props = Omit<ComponentProps<typeof ContextMenuPrimitive.RadioGroup>, 'children'> & {
    children?: Snippet;
  };

  let { children, value = $bindable(), ...restProps }: Props = $props();
</script>

<ContextMenuPrimitive.RadioGroup bind:value data-slot="context-menu-radio-group" {...restProps}>
  {@render children?.()}
</ContextMenuPrimitive.RadioGroup>
