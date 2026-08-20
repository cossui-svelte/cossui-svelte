<script lang="ts">
  import { boxWith, mergeProps } from 'svelte-toolbelt';
  import { CalendarGridHeadState } from '../calendar-state.svelte';
  import type { CalendarGridHeadProps } from '../types';
  import { createId } from '../ids';

  const uid = $props.id();

  let {
    children,
    child,
    ref = $bindable(null),
    id = createId(uid),
    ...restProps
  }: CalendarGridHeadProps = $props();

  const gridHeadState = CalendarGridHeadState.create({
    id: boxWith(() => id!),
    ref: boxWith(
      () => ref,
      (v) => (ref = v)
    )
  });

  const mergedProps = $derived(mergeProps(restProps, gridHeadState.props));
</script>

{#if child}
  {@render child({ props: mergedProps })}
{:else}
  <thead {...mergedProps}>
    {@render children?.()}
  </thead>
{/if}
