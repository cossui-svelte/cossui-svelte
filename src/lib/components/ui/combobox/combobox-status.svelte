<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils.js";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    children?: Snippet;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<div
  class={cn(
    "px-3 py-2 font-medium text-muted-foreground text-xs empty:m-0 empty:p-0",
    className,
  )}
  data-slot="combobox-status"
  {...restProps}
>
  {@render children?.()}
</div>
