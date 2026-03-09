<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../utils.js";

  interface Props extends HTMLAttributes<HTMLElement> {
    children?: Snippet;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<kbd class={cn("inline-flex items-center gap-1", className)} data-slot="kbd-group" {...restProps}>
  {@render children?.()}
</kbd>
