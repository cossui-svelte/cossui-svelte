<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";
	import { getContext } from "svelte";

	type DrawerPosition = "right" | "left" | "top" | "bottom";

	let {
		ref = $bindable(null),
		class: className,
		position: positionProp,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		position?: DrawerPosition;
	} = $props();

	const ctx = getContext<{ position: () => DrawerPosition } | undefined>(
		"drawer-position",
	);
	const position = $derived(positionProp ?? ctx?.position() ?? "bottom");
	const horizontal = $derived(position === "left" || position === "right");
</script>

<div
	bind:this={ref}
	aria-hidden="true"
	data-slot="drawer-bar"
	class={cn(
		"absolute flex touch-none items-center justify-center p-3 before:rounded-full before:bg-input",
		horizontal ? "inset-y-0 before:h-12 before:w-1" : "inset-x-0 before:h-1 before:w-12",
		position === "top" && "bottom-0",
		position === "bottom" && "top-0",
		position === "left" && "right-0",
		position === "right" && "left-0",
		className,
	)}
	{...restProps}
></div>
