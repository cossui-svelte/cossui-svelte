<script lang="ts">
  import { Dialog as DialogPrimitive } from '@shardsui/svelte/dialog';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: ComponentProps<typeof DialogPrimitive.Description> = $props();
</script>

<DialogPrimitive.Description
  bind:ref
  data-slot="dialog-description"
  class={cn('text-muted-foreground text-sm', className)}
  {...restProps}
/>
