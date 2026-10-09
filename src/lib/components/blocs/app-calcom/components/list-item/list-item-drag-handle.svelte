<script lang="ts">
  import GripVerticalIcon from '@lucide/svelte/icons/grip-vertical';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import { Button } from '#lib/components/ui/button/index.js';
  import { cn } from '#lib/utils.js';

  let { class: className, ...restProps }: Omit<HTMLButtonAttributes, 'children'> = $props();
</script>

<Button
  aria-label="Drag to reorder"
  class={cn(
    'pointer-events-auto absolute inset-y-px start-0 z-1 h-auto! cursor-grab items-start bg-transparent! pt-4.25 in-[[data-slot=list-item]:hover,[data-slot=list-item][data-drag-overlay],[data-drag-release]]:opacity-100 opacity-0 not-in-data-drag-release:transition-opacity in-[[data-slot=list-item]:hover]:delay-100 not-in-[[data-slot=list-item]:hover]:duration-50 focus-visible:opacity-100 focus-visible:ring-0 focus-visible:ring-offset-0 active:cursor-grabbing',
    className
  )}
  data-slot="list-item-drag-handle"
  size="icon-xs"
  variant="ghost"
  {...restProps}
>
  <GripVerticalIcon
    aria-hidden="true"
    class="in-[[data-slot=list-item-drag-handle]:focus-visible]:opacity-80 opacity-40"
  />
</Button>
