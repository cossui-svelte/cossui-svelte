<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils";
	import type { HTMLAttributes } from "svelte/elements";
	import { ScrollArea } from "../scroll-area";

	let {
		ref = $bindable(null),
		class: className,
		children,
		scrollFade = true,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		scrollFade?: boolean;
	} = $props();
</script>

<ScrollArea {scrollFade}>
	<div
		bind:this={ref}
		data-slot="sheet-panel"
		class={cn(
			"p-6 in-[[data-slot=sheet-popup]:has([data-slot=sheet-header])]:pt-1 in-[[data-slot=sheet-popup]:has([data-slot=sheet-footer]:not(.border-t))]:pb-1",
			className,
		)}
		{...restProps}
	>
		{@render children?.()}
	</div>
</ScrollArea>
