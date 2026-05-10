<script lang="ts">
	import { Drawer as DrawerPrimitive } from "vaul-svelte";

	type Position = "top" | "bottom" | "left" | "right";

	let {
		shouldScaleBackground = true,
		open = $bindable(false),
		activeSnapPoint = $bindable(null),
		position = "bottom" as Position,
		...restProps
	}: Omit<DrawerPrimitive.RootProps, "direction"> & { position?: Position } = $props();
</script>

<DrawerPrimitive.Root {shouldScaleBackground} bind:open bind:activeSnapPoint direction={position} {...(restProps as any)} />
