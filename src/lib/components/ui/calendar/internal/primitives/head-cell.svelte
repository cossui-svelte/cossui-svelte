<script lang="ts">
  import { boxWith, mergeProps } from 'svelte-toolbelt';
  import { CalendarHeadCellState } from '../calendar-state.svelte';
  import type { CalendarHeadCellProps } from '../types';
  import { createId } from '../ids';

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
