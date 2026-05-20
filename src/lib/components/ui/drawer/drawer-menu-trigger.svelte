<script lang="ts">
  import type { Snippet } from "svelte";
  import { Dialog as DrawerPrimitive } from "bits-ui";
  import ChevronRight from "@lucide/svelte/icons/chevron-right";
  import { cn } from "$lib/utils.js";

  interface Props extends DrawerPrimitive.TriggerProps {
    children?: Snippet;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<DrawerPrimitive.Trigger
  class={cn(
    "flex min-h-9 w-full cursor-default select-none items-center gap-2 rounded-sm px-2 py-1 text-base text-foreground outline-none hover:bg-accent hover:text-accent-foreground sm:min-h-8 sm:text-sm [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
    className,
  )}
  data-slot="drawer-menu-trigger"
  {...restProps}
>
  {@render children?.()}
  <ChevronRight class="ms-auto -me-0.5 opacity-80" />
</DrawerPrimitive.Trigger>
