<script lang="ts">
  import { Meter as MeterPrimitive } from '@shardsui/svelte/meter';
  import type { ComponentProps, Snippet } from 'svelte';
  import { cn } from '$lib/utils';

  type Props = Omit<ComponentProps<typeof MeterPrimitive.Track>, 'children'> & {
    children?: Snippet;
  };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<MeterPrimitive.Track
  class={cn('block h-2 w-full overflow-hidden rounded-full bg-input', className)}
  data-slot="meter-track"
  {...restProps}
>
  {@render children?.()}
</MeterPrimitive.Track>
