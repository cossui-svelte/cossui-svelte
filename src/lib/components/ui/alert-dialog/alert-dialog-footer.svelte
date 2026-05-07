<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		variant = "default",
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		variant?: "default" | "bare";
	} = $props();
</script>

<div
	bind:this={ref}
	data-slot="alert-dialog-footer"
	class={cn(
		"flex flex-col-reverse gap-2 px-6 sm:flex-row sm:justify-end sm:rounded-b-[calc(var(--radius-2xl)-1px)]",
		variant === "default" && "border-t bg-muted/72 py-4",
		variant === "bare" &&
			"in-[[data-slot=alert-dialog-popup]:has([data-slot=alert-dialog-panel])]:pt-3 pt-4 pb-6",
		className,
	)}
	{...restProps}
>
	{@render children?.()}
</div>
