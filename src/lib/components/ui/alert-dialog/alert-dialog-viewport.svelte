<script lang="ts">
  import { AlertDialog as AlertDialogPrimitive } from '@shardsui/svelte/alert-dialog';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let { class: className, ...restProps }: ComponentProps<typeof AlertDialogPrimitive.Viewport> =
    $props();
</script>

<AlertDialogPrimitive.Viewport
  class={cn('fixed inset-0 z-50 grid grid-rows-[1fr_auto_3fr] justify-items-center p-4', className)}
  data-slot="alert-dialog-viewport"
  {...restProps}
/>
