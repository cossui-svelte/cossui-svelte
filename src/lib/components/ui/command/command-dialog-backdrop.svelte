<script lang="ts">
  import { Dialog as CommandDialogPrimitive } from '@shardsui/svelte/dialog';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let { class: className, ...restProps }: ComponentProps<typeof CommandDialogPrimitive.Backdrop> =
    $props();
</script>

<CommandDialogPrimitive.Backdrop
  class={cn(
    'fixed inset-0 z-50 bg-black/32 backdrop-blur-sm transition-all duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0',
    className
  )}
  data-slot="command-dialog-backdrop"
  {...restProps}
/>
