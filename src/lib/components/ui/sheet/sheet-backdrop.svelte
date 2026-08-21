<script lang="ts">
  import { Dialog as SheetPrimitive } from '@shardsui/svelte/dialog';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let { class: className, ...restProps }: ComponentProps<typeof SheetPrimitive.Backdrop> = $props();
</script>

<SheetPrimitive.Backdrop
  class={cn(
    'fixed inset-0 z-50 bg-black/32 backdrop-blur-sm transition-all duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0',
    className
  )}
  data-slot="sheet-backdrop"
  {...restProps}
/>
