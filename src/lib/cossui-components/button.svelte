<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";
  import { cn } from "../utils.js";
  import { buttonVariants, type ButtonVariants } from "$lib/button-variants.js";

  interface ButtonProps extends HTMLButtonAttributes {
    variant?: ButtonVariants["variant"];
    size?: ButtonVariants["size"];
    href?: string;
    children?: Snippet;
  }

  let {
    class: className,
    variant,
    size,
    href,
    children,
    ...restProps
  }: ButtonProps = $props();

  // svelte-ignore state_referenced_locally
    const tag = href ? "a" : "button";
</script>

<svelte:element
  this={tag}
  {href}
  class={cn(buttonVariants({ className, size, variant }))}
  data-slot="button"
  type={!href ? "button" : undefined}
  {...restProps}
>
  {@render children?.()}
</svelte:element>
