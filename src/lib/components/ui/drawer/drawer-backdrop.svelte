<script lang="ts">
import type { Dialog as DrawerPrimitive } from 'bits-ui';
import { cn } from '$lib/utils.js';

let { class: className, ...restProps }: DrawerPrimitive.OverlayProps = $props();
</script>

<DrawerPrimitive.Overlay
  class={cn(
    "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 fixed inset-0 z-50 bg-black/32 backdrop-blur-sm transition-all duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0",
    className,
  )}
  data-slot="drawer-backdrop"
  {...restProps}
/>
