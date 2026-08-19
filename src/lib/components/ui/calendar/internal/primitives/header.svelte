<script lang="ts">
  import { boxWith, mergeProps } from 'svelte-toolbelt';
  import { CalendarHeaderState } from '../calendar-state.svelte';
  import type { CalendarHeaderProps } from '../types';
  import { createId } from '../ids';

  const uid = $props.id();

  let {
    children,
    child,
    ref = $bindable(null),
    id = createId(uid),
    ...restProps
  }: CalendarHeaderProps = $props();

  const headerState = CalendarHeaderState.create({
    id: boxWith(() => id!),
    ref: boxWith(
      () => ref,
      (v) => (ref = v)
    )
  });

  const mergedProps = $derived(mergeProps(restProps, headerState.props));
</script>

{#if child}
  {@render child({ props: mergedProps })}
{:else}
  <header {...mergedProps}>
    {@render children?.()}
  </header>
{/if}
