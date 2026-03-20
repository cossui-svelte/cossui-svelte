<script lang="ts">
  import { Toaster } from "svelte-sonner";

  interface Props {
    position?:
      | "top-left"
      | "top-center"
      | "top-right"
      | "bottom-left"
      | "bottom-center"
      | "bottom-right";
    richColors?: boolean;
    expand?: boolean;
    duration?: number;
    visibleToasts?: number;
    closeButton?: boolean;
    theme?: "light" | "dark" | "system";
    offset?: string;
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

<Toaster
  {closeButton}
  {duration}
  {expand}
  {position}
  {richColors}
  {theme}
  {visibleToasts}
  {...restProps}
/>
