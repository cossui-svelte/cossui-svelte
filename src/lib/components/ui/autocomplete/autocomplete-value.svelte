<script lang="ts">
  import { Autocomplete as AutocompletePrimitive } from '@shardsui/svelte/autocomplete';
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '$lib/utils';

  interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
    children?: Snippet<[string]>;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<span
  class={cn(className)}
  data-slot="autocomplete-value"
  {...restProps as Record<string, unknown>}
>
  <AutocompletePrimitive.Value {children} />
</span>
