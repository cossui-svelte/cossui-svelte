<script lang="ts">
  import type { Snippet } from "svelte";
  import { Dialog as DrawerPrimitive } from "bits-ui";
  import { getContext } from "svelte";
  import { cn } from "$lib/utils.js";
  import { X } from "@lucide/svelte";
  import DrawerBackdrop from "./drawer-backdrop.svelte";
  import DrawerViewport from "./drawer-viewport.svelte";
  import DrawerBar from "./drawer-bar.svelte";
  import Button from "../button/button.svelte";

  type DrawerPosition = "right" | "left" | "top" | "bottom";

  interface Props extends DrawerPrimitive.ContentProps {
    children?: Snippet;
    showCloseButton?: boolean;
    position?: DrawerPosition;
    variant?: "default" | "straight" | "inset";
    showBar?: boolean;
  }

  let {
    class: className,
    children,
    showCloseButton = false,
    position: positionProp,
    variant = "default",
    showBar = false,
    ...restProps
  }: Props = $props();

  const ctx = getContext<{ position: () => DrawerPosition } | undefined>(
    "drawer-position",
  );
  const position = $derived(positionProp ?? ctx?.position() ?? "bottom");
</script>

<DrawerPrimitive.Portal>
  <DrawerBackdrop />
  <DrawerViewport {position} {variant}>
    <DrawerPrimitive.Content
      class={cn(
        "relative flex max-h-full min-h-0 w-full min-w-0 flex-col bg-popover not-dark:bg-clip-padding text-popover-foreground shadow-lg/5 outline-none will-change-transform",
        "before:pointer-events-none before:absolute before:inset-0 before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
        "transition-[transform,opacity] duration-450 ease-[cubic-bezier(0.32,0.72,0,1)]",
        position === "bottom" &&
          "row-start-2 border-t pb-[env(safe-area-inset-bottom,0px)] data-[state=open]:translate-y-0 data-[state=closed]:translate-y-full has-data-[slot=drawer-bar]:pt-2",
        position === "top" &&
          "border-b data-[state=open]:translate-y-0 data-[state=closed]:-translate-y-full has-data-[slot=drawer-bar]:pb-2",
        position === "left" &&
          "w-[calc(100%--(--spacing(12)))] max-w-md border-e data-[state=open]:translate-x-0 data-[state=closed]:-translate-x-full has-data-[slot=drawer-bar]:pe-2",
        position === "right" &&
          "w-[calc(100%--(--spacing(12)))] max-w-md border-s data-[state=open]:translate-x-0 data-[state=closed]:translate-x-full has-data-[slot=drawer-bar]:ps-2",
        variant !== "straight" &&
          cn(
            position === "bottom" &&
              "rounded-t-2xl before:rounded-t-[calc(var(--radius-2xl)-1px)]",
            position === "top" &&
              "rounded-b-2xl before:rounded-b-[calc(var(--radius-2xl)-1px)] **:data-[slot=drawer-footer]:rounded-b-[calc(var(--radius-2xl)-1px)]",
            position === "left" &&
              "rounded-e-2xl before:rounded-e-[calc(var(--radius-2xl)-1px)] **:data-[slot=drawer-footer]:rounded-ee-[calc(var(--radius-2xl)-1px)]",
            position === "right" &&
              "rounded-s-2xl before:rounded-s-[calc(var(--radius-2xl)-1px)] **:data-[slot=drawer-footer]:rounded-es-[calc(var(--radius-2xl)-1px)]",
          ),
        variant === "inset" &&
          "before:hidden sm:rounded-2xl sm:border sm:before:rounded-[calc(var(--radius-2xl)-1px)] sm:**:data-[slot=drawer-footer]:rounded-b-[calc(var(--radius-2xl)-1px)]",
        className,
      )}
      data-slot="drawer-popup"
      {...restProps}
    >
      {@render children?.()}
      {#if showCloseButton}
        <DrawerPrimitive.Close aria-label="Close" class="absolute end-2 top-2">
          <Button size="icon" variant="ghost">
            <X />
          </Button>
        </DrawerPrimitive.Close>
      {/if}
      {#if showBar}
        <DrawerBar {position} />
      {/if}
    </DrawerPrimitive.Content>
  </DrawerViewport>
</DrawerPrimitive.Portal>
