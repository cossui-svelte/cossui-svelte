<script lang="ts">
  import { boxWith, mergeProps } from 'svelte-toolbelt';
  import { createId } from '$lib/components/ui/calendar/internal/ids';
  import { RangeCalendarDayState } from '../range-calendar-state.svelte';
  import type { RangeCalendarDayProps } from '../types';

  const uid = $props.id();

  let {
    children,
    child,
    id = createId(uid),
    ref = $bindable(null),
    ...restProps
  }: RangeCalendarDayProps = $props();

  const dayState = RangeCalendarDayState.create({
    id: boxWith(() => id!),
    ref: boxWith(
      () => ref,
      (v) => (ref = v)
    )
  });

  const mergedProps = $derived(mergeProps(restProps, dayState.props));
</script>

{#if child}
  {@render child({ props: mergedProps, ...dayState.snippetProps })}
{:else}
  <div {...mergedProps}>
    {#if children}
      {@render children?.(dayState.snippetProps)}
    {:else}
      {dayState.cell.opts.date.current.day}
    {/if}
  </div>
{/if}
