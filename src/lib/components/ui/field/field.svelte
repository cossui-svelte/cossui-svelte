<script lang="ts">
  import { Field as FieldPrimitive } from '@shardsui/svelte/field';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: ComponentProps<typeof FieldPrimitive.Root> = $props();
</script>

<FieldPrimitive.Root
  bind:ref
  class={cn('flex flex-col items-start gap-2', className)}
  data-slot="field"
  {...restProps}
/>
