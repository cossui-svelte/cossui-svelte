<script lang="ts">
  import { AlertDialog as AlertDialogPrimitive } from '@shardsui/svelte/alert-dialog';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: ComponentProps<typeof AlertDialogPrimitive.Title> = $props();
</script>

<AlertDialogPrimitive.Title
  bind:ref
  data-slot="alert-dialog-title"
  class={cn('font-heading font-semibold text-xl leading-none', className)}
  {...restProps}
/>
