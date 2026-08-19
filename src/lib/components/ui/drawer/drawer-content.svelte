<script lang="ts">
  import { Drawer as DrawerPrimitive } from '@shardsui/svelte/drawer';
  import type { ComponentProps } from 'svelte';

  let { ref = $bindable(null), ...restProps }: ComponentProps<typeof DrawerPrimitive.Content> =
    $props();
</script>

<DrawerPrimitive.Content bind:ref {...restProps} />
