<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { ScrollArea } from "$lib/components/ui/scroll-area";
  import { cn } from "$lib/utils";
  import { getComboboxCtx } from "./combobox.svelte";

  interface Props extends HTMLAttributes<HTMLUListElement> {
    children?: Snippet;
    empty?: Snippet;
  }

  let { class: className, children, empty, ...restProps }: Props = $props();

  const ctx = getComboboxCtx();
  const hasVisible = $derived(ctx?.hasVisibleItems ?? true);
</script>

<ScrollArea scrollbarGutter scrollFade>
  <ul
    class={cn(
      hasVisible && "scroll-py-1 px-1 py-1",
      hasVisible && "in-data-has-overflow-y:pe-3",
      className,
    )}
    data-slot="combobox-list"
    {...restProps}
  >
    {@render children?.()}
  </ul>
  {#if !hasVisible}
    {#if empty}
      {@render empty()}
    {:else}
      <div class="p-2 text-center text-sm text-muted-foreground" data-slot="combobox-empty">
        No items found.
      </div>
    {/if}
  {/if}
</ScrollArea>
