<script lang="ts">
	import type { WithElementRef } from "bits-ui";
	import type { HTMLAttributes } from "svelte/elements";
	import { cn } from "$lib/utils.js";

	let {
		children,
		class: className,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	class={cn(
		"flex flex-col gap-2 p-6 text-center in-[[data-slot=alert-dialog-popup]:has([data-slot=alert-dialog-panel])]:pb-3 max-sm:pb-4 sm:text-left",
		className,
	)}
	data-slot="alert-dialog-header"
	{...restProps}
>
	{@render children?.()}
</div>
