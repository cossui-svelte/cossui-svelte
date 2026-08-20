<script lang="ts">
  import { AlertDialog as AlertDialogPrimitive } from '@shardsui/svelte/alert-dialog';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: ComponentProps<typeof AlertDialogPrimitive.Description> = $props();
</script>

<AlertDialogPrimitive.Description
  bind:ref
  data-slot="alert-dialog-description"
  class={cn('text-muted-foreground text-sm', className)}
  {...restProps}
/>
