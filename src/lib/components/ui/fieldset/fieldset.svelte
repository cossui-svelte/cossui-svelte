<script lang="ts">
  import type { Snippet } from 'svelte';
  import { box, mergeProps, useRefById } from 'svelte-toolbelt';
  import { cn } from '$lib/utils';
  import { getFormContext } from '$lib/components/ui/form/form-context.svelte';
  import { useField } from '$lib/components/ui/form/form-field-state.svelte.js';
  import { getDataFsError } from '$lib/components/ui/form/internal/attributes';
  import { useId } from '$lib/components/ui/form/internal/id';
  import type { FieldsetProps } from './types.js';

  const uid = $props.id();

  let {
    ref = $bindable(null),
    id = useId(),
    class: className,
    name = uid,
    children,
    ...restProps
  }: Omit<FieldsetProps<Record<string, unknown>, string>, 'form' | 'name'> & {
    children: Snippet;
    name?: string;
  } = $props();

  const form = getFormContext();

  const fieldState = useField({
    form: box.with(() => form),
    name: box.with(() => name)
  });

  useRefById({
    id: box.with(() => id),
    ref: box.with(
      () => ref,
      (v) => (ref = v)
    )
  });

  const mergedProps = $derived(
    mergeProps(
      {
        'data-slot': 'fieldset',
        class: cn('flex w-full max-w-64 flex-col gap-6', className),
        ...restProps
      },
      { 'data-fs-fieldset': '', id }
    )
  );
</script>

<fieldset {...mergedProps} data-fs-error={getDataFsError(fieldState.errors)}>
  {@render children?.()}
</fieldset>
