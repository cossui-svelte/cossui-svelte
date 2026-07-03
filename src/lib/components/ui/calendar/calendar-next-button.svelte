<script lang="ts">
	import ChevronRight from "@lucide/svelte/icons/chevron-right";
	import { Calendar as CalendarPrimitive } from "bits-ui";
	import { type ButtonVariant, buttonVariants } from "$lib/components/ui/button";
	import { cn } from "$lib/utils";

	let {
		ref = $bindable(null),
		class: className,
		children,
		variant = "ghost",
		...restProps
	}: CalendarPrimitive.NextButtonProps & {
		variant?: ButtonVariant;
	} = $props();
</script>

<CalendarPrimitive.NextButton
	bind:ref
	class={cn(
		buttonVariants({ variant }),
		"size-(--cell-size) bg-transparent p-0 select-none disabled:opacity-50 rtl:rotate-180",
		className
	)}
	{...restProps}
>
	{#if children}
		{@render children?.()}
	{:else}
		<ChevronRight class="size-4" />
	{/if}
</CalendarPrimitive.NextButton>
