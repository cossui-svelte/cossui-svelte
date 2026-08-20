<script lang="ts">
  import { Dialog as DialogPrimitive } from '@shardsui/svelte/dialog';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: ComponentProps<typeof DialogPrimitive.Backdrop> = $props();
</script>

<DialogPrimitive.Backdrop
  bind:ref
  data-slot="dialog-overlay"
  class={cn(
    'fixed inset-0 z-50 bg-black/32 backdrop-blur-sm transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0',
    className
  )}
  {...restProps}
/>
