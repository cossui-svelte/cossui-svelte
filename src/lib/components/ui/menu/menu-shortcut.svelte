<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "$lib/utils.js";

  let {
    children,
    class: className,
    ...restProps
  }: { children?: Snippet; class?: string; [key: string]: unknown } = $props();
</script>

<kbd
  class={cn(
    "ms-auto font-medium font-sans text-muted-foreground/72 text-xs tracking-widest",
    className,
  )}
  data-slot="menu-shortcut"
  {...restProps}
>
  {@render children?.()}
</kbd>
