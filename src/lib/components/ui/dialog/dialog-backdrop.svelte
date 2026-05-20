<script lang="ts">
import type { Dialog as DialogPrimitive } from 'bits-ui';
import { cn } from '$lib/utils.js';

let {
  ref = $bindable(null),
  class: className,
  ...restProps
}: DialogPrimitive.OverlayProps = $props();
</script>

<DialogPrimitive.Overlay
	bind:ref
	data-slot="dialog-overlay"
	class={cn(
		"data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 fixed inset-0 z-50 bg-black/32 backdrop-blur-sm transition-all duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0",
		className,
	)}
	{...restProps}
/>
