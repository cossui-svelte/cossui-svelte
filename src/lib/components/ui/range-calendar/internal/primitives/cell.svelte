<script lang="ts">
  import { boxWith, mergeProps } from 'svelte-toolbelt';
  import { RangeCalendarCellState } from '../range-calendar-state.svelte';
  import type { RangeCalendarCellProps } from '../types';
  import { createId } from '$lib/components/ui/calendar/internal/ids';

  const uid = $props.id();

  let {
    children,
    child,
    id = createId(uid),
    ref = $bindable(null),
    date,
    month,
    ...restProps
  }: RangeCalendarCellProps = $props();

  const cellState = RangeCalendarCellState.create({
    id: boxWith(() => id!),
    ref: boxWith(
      () => ref,
      (v) => (ref = v)
    ),
    date: boxWith(() => date),
    month: boxWith(() => month)
  });

  const mergedProps = $derived(mergeProps(restProps, cellState.props));
</script>

{#if child}
  {@render child({ props: mergedProps, ...cellState.snippetProps })}
{:else}
  <td {...mergedProps}>
    {@render children?.(cellState.snippetProps)}
  </td>
{/if}
