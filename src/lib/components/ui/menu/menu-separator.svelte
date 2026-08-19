<script lang="ts">
  import { Menu as MenuPrimitive } from '@shardsui/svelte/menu';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let { class: className, ...restProps }: ComponentProps<typeof MenuPrimitive.Separator> = $props();
</script>

<MenuPrimitive.Separator
  class={cn('mx-2 my-1 h-px bg-border', className)}
  data-slot="menu-separator"
  {...restProps}
/>
