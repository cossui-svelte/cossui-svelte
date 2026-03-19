<script lang="ts">
  import type { Snippet } from "svelte";
  import { DropdownMenu } from "bits-ui";
  import { cn } from "$lib/utils.js";

  interface Props extends DropdownMenu.SubContentProps {
    children?: Snippet;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<DropdownMenu.SubContent
  class={cn(
    "relative flex min-w-32 origin-[--radix-dropdown-menu-content-transform-origin] rounded-lg border bg-popover not-dark:bg-clip-padding shadow-lg/5 outline-none before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
    className,
  )}
  data-slot="menu-sub-content"
  {...restProps}
>
  <div class="w-full overflow-y-auto p-1">
    {@render children?.()}
  </div>
</DropdownMenu.SubContent>
