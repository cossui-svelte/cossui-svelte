<script lang="ts">
	import ChevronsUpDown from "@lucide/svelte/icons/chevrons-up-down";
	import { Select as SelectPrimitive, type WithoutChild } from "bits-ui";
	import { cn } from "$lib/utils";
	import {
		type SelectTriggerVariants,
		selectTriggerVariants,
	} from "./select-trigget-variants";

	interface Props extends SelectPrimitive.TriggerProps {
		size?: SelectTriggerVariants["size"];
		// children?: Snippet;
	}

	let {
		children,
		class: className,
		size,
		ref = $bindable(null),
		...restProps
	}: WithoutChild<Props> = $props();
</script>

<SelectPrimitive.Trigger
	bind:ref
	class={cn(selectTriggerVariants({ size }), className)}
	data-slot="select-trigger"
	{...restProps}
>
	<span class="pointer-events-none">
		{@render children?.()}
	</span>
	<ChevronsUpDown class="-me-1 size-4.5 opacity-80 sm:size-4" />
</SelectPrimitive.Trigger>
