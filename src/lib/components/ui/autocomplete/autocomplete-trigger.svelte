<script lang="ts">
  import { Autocomplete as AutocompletePrimitive } from '@shardsui/svelte/autocomplete';
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import { cn } from '$lib/utils';

  interface Props extends HTMLButtonAttributes {
    children?: Snippet;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<AutocompletePrimitive.Trigger
  class={cn(className)}
  data-slot="autocomplete-trigger"
  {...restProps as Record<string, unknown>}
>
  {@render children?.()}
</AutocompletePrimitive.Trigger>
