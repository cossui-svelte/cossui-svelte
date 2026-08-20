<script lang="ts">
  import { ContextMenu as ContextMenuPrimitive } from '@shardsui/svelte/context-menu';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let { class: className, ...restProps }: ComponentProps<typeof ContextMenuPrimitive.Separator> =
    $props();
</script>

<ContextMenuPrimitive.Separator
  class={cn('mx-2 my-1 h-px bg-border', className)}
  data-slot="context-menu-separator"
  {...restProps}
/>
