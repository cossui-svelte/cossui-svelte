<script lang="ts">
  import type { Snippet, SvelteComponent } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";
  import { buttonVariants } from "./button-variants";
  import { type ButtonVariants } from "./button-variants";

  interface ButtonProps extends HTMLButtonAttributes {
    ref?: HTMLButtonElement | HTMLAnchorElement | null;
    variant?: ButtonVariants["variant"];
    size?: ButtonVariants["size"];
    href?: string;
    children?: Snippet;
  }

  let {
    class: className,
    variant,
    ref = $bindable(null),
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
  bind:this={ref}
  class={cn(buttonVariants({ variant, size }), className)}
  data-slot="button"
  type={!href ? "button" : undefined}
  {...restProps}
>
  {@render children?.()}
</svelte:element>
