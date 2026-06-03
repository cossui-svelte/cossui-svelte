<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";

  interface Props extends HTMLAttributes<HTMLElement> {
    children?: Snippet;
    class?: string;
  }

  let { children, class: className, ...restProps }: Props = $props();
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
