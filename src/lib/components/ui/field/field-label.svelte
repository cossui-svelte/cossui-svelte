<script lang="ts">
  import { Field as FieldPrimitive } from '@shardsui/svelte/field';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: ComponentProps<typeof FieldPrimitive.Label> = $props();
</script>

<FieldPrimitive.Label
  bind:ref
  class={cn(
    'inline-flex items-center gap-2 font-medium text-base/4.5 text-foreground data-disabled:opacity-64 sm:text-sm/4',
    className
  )}
  data-slot="field-label"
  {...restProps}
/>
