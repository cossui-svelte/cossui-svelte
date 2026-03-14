<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../utils.js";

  interface Props extends HTMLAttributes<HTMLElement> {
    children?: Snippet;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<kbd
  class={cn(
    "pointer-events-none inline-flex h-5 min-w-5 select-none items-center justify-center gap-1 rounded bg-muted px-1 font-medium font-sans text-muted-foreground text-xs [&_svg:not([class*='size-'])]:size-3",
    className,
  )}
  data-slot="kbd"
  {...restProps}
>
  {@render children?.()}
</kbd>
