<script lang="ts">
  import { Meter as MeterPrimitive } from '@shardsui/svelte/meter';
  import type { ComponentProps, Snippet } from 'svelte';
  import { cn } from '$lib/utils';

  type Props = Omit<ComponentProps<typeof MeterPrimitive.Label>, 'children'> & {
    children?: Snippet;
  };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<MeterPrimitive.Label
  class={cn('font-medium text-foreground text-sm', className)}
  data-slot="meter-label"
  {...restProps}
>
  {@render children?.()}
</MeterPrimitive.Label>
