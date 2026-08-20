<script lang="ts">
  import { Dialog as DialogPrimitive } from '@shardsui/svelte/dialog';
  import type { ComponentProps } from 'svelte';

  let {
    ref = $bindable(null),
    type = 'button',
    ...restProps
  }: ComponentProps<typeof DialogPrimitive.Trigger> = $props();
</script>

<DialogPrimitive.Trigger bind:ref data-slot="command-dialog-trigger" {type} {...restProps} />
