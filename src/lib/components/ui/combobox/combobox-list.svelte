<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
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

<div
  class="overflow-y-auto overscroll-contain"
  style="max-height: min(var(--bits-combobox-content-available-height, 100vh), 23rem)"
>
  <ul
    class={cn(
      hasVisible && "scroll-py-1 px-1 py-1",
      className,
    )}
    data-slot="combobox-list"
    {...restProps}
  >
    {@render children?.()}
  </ul>
  {#if !hasVisible && empty}
    {@render empty()}
  {/if}
</div>
