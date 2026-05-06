<script lang="ts">
  import { Portal } from "bits-ui";
  import {
    CircleAlertIcon,
    CircleCheckIcon,
    InfoIcon,
    LoaderCircleIcon,
    TriangleAlertIcon,
  } from "@lucide/svelte";
  import type { Snippet } from "svelte";
  import { cn } from "$lib/utils.js";
  import { buttonVariants } from "../button/index.js";
  import {
    anchoredToastManager,
    type AnchoredToastData,
  } from "./toast-manager.svelte.js";

  interface Props {
    children?: Snippet;
  }

  let { children }: Props = $props();

  const TOAST_ICONS = {
    error: CircleAlertIcon,
    info: InfoIcon,
    loading: LoaderCircleIcon,
    success: CircleCheckIcon,
    warning: TriangleAlertIcon,
  } as const;

  // ─── Per-toast positioning ─────────────────────────────────────────────────

  interface ToastPos {
    top: number;
    left: number;
    ready: boolean;
  }

  // Compute fixed position for a toast relative to its anchor element.
  function computePos(toast: AnchoredToastData, el: HTMLElement): ToastPos {
    const { positionerProps } = toast;
    if (!positionerProps?.anchor) return { top: 0, left: 0, ready: false };

    let anchor: HTMLElement | null = null;
    if (typeof positionerProps.anchor === "string") {
      anchor = document.querySelector<HTMLElement>(positionerProps.anchor);
    } else {
      anchor = positionerProps.anchor;
    }

    if (!anchor) return { top: 0, left: 0, ready: false };

    const ar = anchor.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    const offset = positionerProps.sideOffset ?? 4;
    const side = positionerProps.side ?? "bottom";
    const align = positionerProps.align ?? "center";

    let top = 0;
    let left = 0;

    // Primary axis
    switch (side) {
      case "bottom":
        top = ar.bottom + offset;
        break;
      case "top":
        top = ar.top - er.height - offset;
        break;
      case "right":
        left = ar.right + offset;
        break;
      case "left":
        left = ar.left - er.width - offset;
        break;
    }

    // Cross axis alignment
    if (side === "top" || side === "bottom") {
      switch (align) {
        case "start":
          left = ar.left;
          break;
        case "end":
          left = ar.right - er.width;
          break;
        default: // center
          left = ar.left + ar.width / 2 - er.width / 2;
      }
    } else {
      switch (align) {
        case "start":
          top = ar.top;
          break;
        case "end":
          top = ar.bottom - er.height;
          break;
        default: // center
          top = ar.top + ar.height / 2 - er.height / 2;
      }
    }

    // Clamp to viewport
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    left = Math.max(4, Math.min(left, vw - er.width - 4));
    top = Math.max(4, Math.min(top, vh - er.height - 4));

    return { top, left, ready: true };
  }

  // ─── Individual anchored toast item ────────────────────────────────────────

  interface ItemProps {
    toast: AnchoredToastData;
  }

  // Inner component logic handled inline via a Svelte action
  function floating(el: HTMLElement, toast: AnchoredToastData) {
    let cleanup: (() => void) | null = null;

    function setup(t: AnchoredToastData) {
      if (cleanup) cleanup();

      const { positionerProps } = t;
      if (!positionerProps?.anchor) return;

      let anchor: HTMLElement | null =
        typeof positionerProps.anchor === "string"
          ? document.querySelector<HTMLElement>(positionerProps.anchor)
          : positionerProps.anchor;

      if (!anchor) return;

      function update() {
        const pos = computePos(t, el);
        if (pos.ready) {
          el.style.top = `${pos.top}px`;
          el.style.left = `${pos.left}px`;
          el.style.visibility = "visible";
        }
      }

      // Initial position (hidden until first measurement)
      el.style.visibility = "hidden";
      // Defer so el has dimensions
      requestAnimationFrame(update);

      const ro = new ResizeObserver(update);
      ro.observe(anchor);
      ro.observe(el);
      window.addEventListener("scroll", update, {
        passive: true,
        capture: true,
      });
      window.addEventListener("resize", update, { passive: true });

      cleanup = () => {
        ro.disconnect();
        window.removeEventListener("scroll", update, true);
        window.removeEventListener("resize", update);
      };
    }

    setup(toast);

    return {
      update: setup,
      destroy() {
        if (cleanup) cleanup();
      },
    };
  }
</script>

{@render children?.()}

{#each anchoredToastManager.toasts as toast (toast.id)}
  {#if toast.positionerProps?.anchor}
    {@const Icon = toast.type
      ? TOAST_ICONS[toast.type as keyof typeof TOAST_ICONS]
      : null}

    <Portal>
      <div
        use:floating={toast}
        class={cn(
          "fixed z-50 max-w-[min(16rem,var(--available-width,16rem))]",
          "relative text-balance border bg-popover not-dark:bg-clip-padding",
          "text-popover-foreground text-xs",
          "transition-[scale,opacity]",
          "before:pointer-events-none before:absolute before:inset-0",
          "before:shadow-[0_1px_--theme(--color-black/4%)]",
          "data-starting-style:scale-98 data-starting-style:opacity-0",
          "data-ending-style:scale-98 data-ending-style:opacity-0",
          "dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
          toast.tooltipStyle
            ? "rounded-md shadow-md/5 before:rounded-[calc(var(--radius-md)-1px)]"
            : "rounded-lg shadow-lg/5 before:rounded-[calc(var(--radius-lg)-1px)]",
        )}
        data-slot="toast-popup"
        data-type={toast.type}
      >
        {#if toast.tooltipStyle}
          <!-- Compact tooltip style: title only -->
          <div class="pointer-events-auto px-2 py-1" data-slot="toast-content">
            {#if toast.title}
              <p data-slot="toast-title">{toast.title}</p>
            {/if}
          </div>
        {:else}
          <!-- Full style: icon + title + description + action -->
          <div
            class="pointer-events-auto flex items-center justify-between gap-1.5 overflow-hidden px-3.5 py-3 text-sm"
            data-slot="toast-content"
          >
            <div class="flex gap-2">
              {#if Icon}
                <div
                  class="[&>svg]:h-lh [&>svg]:w-4 [&_svg]:pointer-events-none [&_svg]:shrink-0"
                  data-slot="toast-icon"
                >
                  <Icon
                    class={cn(
                      toast.type === "loading" && "animate-spin opacity-80",
                      toast.type === "error" && "text-destructive",
                      toast.type === "info" && "text-info",
                      toast.type === "success" && "text-success",
                      toast.type === "warning" && "text-warning",
                    )}
                  />
                </div>
              {/if}

              <div class="flex flex-col gap-0.5">
                {#if toast.title}
                  <p class="font-medium" data-slot="toast-title">
                    {toast.title}
                  </p>
                {/if}
                {#if toast.description}
                  <p
                    class="text-muted-foreground"
                    data-slot="toast-description"
                  >
                    {toast.description}
                  </p>
                {/if}
              </div>
            </div>

            {#if toast.action}
              <button
                class={buttonVariants({ size: "xs" })}
                data-slot="toast-action"
                onclick={toast.action.onclick}
              >
                {toast.action.label}
              </button>
            {/if}
          </div>
        {/if}
      </div>
    </Portal>
  {/if}
{/each}
