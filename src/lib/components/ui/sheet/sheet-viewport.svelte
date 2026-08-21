<script lang="ts">
  import { Dialog as SheetPrimitive } from '@shardsui/svelte/dialog';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  type Props = ComponentProps<typeof SheetPrimitive.Viewport> & {
    side?: 'right' | 'left' | 'top' | 'bottom';
    variant?: 'default' | 'inset';
  };

  let { class: className, side, variant = 'default', ...restProps }: Props = $props();
</script>

<SheetPrimitive.Viewport
  class={cn(
    'fixed inset-0 z-50 grid',
    side === 'bottom' && 'grid grid-rows-[1fr_auto] pt-12',
    side === 'top' && 'grid grid-rows-[auto_1fr] pb-12',
    side === 'left' && 'flex justify-start',
    side === 'right' && 'flex justify-end',
    variant === 'inset' && 'sm:p-4',
    className
  )}
  data-slot="sheet-viewport"
  {...restProps}
/>
