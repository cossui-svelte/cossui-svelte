<script lang="ts">
	import { Drawer as DrawerPrimitive } from "$lib/vaul";
	import { cn } from "$lib/utils";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: DrawerPrimitive.OverlayProps = $props();
</script>

<DrawerPrimitive.Overlay
	bind:ref
	data-slot="drawer-overlay"
	class={cn(
		"fixed inset-0 z-50 pointer-events-auto bg-black/32 backdrop-blur-sm duration-200 fill-mode-both data-open:animate-in data-closed:animate-out data-open:fade-in-0 data-closed:fade-out-0 supports-[-webkit-touch-callout:none]:absolute",
		className,
	)}
	{...restProps}
/>
