<script lang="ts">
  import { boxWith, mergeProps } from 'svelte-toolbelt';
  import { CalendarDayState } from '../calendar-state.svelte';
  import { createId } from '../ids';
  import type { CalendarDayProps } from '../types';

  const uid = $props.id();

  let {
    children,
    child,
    ref = $bindable(null),
    id = createId(uid),
    ...restProps
  }: CalendarDayProps = $props();

  const dayState = CalendarDayState.create({
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
