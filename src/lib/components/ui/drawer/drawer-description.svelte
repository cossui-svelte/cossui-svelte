<script lang="ts">
  import { Drawer as DrawerPrimitive } from '@shardsui/svelte/drawer';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: ComponentProps<typeof DrawerPrimitive.Description> = $props();
</script>

<DrawerPrimitive.Description
  bind:ref
  class={cn('text-muted-foreground text-sm', className)}
  data-slot="drawer-description"
  {...restProps}
/>
