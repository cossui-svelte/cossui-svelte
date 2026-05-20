<script lang="ts" generics="T extends Record<string, unknown>">
import type { ComponentProps, Snippet } from 'svelte';
import type { FormPath } from 'sveltekit-superforms';
import type { Fieldset } from '$lib/formsnap';
import { cn } from '$lib/utils.js';
import { getFormContext } from '../form/form-context.svelte';

let {
  ref = $bindable(null),
  class: className,
  children,

  ...restProps
}: Omit<ComponentProps<typeof Fieldset>, 'form'> & {
  children: Snippet;

  name: FormPath<T>;
} = $props();

const form = getFormContext();
</script>

<Fieldset
  bind:ref
  {form}
  data-slot="fieldset"
  class={cn("flex w-full max-w-64 flex-col gap-6", className)}
  {...restProps}
>
  {@render children?.()}
</Fieldset>
