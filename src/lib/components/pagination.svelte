<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../utils.js";

  interface Props extends HTMLAttributes<HTMLElement> {
    children?: Snippet;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<nav
  aria-label="pagination"
  class={cn("mx-auto flex w-full justify-center", className)}
  data-slot="pagination"
  {...restProps}
>
  {@render children?.()}
</nav>
