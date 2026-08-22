<script lang="ts">
  import { boxWith, mergeProps } from 'svelte-toolbelt';
  import { CalendarNextButtonState } from '../calendar-state.svelte';
  import { createId } from '../ids';
  import type { CalendarNextButtonProps } from '../types';

  const uid = $props.id();

  let {
    children,
    child,
    id = createId(uid),
    ref = $bindable(null),
    // for safari
    tabindex = 0,
    ...restProps
  }: CalendarNextButtonProps = $props();

  const nextButtonState = CalendarNextButtonState.create({
    id: boxWith(() => id!),
    ref: boxWith(
      () => ref,
      (v) => (ref = v)
    )
  });

  const mergedProps = $derived(mergeProps(restProps, nextButtonState.props, { tabindex }));
</script>

{#if child}
  {@render child({ props: mergedProps })}
{:else}
  <button {...mergedProps}>
    {@render children?.()}
  </button>
{/if}
