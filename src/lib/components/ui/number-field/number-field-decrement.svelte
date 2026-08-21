<script lang="ts">
  import MinusIcon from '@lucide/svelte/icons/minus';
  import type { Snippet } from 'svelte';
  import { getContext } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import { cn } from '$lib/utils';
  import { NUMBER_FIELD_CONTEXT_KEY, type NumberFieldContext } from './number-field.svelte';
  import { createPressRepeat } from './number-field-press-repeat.svelte';

  type Props = Omit<HTMLButtonAttributes, 'type' | 'disabled' | 'onclick'> & {
    /** Custom rendering for the icon, defaults to a minus icon. */
    children?: Snippet;
  };

  let { class: className, children, ...restProps }: Props = $props();

  const ctx = getContext<NumberFieldContext>(NUMBER_FIELD_CONTEXT_KEY);

  let isAtMin = $derived(
    ctx?.value !== undefined && ctx?.min !== undefined ? ctx.value <= ctx.min : false
  );

  const pressRepeat = createPressRepeat(
    () => ctx?.decrement(),
    () => ctx?.disabled || isAtMin
  );
</script>

<button
  type="button"
  aria-label="Decrease"
  disabled={ctx?.disabled || isAtMin}
  class={cn(
    'relative flex shrink-0 cursor-pointer items-center justify-center rounded-s-[calc(var(--radius-lg)-1px)] in-data-[size=sm]:px-[calc(--spacing(2.5)-1px)] px-[calc(--spacing(3)-1px)] transition-colors pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11 hover:bg-accent disabled:pointer-events-none disabled:opacity-50',
    className
  )}
  data-slot="number-field-decrement"
  {...pressRepeat}
  {...restProps}
>
  {#if children}
    {@render children()}
  {:else}
    <MinusIcon />
  {/if}
</button>
