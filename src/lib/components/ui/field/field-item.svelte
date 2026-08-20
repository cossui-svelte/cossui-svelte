<script lang="ts">
  import { Field as FieldPrimitive } from '@shardsui/svelte/field';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: ComponentProps<typeof FieldPrimitive.Item> = $props();
</script>

<FieldPrimitive.Item bind:ref class={cn('flex', className)} data-slot="field-item" {...restProps} />
