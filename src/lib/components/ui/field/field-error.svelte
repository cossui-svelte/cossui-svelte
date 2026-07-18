<script lang="ts">
  import { box, mergeProps } from 'svelte-toolbelt';
  import { cn, type WithElementRef } from '$lib/utils';
  import { useFieldErrors } from '$lib/components/ui/form/form-field-state.svelte.js';
  import { useId } from '$lib/components/ui/form/internal/id';
  import type { FieldErrorsProps } from './types.js';

  let {
    id = useId(),
    ref = $bindable(null),
    class: className,
    children: childrenProp,
    ...restProps
  }: WithElementRef<FieldErrorsProps> = $props();

  const fieldErrorsState = useFieldErrors({
    id: box.with(() => id),
    ref: box.with(
      () => ref,
      (v) => (ref = v)
    )
  });

  const mergedProps = $derived(mergeProps(restProps, fieldErrorsState.fieldErrorsProps));
</script>

<div
  bind:this={ref}
  {...mergedProps}
  data-slot="field-error"
  class={cn('text-destructive-foreground text-xs', className)}
>
  {#if childrenProp}
    {@render childrenProp({ errorProps: fieldErrorsState.errorProps, errors: fieldErrorsState.field.errors })}
  {:else}
    {#each fieldErrorsState.field.errors as error, i (i + error)}
      <div {...fieldErrorsState.errorProps}>{error}</div>
    {/each}
  {/if}
</div>
