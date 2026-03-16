<script lang="ts">
  import type { Snippet } from "svelte";
  import { DropdownMenu } from "bits-ui";
  import { cn } from "$lib/utils.js";

  interface Props extends DropdownMenu.ItemProps {
    inset?: boolean;
    variant?: "default" | "destructive";
    children?: Snippet;
  }

  let {
    class: className,
    inset,
    variant = "default",
    children,
    ...restProps
  }: Props = $props();
</script>

<DropdownMenu.Item
  class={cn(
    "[&>svg]:-mx-0.5 flex min-h-8 cursor-default select-none items-center gap-2 rounded-sm px-2 py-1 text-base text-foreground outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-64 sm:min-h-7 sm:text-sm [&>svg:not([class*='opacity-'])]:opacity-80 [&>svg:not([class*='size-'])]:size-4.5 sm:[&>svg:not([class*='size-'])]:size-4 [&>svg]:pointer-events-none [&>svg]:shrink-0",
    inset && "ps-8",
    variant === "destructive" && "text-destructive-foreground",
    className,
  )}
  data-slot="menu-item"
  data-variant={variant}
  {...restProps}
>
  {@render children?.()}
</DropdownMenu.Item>
