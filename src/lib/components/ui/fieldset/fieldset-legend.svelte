<script lang="ts">
  import { box, mergeProps } from 'svelte-toolbelt';
  import { cn } from '$lib/utils';
  import { useLegend } from '$lib/components/ui/form/form-field-state.svelte.js';
  import { useId } from '$lib/components/ui/form/internal/id';
  import type { LegendProps } from './types.js';

  let {
    id = useId(),
    ref = $bindable(null),
    class: className,
    children,
    child,
    ...restProps
  }: LegendProps = $props();

  const legendState = useLegend({
    id: box.with(() => id),
    ref: box.with(
      () => ref,
      (v) => (ref = v)
    )
  });

  const mergedProps = $derived(
    mergeProps(
      { 'data-slot': 'fieldset-legend', class: cn('font-semibold text-foreground', className), ...restProps },
      legendState.props
    )
  );
</script>

{#if child}
  {@render child({ props: mergedProps })}
{:else}
  <legend {...mergedProps}>
    {@render children?.()}
  </legend>
{/if}
