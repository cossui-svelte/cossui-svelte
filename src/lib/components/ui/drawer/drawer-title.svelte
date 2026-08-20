<script lang="ts">
  import { Drawer as DrawerPrimitive } from '@shardsui/svelte/drawer';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: ComponentProps<typeof DrawerPrimitive.Title> = $props();
</script>

<DrawerPrimitive.Title
  bind:ref
  data-slot="drawer-title"
  class={cn('font-heading font-semibold text-xl leading-none', className)}
  {...restProps}
/>
