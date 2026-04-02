<script lang="ts">
	import type { WithElementRef } from "bits-ui";
	import type { HTMLAttributes } from "svelte/elements";

	import { cn } from "$lib/utils.js";

	let {
		children,
		variant = "default",
		class: className,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		variant?: "default" | "bare";
	} = $props();
</script>

<div
	class={cn(
		"flex flex-col-reverse gap-2 px-6 sm:flex-row sm:justify-end sm:rounded-b-[calc(var(--radius-2xl)-1px)]",
		variant === "default" && "border-t bg-muted/72 py-4",
		variant === "bare" &&
			"in-[[data-slot=dialog-popup]:has([data-slot=dialog-panel])]:pt-3 pt-4 pb-6",
		className,
	)}
	data-slot="dialog-footer"
	{...restProps}
>
	{@render children?.()}
</div>
