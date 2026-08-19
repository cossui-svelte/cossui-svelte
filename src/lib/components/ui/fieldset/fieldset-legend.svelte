<script lang="ts">
  import { Fieldset as FieldsetPrimitive } from '@shardsui/svelte/fieldset';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: ComponentProps<typeof FieldsetPrimitive.Legend> = $props();
</script>

<FieldsetPrimitive.Legend
  bind:ref
  class={cn('font-semibold text-foreground', className)}
  data-slot="fieldset-legend"
  {...restProps}
/>
