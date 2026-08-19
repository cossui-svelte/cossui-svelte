<script lang="ts">
  import { Autocomplete as AutocompletePrimitive } from '@shardsui/svelte/autocomplete';
  import type { ComponentProps, Snippet } from 'svelte';
  import { cn } from '$lib/utils';

  type Props = Omit<ComponentProps<typeof AutocompletePrimitive.Group>, 'children'> & {
    children?: Snippet;
  };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<AutocompletePrimitive.Group
  class={cn('[[role=group]+&]:mt-1.5', className)}
  data-slot="autocomplete-group"
  {...restProps}
>
  {@render children?.()}
</AutocompletePrimitive.Group>
