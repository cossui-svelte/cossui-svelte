<script lang="ts">
	import { getCtx } from "./ctx.js";
	import Drawer from "./drawer.svelte";
	import type { Props } from "./types.js";

	type Position = "top" | "bottom" | "left" | "right";

	let {
		shouldScaleBackground = true,
		open = $bindable(false),
		activeSnapPoint = $bindable(null),
		position = "bottom" as Position,
		onDrag,
		onOpenChange,
		...restProps
	}: Omit<Props, "direction"> & {
		position?: Position;
	} = $props();

	const {
		methods: { onNestedDrag, onNestedRelease, onNestedOpenChange },
	} = getCtx();

	if (!onNestedDrag) {
		throw new Error("DrawerNestedRoot must be a child of a Drawer");
	}
</script>

<Drawer
	nested={true}
	{shouldScaleBackground}
	bind:open
	bind:activeSnapPoint
	{position}
	onClose={() => {
		onNestedOpenChange(false);
	}}
	onDrag={(e, p) => {
		onNestedDrag(e, p);
		onDrag?.(e, p);
	}}
	onOpenChange={(o) => {
		if (o) {
			onNestedOpenChange(o);
		}
		onOpenChange?.(o);
	}}
	onRelease={onNestedRelease}
	{...restProps}
/>
