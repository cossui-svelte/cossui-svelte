<script lang="ts">
  import { Drawer as DrawerPrimitive } from '@shardsui/svelte/drawer';
  import type { ComponentProps } from 'svelte';

  let {
    ref = $bindable(null),
    type = 'button',
    ...restProps
  }: ComponentProps<typeof DrawerPrimitive.Trigger> = $props();
</script>

<DrawerPrimitive.Trigger bind:ref data-slot="drawer-trigger" {type} {...restProps} />
