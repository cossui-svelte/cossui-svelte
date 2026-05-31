<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		allowSelection = false,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		allowSelection?: boolean;
	} = $props();
</script>

<div
	bind:this={ref}
	data-slot="drawer-header"
	class={cn(
		"flex flex-col gap-2 p-6 in-[[data-slot=drawer-popup]:has([data-slot=drawer-panel])]:pb-3 max-sm:pb-4",
		!allowSelection && "cursor-default",
		className,
	)}
	{...restProps}
>
	{@render children?.()}
</div>
