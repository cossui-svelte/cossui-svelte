<script lang="ts">
  import { Drawer as DrawerPrimitive } from '@shardsui/svelte/drawer';
  import type { ComponentProps } from 'svelte';

  let {
    ref = $bindable(null),
    type = 'button',
    ...restProps
  }: ComponentProps<typeof DrawerPrimitive.Close> = $props();
</script>

<DrawerPrimitive.Close bind:ref data-slot="drawer-close" {type} {...restProps} />
