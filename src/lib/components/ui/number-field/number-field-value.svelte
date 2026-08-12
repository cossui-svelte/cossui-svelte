<script lang="ts">
  import type { Snippet } from 'svelte';
  import { getContext } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '$lib/utils';
  import { NUMBER_FIELD_CONTEXT_KEY, type NumberFieldContext } from './number-field.svelte';

  interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
    /** Custom rendering for the value, receives the current value. Defaults to the raw number. */
    children?: Snippet<[{ value: number | undefined }]>;
  }

  let { class: className, children, ...restProps }: Props = $props();

  const ctx = getContext<NumberFieldContext>(NUMBER_FIELD_CONTEXT_KEY);
</script>

<span
  class={cn('inline-flex items-center justify-center font-medium text-sm tabular-nums', className)}
  data-slot="number-field-value"
  {...restProps}
>
  {#if children}
    {@render children({ value: ctx?.value })}
  {:else}
    {ctx?.value}
  {/if}
</span>
