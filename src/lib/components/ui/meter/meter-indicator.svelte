<script lang="ts">
  import { Meter as MeterPrimitive } from '@shardsui/svelte/meter';
  import type { ComponentProps, Snippet } from 'svelte';
  import { cn } from '$lib/utils';

  type Props = Omit<ComponentProps<typeof MeterPrimitive.Indicator>, 'children'> & {
    children?: Snippet;
  };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<MeterPrimitive.Indicator
  class={cn('bg-primary transition-all duration-500', className)}
  data-slot="meter-indicator"
  {...restProps}
>
  {@render children?.()}
</MeterPrimitive.Indicator>
