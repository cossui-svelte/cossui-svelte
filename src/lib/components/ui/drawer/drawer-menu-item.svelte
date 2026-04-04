<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { cn } from "$lib/utils.js";

  interface Props extends HTMLButtonAttributes {
    variant?: "default" | "destructive";
    children?: Snippet;
  }

  let { class: className, variant = "default", children, ...restProps }: Props = $props();
</script>

<button
  class={cn(
    "flex min-h-9 w-full cursor-default select-none items-center gap-2 rounded-sm px-2 py-1 text-base text-foreground outline-none hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-64 data-[variant=destructive]:text-destructive-foreground sm:min-h-8 sm:text-sm [&>svg:not([class*='opacity-'])]:opacity-80 [&>svg:not([class*='size-'])]:size-4.5 sm:[&>svg:not([class*='size-'])]:size-4 [&>svg]:pointer-events-none [&>svg]:-mx-0.5 [&>svg]:shrink-0",
    className,
  )}
  data-slot="drawer-menu-item"
  data-variant={variant}
  type="button"
  {...restProps}
>
  {@render children?.()}
</button>
