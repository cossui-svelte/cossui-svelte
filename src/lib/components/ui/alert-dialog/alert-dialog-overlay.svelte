<script lang="ts">
  import { AlertDialog as AlertDialogPrimitive } from '@shardsui/svelte/alert-dialog';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: ComponentProps<typeof AlertDialogPrimitive.Backdrop> = $props();
</script>

<AlertDialogPrimitive.Backdrop
  bind:ref
  data-slot="alert-dialog-backdrop"
  class={cn(
    'fixed inset-0 z-50 bg-black/32 backdrop-blur-sm transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0',
    className
  )}
  {...restProps}
/>
