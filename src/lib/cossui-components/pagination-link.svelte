<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAnchorAttributes } from "svelte/elements";
  import { buttonVariants } from "./button.svelte";
  import { cn } from "../utils.js";

  interface Props extends HTMLAnchorAttributes {
    isActive?: boolean;
    size?: "default" | "icon" | "sm" | "lg";
    children?: Snippet;
  }

  let {
    class: className,
    isActive,
    size = "icon",
    children,
    href,
    ...restProps
  }: Props = $props();
</script>

<a
  {href}
  aria-current={isActive ? "page" : undefined}
  class={cn(
    buttonVariants({ size, variant: isActive ? "outline" : "ghost" }),
    className,
  )}
  data-active={isActive}
  data-slot="pagination-link"
  {...restProps}
>
  {@render children?.()}
</a>
