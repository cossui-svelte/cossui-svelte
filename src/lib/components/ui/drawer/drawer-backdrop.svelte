<script lang="ts">
  import { Dialog as DrawerPrimitive } from "bits-ui";
  import { cn } from "$lib/utils.js";

  let { class: className, ...restProps }: DrawerPrimitive.OverlayProps = $props();
</script>

<DrawerPrimitive.Overlay
  class={cn(
    "fixed inset-0 z-50 bg-black/32 backdrop-blur-sm transition-opacity duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] data-[state=closed]:opacity-0 data-[state=open]:opacity-100 supports-[-webkit-touch-callout:none]:absolute",
    className,
  )}
  data-slot="drawer-backdrop"
  {...restProps}
/>
