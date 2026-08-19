<script lang="ts">
  import { Meter as MeterPrimitive } from '@shardsui/svelte/meter';
  import type { ComponentProps, Snippet } from 'svelte';
  import { cn } from '$lib/utils';
  import MeterIndicator from './meter-indicator.svelte';
  import MeterTrack from './meter-track.svelte';

  type Props = Omit<ComponentProps<typeof MeterPrimitive.Root>, 'children'> & {
    children?: Snippet;
  };

  let { class: className, value = 0, min = 0, max = 100, children, ...restProps }: Props = $props();
</script>

<MeterPrimitive.Root
  class={cn('flex w-full flex-col gap-2', className)}
  data-slot="meter"
  {value}
  {min}
  {max}
  {...restProps}
>
  {#if children}
    {@render children()}
  {:else}
    <MeterTrack>
      <MeterIndicator />
    </MeterTrack>
  {/if}
</MeterPrimitive.Root>
