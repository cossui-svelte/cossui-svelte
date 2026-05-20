<script lang="ts">
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
import { cn } from '$lib/utils.js';

interface Props extends HTMLAttributes<HTMLUListElement> {
  children?: Snippet;
}

let { class: className, children, ...restProps }: Props = $props();
</script>

<ScrollArea scrollbarGutter scrollFade>
  <ul
    class={cn(
      "not-empty:scroll-py-1 not-empty:p-1 in-data-has-overflow-y:pe-3",
      className,
    )}
    data-slot="autocomplete-list"
    {...restProps}
  >
    {@render children?.()}
  </ul>
</ScrollArea>
