<script lang="ts">
	import ChevronUp from "@lucide/svelte/icons/chevron-up";
	import {
		Select as SelectPrimitive,
		type WithoutChildrenOrChild,
	} from "bits-ui";
	import { cn } from "$lib/utils";

	let {
		class: className,
		ref = $bindable(null),
		...restProps
	}: WithoutChildrenOrChild<SelectPrimitive.ScrollUpButtonProps> = $props();
</script>

<SelectPrimitive.ScrollUpButton
	bind:ref
	class={cn(
		"top-0 z-50 flex h-6 w-full cursor-default items-center justify-center before:pointer-events-none before:absolute before:inset-x-px before:top-px before:h-[200%] before:rounded-t-[calc(var(--radius-lg)-1px)] before:bg-linear-to-b before:from-50% before:from-popover",
		className,
	)}
	data-slot="select-scroll-up-button"
	{...restProps}
>
	<ChevronUp class="relative size-4.5 sm:size-4" />
</SelectPrimitive.ScrollUpButton>
