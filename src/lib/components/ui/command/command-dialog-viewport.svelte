<script lang="ts">
  import { Dialog as CommandDialogPrimitive } from '@shardsui/svelte/dialog';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let { class: className, ...restProps }: ComponentProps<typeof CommandDialogPrimitive.Viewport> =
    $props();
</script>

<CommandDialogPrimitive.Viewport
  class={cn(
    'fixed inset-0 z-50 flex flex-col items-center px-4 py-[max(--spacing(4),4vh)] sm:py-[10vh]',
    className
  )}
  data-slot="command-dialog-viewport"
  {...restProps}
/>
