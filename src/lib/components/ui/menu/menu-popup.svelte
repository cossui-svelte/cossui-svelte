<script lang="ts">
  import { DropdownMenu } from "bits-ui";
  import type { Snippet } from "svelte";
  import { cn } from "$lib/utils";

  interface Props extends DropdownMenu.ContentProps {
    children?: Snippet;
  }

  let {
    children,
    class: className,
    sideOffset = 4,
    align = "center",
    alignOffset,
    side = "bottom",
    ...restProps
  }: Props = $props();
</script>

<DropdownMenu.Portal>
  <DropdownMenu.Content
    class={cn(
      "relative z-50 flex not-[class*='w-']:min-w-32 origin-(--bits-dropdown-menu-content-transform-origin) rounded-lg border bg-popover not-dark:bg-clip-padding shadow-lg/5 outline-none before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] focus:outline-none dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
      className,
    )}
    data-slot="menu-popup"
    {align}
    {alignOffset}
    {side}
    {sideOffset}
    {...restProps}
  >
    <div
      class="max-h-(--bits-dropdown-menu-content-available-height) w-full overflow-y-auto p-1"
    >
      {@render children?.()}
    </div>
  </DropdownMenu.Content>
</DropdownMenu.Portal>
