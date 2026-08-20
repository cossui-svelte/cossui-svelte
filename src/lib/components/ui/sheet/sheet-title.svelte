<script lang="ts">
  import { Dialog as SheetPrimitive } from '@shardsui/svelte/dialog';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: ComponentProps<typeof SheetPrimitive.Title> = $props();
</script>

<SheetPrimitive.Title
  bind:ref
  data-slot="sheet-title"
  class={cn('font-heading font-semibold text-xl leading-none', className)}
  {...restProps}
/>
