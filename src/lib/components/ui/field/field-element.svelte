<script lang="ts" module>
  import type { FormPathLeaves as _FormPathLeaves } from 'sveltekit-superforms';

  type T = unknown;
  type U = unknown;
</script>

<script lang="ts" generics="T extends Record<string, unknown>, U extends _FormPathLeaves<T>">
  import { box } from 'svelte-toolbelt';
  import { useElementField } from '$lib/components/ui/form/form-field-state.svelte.js';
  import type { ElementFieldProps } from './types.js';

  let { form, name, children }: ElementFieldProps<T, U> = $props();

  const elementFieldState = useElementField({
    form: box.with(() => form),
    name: box.with(() => name)
  });
</script>

{@render children?.(elementFieldState.snippetProps)}
