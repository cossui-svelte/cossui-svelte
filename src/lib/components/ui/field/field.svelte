<script lang="ts">
  import { box } from 'svelte-toolbelt';
  import { cn } from '$lib/utils';
  import { getFormContext } from '$lib/components/ui/form/form-context.svelte';
  import { useField } from '$lib/components/ui/form/form-field-state.svelte.js';
  import type { FieldProps } from './types.js';

  const uid = $props.id();

  let {
    class: className,
    name = uid,
    children: childrenProp,
    ...restProps
  }: Omit<FieldProps<Record<string, unknown>, string>, 'form' | 'name'> & {
    class?: string;
    name?: string;
  } = $props();

  const form = getFormContext();

  const fieldState = useField({
    form: box.with(() => form),
    name: box.with(() => name)
  });
</script>

<div
  role="group"
  data-slot="field"
  class={cn('flex flex-col items-start gap-2', className)}
  {...restProps}
>
  {@render childrenProp?.(fieldState.snippetProps)}
</div>
