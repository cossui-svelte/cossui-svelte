<script lang="ts">
  import { DropdownMenu } from "bits-ui";
  import type { Snippet } from "svelte";
  import type { HTMLAnchorAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";

  interface Props extends Omit<DropdownMenu.ItemProps, "children"> {
    children?: Snippet;
    href?: HTMLAnchorAttributes["href"];
    inset?: boolean;
    rel?: HTMLAnchorAttributes["rel"];
    target?: HTMLAnchorAttributes["target"];
    variant?: "default" | "destructive";
  }

  let {
    children,
    class: className,
    inset,
    variant = "default",
    href,
    target,
    rel,
    ...restProps
  }: Props = $props();
</script>

<DropdownMenu.Item
  class={cn(
    "[&>svg]:-mx-0.5 flex min-h-8 cursor-default select-none items-center gap-2 rounded-sm px-2 py-1 text-base text-foreground outline-none data-disabled:pointer-events-none data-highlighted:bg-accent data-inset:ps-8 data-[variant=destructive]:text-destructive-foreground data-highlighted:text-accent-foreground data-disabled:opacity-64 sm:min-h-7 sm:text-sm [&>svg:not([class*='opacity-'])]:opacity-80 [&>svg:not([class*='size-'])]:size-4.5 sm:[&>svg:not([class*='size-'])]:size-4 [&>svg]:pointer-events-none [&>svg]:shrink-0",
    className,
  )}
  data-inset={inset}
  data-slot="menu-link-item"
  data-variant={variant}
  {...restProps}
>
  {#snippet child({ props })}
    <a {href} {target} {rel} {...props}>
      {@render children?.()}
    </a>
  {/snippet}
</DropdownMenu.Item>
