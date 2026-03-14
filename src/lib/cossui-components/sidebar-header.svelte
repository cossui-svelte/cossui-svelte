<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../utils.js";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    children?: Snippet;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<div
  class={cn("flex flex-col gap-2 p-2", className)}
  data-sidebar="header"
  data-slot="sidebar-header"
  {...restProps}
>
  {@render children?.()}
</div>
