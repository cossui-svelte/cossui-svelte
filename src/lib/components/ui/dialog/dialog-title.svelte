<script lang="ts">
  import { Dialog as DialogPrimitive } from '@shardsui/svelte/dialog';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: ComponentProps<typeof DialogPrimitive.Title> = $props();
</script>

<DialogPrimitive.Title
  bind:ref
  data-slot="dialog-title"
  class={cn('font-heading font-semibold text-xl leading-none', className)}
  {...restProps}
/>
