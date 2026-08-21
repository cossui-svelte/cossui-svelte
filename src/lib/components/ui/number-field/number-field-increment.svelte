<script lang="ts">
  import PlusIcon from '@lucide/svelte/icons/plus';
  import type { Snippet } from 'svelte';
  import { getContext } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import { cn } from '$lib/utils';
  import { NUMBER_FIELD_CONTEXT_KEY, type NumberFieldContext } from './number-field.svelte';
  import { createPressRepeat } from './number-field-press-repeat.svelte';

  type Props = Omit<HTMLButtonAttributes, 'type' | 'disabled' | 'onclick'> & {
    /** Custom rendering for the icon, defaults to a plus icon. */
    children?: Snippet;
  };

  let { class: className, children, ...restProps }: Props = $props();

  const ctx = getContext<NumberFieldContext>(NUMBER_FIELD_CONTEXT_KEY);

  let isAtMax = $derived(
    ctx?.value !== undefined && ctx?.max !== undefined ? ctx.value >= ctx.max : false
  );

  const pressRepeat = createPressRepeat(
    () => ctx?.increment(),
    () => ctx?.disabled || isAtMax
  );
</script>

<button
  type="button"
  aria-label="Increase"
  disabled={ctx?.disabled || isAtMax}
  class={cn(
    'relative flex shrink-0 cursor-pointer items-center justify-center rounded-e-[calc(var(--radius-lg)-1px)] in-data-[size=sm]:px-[calc(--spacing(2.5)-1px)] px-[calc(--spacing(3)-1px)] transition-colors pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11 hover:bg-accent disabled:pointer-events-none disabled:opacity-50',
    className
  )}
  data-slot="number-field-increment"
  {...pressRepeat}
  {...restProps}
>
  {#if children}
    {@render children()}
  {:else}
    <PlusIcon />
  {/if}
</button>
