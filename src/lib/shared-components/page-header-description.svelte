<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../utils.js";

  interface Props extends HTMLAttributes<HTMLParagraphElement> {
    children?: Snippet;
    class?: string;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<p class={cn("text-muted-foreground lg:text-lg", className)} {...restProps}>
  {@render children?.()}
</p>
