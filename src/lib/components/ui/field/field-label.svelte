<script lang="ts">
  import type { LabelRootProps } from 'bits-ui';
  import type { HTMLAttributes } from 'svelte/elements';
  import { box, mergeProps } from 'svelte-toolbelt';
  import { cn } from '$lib/utils';
  import { getField, getFormControl2, useLabel } from '$lib/components/ui/form/form-field-state.svelte.js';
  import { useId } from '$lib/components/ui/form/internal/id';

  let {
    id = useId(),
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: LabelRootProps & HTMLAttributes<HTMLDivElement> = $props();

  const formField = getField();
  const control = getFormControl2();
  if (!formField && !control) {
    throw new Error('Label must be used within a Field or Control component');
  }

  const labelState = useLabel({
    id: box.with(() => id),
    ref: box.with(
      () => ref,
      (v) => (ref = v)
    )
  });

  const mergedProps = $derived(
    mergeProps(
      {
        'data-slot': 'field-label',
        class: cn(
          'inline-flex items-center gap-2 font-medium text-base/4.5 text-foreground sm:text-sm/4',
          className
        ),
        ...restProps
      },
      labelState.props
    )
  );
</script>

<label {...mergedProps}>
  {@render children?.()}
</label>
