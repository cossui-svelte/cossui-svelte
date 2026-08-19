<script lang="ts">
  import { Field as FieldPrimitive } from '@shardsui/svelte/field';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: ComponentProps<typeof FieldPrimitive.Error> = $props();
</script>

<FieldPrimitive.Error
  bind:ref
  class={cn('text-destructive-foreground text-xs', className)}
  data-slot="field-error"
  {...restProps}
/>
