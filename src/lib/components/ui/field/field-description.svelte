<script lang="ts">
  import { box, mergeProps } from 'svelte-toolbelt';
  import { cn, type WithElementRef } from '$lib/utils';
  import { useDescription } from '$lib/components/ui/form/form-field-state.svelte.js';
  import { useId } from '$lib/components/ui/form/internal/id';
  import type { DescriptionProps } from './types.js';

  let {
    id = useId(),
    ref = $bindable(null),
    class: className,
    children,
    child,
    ...restProps
  }: WithElementRef<DescriptionProps> = $props();

  const descriptionState = useDescription({
    id: box.with(() => id),
    ref: box.with(
      () => ref,
      (v) => (ref = v)
    )
  });

  const mergedProps = $derived(
    mergeProps(
      { 'data-slot': 'field-description', class: cn('text-muted-foreground text-xs', className), ...restProps },
      descriptionState.props
    )
  );
</script>

{#if child}
  {@render child({ props: mergedProps })}
{:else}
  <div {...mergedProps}>
    {@render children?.()}
  </div>
{/if}
