<script lang="ts">
  import { boxWith, mergeProps } from 'svelte-toolbelt';
  import { createId } from '../ids';
  import { PinInputCellState } from '../pin-input-state.svelte';
  import type { PinInputCellProps } from '../types';

  const uid = $props.id();

  let {
    id = createId(uid),
    ref = $bindable(null),
    cell,
    child,
    children,
    ...restProps
  }: PinInputCellProps = $props();

  const cellState = PinInputCellState.create({
    id: boxWith(() => id!),
    ref: boxWith(
      () => ref,
      (v) => (ref = v)
    ),
    cell: boxWith(() => cell)
  });

  const mergedProps = $derived(mergeProps(restProps, cellState.props));
</script>

{#if child}
  {@render child({ props: mergedProps })}
{:else}
  <div {...mergedProps}>
    {@render children?.()}
  </div>
{/if}
