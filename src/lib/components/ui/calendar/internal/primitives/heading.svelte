<script lang="ts">
  import { boxWith, mergeProps } from 'svelte-toolbelt';
  import { CalendarHeadingState } from '../calendar-state.svelte';
  import type { CalendarHeadingProps } from '../types';
  import { createId } from '../ids';

  const uid = $props.id();

  let {
    children,
    child,
    ref = $bindable(null),
    id = createId(uid),
    ...restProps
  }: CalendarHeadingProps = $props();

  const headingState = CalendarHeadingState.create({
    id: boxWith(() => id!),
    ref: boxWith(
      () => ref,
      (v) => (ref = v)
    )
  });

  const mergedProps = $derived(mergeProps(restProps, headingState.props));
</script>

{#if child}
  {@render child({ props: mergedProps, headingValue: headingState.root.headingValue })}
{:else}
  <div {...mergedProps}>
    {#if children}
      {@render children?.({ headingValue: headingState.root.headingValue })}
    {:else}
      {headingState.root.headingValue}
    {/if}
  </div>
{/if}
