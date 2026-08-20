<script lang="ts">
  import { Field as FieldPrimitive } from '@shardsui/svelte/field';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: ComponentProps<typeof FieldPrimitive.Description> = $props();
</script>

<FieldPrimitive.Description
  bind:ref
  class={cn('text-muted-foreground text-xs', className)}
  data-slot="field-description"
  {...restProps}
/>
