<script lang="ts">
  import { Drawer as DrawerPrimitive } from '@shardsui/svelte/drawer';
  import type { ComponentProps } from 'svelte';

  let { ...restProps }: ComponentProps<typeof DrawerPrimitive.Portal> = $props();
</script>

<DrawerPrimitive.Portal {...restProps} />
