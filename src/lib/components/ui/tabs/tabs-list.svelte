<script lang="ts">
  import type { Snippet } from "svelte";
  import { Tabs } from "bits-ui";
  import { cn } from "$lib/utils";
  import TabsIndicator from "./tabs-indicator.svelte";

  type TabsVariant = "default" | "underline";

  interface Props extends Tabs.ListProps {
    variant?: TabsVariant;
    children?: Snippet;
  }

  let {
    class: className,
    variant = "default",
    children,
    ...restProps
  }: Props = $props();
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
  <TabsIndicator
    class={cn(
      "absolute bottom-0 left-0 h-(--active-tab-height) w-(--active-tab-width) translate-x-(--active-tab-left) -translate-y-(--active-tab-bottom) transition-[width,translate] duration-200 ease-in-out",
      variant === "underline"
        ? "z-10 bg-primary data-[orientation=horizontal]:h-0.5 data-[orientation=vertical]:w-0.5 data-[orientation=vertical]:-translate-x-px data-[orientation=horizontal]:translate-y-px"
        : "-z-1 rounded-md bg-background shadow-sm/5 dark:bg-input",
    )}
    data-slot="tab-indicator"
  />
</Tabs.List>
