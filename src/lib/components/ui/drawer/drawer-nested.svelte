<script lang="ts">
	import { Drawer as DrawerPrimitive } from "$lib/vaul";
	import { setContext } from "svelte";

	type Position = "top" | "bottom" | "left" | "right";

	let {
		shouldScaleBackground = true,
		open = $bindable(false),
		activeSnapPoint = $bindable(null),
		position = "bottom" as Position,
		...restProps
	}: DrawerPrimitive.Props & {
		position?: Position;
	} = $props();

	setContext("drawer-position", { position: () => position });
</script>

<DrawerPrimitive.NestedRoot
	{shouldScaleBackground}
	bind:open
	bind:activeSnapPoint
	direction={position}
	{...restProps}
/>
