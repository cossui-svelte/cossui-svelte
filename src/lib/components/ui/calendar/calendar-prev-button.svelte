<script lang="ts">
	import ChevronLeft from "@lucide/svelte/icons/chevron-left";
	import { Calendar as CalendarPrimitive } from "bits-ui";
	import { type ButtonVariant, buttonVariants } from "$lib/components/ui/button";
	import { cn } from "$lib/utils";

	let {
		ref = $bindable(null),
		class: className,
		children,
		variant = "ghost",
		...restProps
	}: CalendarPrimitive.PrevButtonProps & {
		variant?: ButtonVariant;
	} = $props();
</script>

<CalendarPrimitive.PrevButton
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
		<ChevronLeft class="size-4" />
	{/if}
</CalendarPrimitive.PrevButton>
