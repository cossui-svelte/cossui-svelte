<script lang="ts">
  import { Toaster } from "svelte-sonner";
  import {
    CircleAlertIcon,
    CircleCheckIcon,
    InfoIcon,
    LoaderCircleIcon,
    TriangleAlertIcon,
  } from "lucide-svelte";
  import type { ToastPosition } from "./toast-manager.svelte.js";

  interface Props {
    position?: ToastPosition;
    richColors?: boolean;
    expand?: boolean;
    duration?: number;
    visibleToasts?: number;
    closeButton?: boolean;
    theme?: "light" | "dark" | "system";
    offset?: string | number;
    gap?: number;
    toastOptions?: Record<string, unknown>;
  }

  let {
    position = "bottom-right",
    richColors = false,
    expand = false,
    duration = 4000,
    visibleToasts = 3,
    closeButton = false,
    theme = "system",
    ...restProps
  }: Props = $props();
</script>

{#snippet errorIcon()}<CircleAlertIcon />{/snippet}
{#snippet infoIcon()}<InfoIcon />{/snippet}
{#snippet loadingIcon()}<LoaderCircleIcon />{/snippet}
{#snippet successIcon()}<CircleCheckIcon />{/snippet}
{#snippet warningIcon()}<TriangleAlertIcon />{/snippet}

<Toaster
  {closeButton}
  {duration}
  {expand}
  {position}
  {richColors}
  {theme}
  {visibleToasts}
  {errorIcon}
  {infoIcon}
  {loadingIcon}
  {successIcon}
  {warningIcon}
  {...restProps}
/>
