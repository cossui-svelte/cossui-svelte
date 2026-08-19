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

<div
  class="min-h-0 flex-1 **:data-[slot=scroll-area-viewport]:scroll-py-2"
  data-slot="command-list"
>
  <ScrollArea scrollFade scrollbarGutter>
    <AutocompletePrimitive.List bind:ref class={cn('not-empty:p-2', className)} {...restProps}>
      {@render children?.()}
    </AutocompletePrimitive.List>
  </ScrollArea>
</div>
