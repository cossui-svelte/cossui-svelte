<script lang="ts">
  import { Dialog as DialogPrimitive } from '@shardsui/svelte/dialog';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let { class: className, ...restProps }: ComponentProps<typeof DialogPrimitive.Viewport> =
    $props();
</script>

<DialogPrimitive.Viewport
  class={cn('fixed inset-0 z-50 grid grid-rows-[1fr_auto_3fr] justify-items-center p-4', className)}
  data-slot="dialog-viewport"
  {...restProps}
/>
