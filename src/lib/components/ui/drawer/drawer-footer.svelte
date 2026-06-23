<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils";

	let {
		ref = $bindable(null),
		class: className,
		variant = "default",
		allowSelection = true,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		variant?: "default" | "bare";
		allowSelection?: boolean;
	} = $props();
</script>

<div
	bind:this={ref}
	data-slot="drawer-footer"
	class={cn(
		"flex flex-col-reverse gap-2 px-6 pb-(--safe-area-inset-bottom,0px) sm:flex-row sm:justify-end",
		!allowSelection && "cursor-default",
		variant === "default" &&
			"border-t bg-muted/72 pt-4 pb-[calc(env(safe-area-inset-bottom,0px)+--spacing(4))]",
		variant === "bare" &&
			"in-[[data-slot=drawer-popup]:has([data-slot=drawer-panel])]:pt-3 pt-4 pb-[calc(env(safe-area-inset-bottom,0px)+--spacing(6))]",
		className,
	)}
	{...restProps}
>
	{@render children?.()}
</div>
