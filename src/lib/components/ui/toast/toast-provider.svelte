<script lang="ts">
  import { Toaster } from "svelte-sonner";
  import {
    CircleAlertIcon,
    CircleCheckIcon,
    InfoIcon,
    LoaderCircleIcon,
    TriangleAlertIcon,
  } from "lucide-svelte";
  import type { ToastPosition } from ".";

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

  const icons = {
    error: CircleAlertIcon,
    info: InfoIcon,
    loading: LoaderCircleIcon,
    success: CircleCheckIcon,
    warning: TriangleAlertIcon,
  };
</script>

<Toaster
  {closeButton}
  {duration}
  {expand}
  {icons}
  {position}
  {richColors}
  {theme}
  {visibleToasts}
  {...restProps}
/>
