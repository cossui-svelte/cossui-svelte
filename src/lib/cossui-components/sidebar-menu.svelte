<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../utils.js";

  interface Props extends HTMLAttributes<HTMLUListElement> {
    children?: Snippet;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<ul
  class={cn("flex w-full min-w-0 flex-col gap-1", className)}
  data-sidebar="menu"
  data-slot="sidebar-menu"
  {...restProps}
>
  {@render children?.()}
</ul>
