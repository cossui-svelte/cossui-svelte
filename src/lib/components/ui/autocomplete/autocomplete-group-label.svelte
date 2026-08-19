<script lang="ts">
  import { Autocomplete as AutocompletePrimitive } from '@shardsui/svelte/autocomplete';
  import type { ComponentProps, Snippet } from 'svelte';
  import { cn } from '$lib/utils';

  type Props = Omit<ComponentProps<typeof AutocompletePrimitive.GroupLabel>, 'children'> & {
    children?: Snippet;
  };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<AutocompletePrimitive.GroupLabel
  class={cn('px-2 py-1.5 font-medium text-muted-foreground text-xs', className)}
  data-slot="autocomplete-group-label"
  {...restProps}
>
  {@render children?.()}
</AutocompletePrimitive.GroupLabel>
