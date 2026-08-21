<script lang="ts">
  import { Autocomplete as AutocompletePrimitive } from '@shardsui/svelte/autocomplete';
  import type { ComponentProps, Snippet } from 'svelte';
  import { ScrollArea } from '$lib/components/ui/scroll-area';
  import { cn } from '$lib/utils';

  type Props = Omit<ComponentProps<typeof AutocompletePrimitive.List>, 'children'> & {
    children?: Snippet;
  };

  let { ref = $bindable(null), class: className, children, ...restProps }: Props = $props();
</script>

<ScrollArea overscrollContain scrollbarGutter scrollFade>
  <AutocompletePrimitive.List
    bind:ref
    class={cn('not-empty:scroll-py-1 not-empty:p-1 in-data-has-overflow-y:pe-3', className)}
    data-slot="autocomplete-list"
    {...restProps}
  >
    {@render children?.()}
  </AutocompletePrimitive.List>
</ScrollArea>
