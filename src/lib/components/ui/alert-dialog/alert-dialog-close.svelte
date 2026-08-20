<script lang="ts">
  import { AlertDialog as AlertDialogPrimitive } from '@shardsui/svelte/alert-dialog';
  import type { ComponentProps } from 'svelte';

  let {
    ref = $bindable(null),
    type = 'button',
    ...restProps
  }: ComponentProps<typeof AlertDialogPrimitive.Close> = $props();
</script>

<AlertDialogPrimitive.Close bind:ref data-slot="alert-dialog-close" {type} {...restProps} />
