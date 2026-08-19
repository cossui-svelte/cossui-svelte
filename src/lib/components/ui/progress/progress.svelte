<script lang="ts">
  import { Progress as ProgressPrimitive } from '@shardsui/svelte/progress';
  import type { ComponentProps, Snippet } from 'svelte';
  import { cn } from '$lib/utils';
  import ProgressIndicator from './progress-indicator.svelte';
  import ProgressTrack from './progress-track.svelte';

  type Props = Omit<ComponentProps<typeof ProgressPrimitive.Root>, 'children'> & {
    children?: Snippet;
  };

  let { class: className, value = 0, min = 0, max = 100, children, ...restProps }: Props = $props();
</script>

<ProgressPrimitive.Root
  class={cn('flex w-full flex-col gap-2', className)}
  data-slot="progress"
  {value}
  {min}
  {max}
  {...restProps}
>
  {#if children}
    {@render children()}
  {:else}
    <ProgressTrack>
      <ProgressIndicator />
    </ProgressTrack>
  {/if}
</ProgressPrimitive.Root>
