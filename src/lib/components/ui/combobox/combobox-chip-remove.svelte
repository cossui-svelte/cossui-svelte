<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";
  import X from "@lucide/svelte/icons/x";
  import { cn } from "$lib/utils.js";

  interface Props extends HTMLButtonAttributes {}

  let { class: className, ...restProps }: Props = $props();
</script>

<button
  aria-label="Remove"
  class={cn(
    "h-full shrink-0 cursor-pointer px-1.5 opacity-80 hover:opacity-100 [&_svg:not([class*='size-'])]:size-4 sm:[&_svg:not([class*='size-'])]:size-3.5",
    className,
  )}
  data-slot="combobox-chip-remove"
  type="button"
  {...restProps}
>
  <X />
</button>
