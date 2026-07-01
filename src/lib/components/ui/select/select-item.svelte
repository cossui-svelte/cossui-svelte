<script lang="ts">
	import Check from "@lucide/svelte/icons/check";
	import { Select as SelectPrimitive, type WithoutChild } from "bits-ui";
	import { cn } from "$lib/utils";

	let {
		children: childrenProp,
		class: className,
		label,
		ref = $bindable(null),
		value,
		...restProps
	}: WithoutChild<SelectPrimitive.ItemProps> = $props();
</script>

<SelectPrimitive.Item
	bind:ref
	{value}
	class={cn(
		"grid min-h-8 cursor-default grid-cols-[1rem_1fr] items-center gap-2 rounded-sm py-1 ps-2 pe-4 text-base outline-none data-disabled:pointer-events-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:opacity-64 sm:min-h-7 sm:text-sm [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
		className,
	)}
	data-slot="select-item"
	{...restProps}
>
	{#snippet children({ highlighted, selected })}
		<span class="col-start-1 flex items-center justify-center">
			{#if selected}
				<Check size={24} />
			{/if}
		</span>
		<span class="col-start-2 flex min-w-0 items-center gap-2">
			{#if childrenProp}
				{@render childrenProp({ highlighted, selected })}
			{:else}
				{label || value}
			{/if}
		</span>
	{/snippet}
</SelectPrimitive.Item>
