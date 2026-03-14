<script lang="ts">
  import type { Snippet } from "svelte";
  import { DropdownMenu } from "bits-ui";
  import { cn } from "../utils.js";

  interface Props extends DropdownMenu.ContentProps {
    children?: Snippet;
    sideOffset?: number;
    align?: "start" | "center" | "end";
    side?: "top" | "right" | "bottom" | "left";
    alignOffset?: number;
  }

  let {
    class: className,
    children,
    sideOffset = 4,
    align = "center",
    side = "bottom",
    alignOffset,
    ...restProps
  }: Props = $props();
</script>

<DropdownMenu.Portal>
  <DropdownMenu.Content
    {align}
    {alignOffset}
    {side}
    {sideOffset}
    class={cn(
      "relative flex not-[class*='w-']:min-w-32 origin-[--radix-dropdown-menu-content-transform-origin] rounded-lg border bg-popover not-dark:bg-clip-padding shadow-lg/5 outline-none before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] focus:outline-none dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
      className,
    )}
    data-slot="menu-popup"
    {...restProps}
  >
    <div class="max-h-[var(--radix-dropdown-menu-content-available-height)] w-full overflow-y-auto p-1">
      {@render children?.()}
    </div>
  </DropdownMenu.Content>
</DropdownMenu.Portal>
