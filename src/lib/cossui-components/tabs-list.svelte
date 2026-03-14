<script lang="ts">
  import type { Snippet } from "svelte";
  import { Tabs } from "bits-ui";
  import { cn } from "../utils.js";

  interface Props extends Tabs.ListProps {
    variant?: "default" | "underline";
    children?: Snippet;
  }

  let { class: className, variant = "default", children, ...restProps }: Props = $props();
</script>

<Tabs.List
  class={cn(
    "relative z-0 flex w-fit items-center justify-center gap-x-0.5 text-muted-foreground",
    "data-[orientation=vertical]:flex-col",
    variant === "default"
      ? "rounded-lg bg-muted p-0.5 text-muted-foreground/72"
      : "data-[orientation=vertical]:px-1 data-[orientation=horizontal]:py-1 *:data-[slot=tabs-tab]:hover:bg-accent",
    className,
  )}
  data-slot="tabs-list"
  {...restProps}
>
  {@render children?.()}
</Tabs.List>
