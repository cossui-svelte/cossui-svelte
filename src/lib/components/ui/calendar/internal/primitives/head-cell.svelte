<script lang="ts">
  import { boxWith, mergeProps } from 'svelte-toolbelt';
  import { CalendarHeadCellState } from '../calendar-state.svelte';
  import { createId } from '../ids';
  import type { CalendarHeadCellProps } from '../types';

  const uid = $props.id();

  let {
    children,
    child,
    ref = $bindable(null),
    id = createId(uid),
    ...restProps
  }: CalendarHeadCellProps = $props();

  const headCellState = CalendarHeadCellState.create({
    id: boxWith(() => id!),
    ref: boxWith(
      () => ref,
      (v) => (ref = v)
    )
  });

  const mergedProps = $derived(mergeProps(restProps, headCellState.props));
</script>

{#if child}
  {@render child({ props: mergedProps })}
{:else}
  <th {...mergedProps}>
    {@render children?.()}
  </th>
{/if}
