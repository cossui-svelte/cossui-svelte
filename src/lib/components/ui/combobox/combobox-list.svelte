<script lang="ts">
  import { Combobox as ComboboxPrimitive } from '@shardsui/svelte/combobox';
  import type { ComponentProps, Snippet } from 'svelte';
  import { ScrollArea } from '$lib/components/ui/scroll-area';
  import { cn } from '$lib/utils';

  type Props = Omit<ComponentProps<typeof ComboboxPrimitive.List>, 'children'> & {
    children?: Snippet;
  };

  let { ref = $bindable(null), class: className, children, ...restProps }: Props = $props();
</script>

<ScrollArea overscrollContain scrollFade scrollbarGutter>
  <ComboboxPrimitive.List
    bind:ref
    class={cn(
      'not-empty:scroll-py-1 not-empty:px-1 not-empty:py-1 in-data-has-overflow-y:pe-3',
      className
    )}
    data-slot="combobox-list"
    {...restProps}
  >
    {@render children?.()}
  </ComboboxPrimitive.List>
</ScrollArea>
