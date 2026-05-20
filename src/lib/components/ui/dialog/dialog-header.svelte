<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="dialog-header"
	class={cn(
		"flex flex-col gap-2 p-6 text-center in-[[data-slot=alert-dialog-popup]:has([data-slot=alert-dialog-panel])]:pb-3 max-sm:pb-4 sm:text-left",
		className,
	)}
	{...restProps}
>
	{@render children?.()}
</div>
