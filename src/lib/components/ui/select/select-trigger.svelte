<script module lang="ts">
	import { cva, type VariantProps } from "class-variance-authority";
	//TODO convert to tva
	export const selectTriggerVariants = cva(
		"relative inline-flex min-h-9 w-full min-w-36 select-none items-center justify-between gap-2 rounded-lg border border-input bg-background not-dark:bg-clip-padding px-[calc(--spacing(3)-1px)] text-left text-base text-foreground shadow-xs/5 outline-none ring-ring/24 transition-shadow before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] not-data-disabled:not-focus-visible:not-aria-invalid:not-data-[state=open]:before:shadow-[0_1px_--theme(--color-black/4%)] pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11 focus-visible:border-ring focus-visible:ring-[3px] aria-invalid:border-destructive/36 focus-visible:aria-invalid:border-destructive/64 focus-visible:aria-invalid:ring-destructive/16 data-disabled:pointer-events-none data-disabled:opacity-64 sm:min-h-8 sm:text-sm dark:bg-input/32 dark:aria-invalid:ring-destructive/24 dark:not-data-disabled:not-focus-visible:not-aria-invalid:not-data-[state=open]:before:shadow-[0_-1px_--theme(--color-white/6%)] [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 [[data-disabled],:focus-visible,[aria-invalid],[data-[state=open]]]:shadow-none",
		{
			defaultVariants: { size: "default" },
			variants: {
				size: {
					default: "",
					lg: "min-h-10 sm:min-h-9",
					sm: "min-h-8 gap-1.5 px-[calc(--spacing(2.5)-1px)] sm:min-h-7",
				},
			},
		},
	);

	type SelectTriggerVariants = VariantProps<typeof selectTriggerVariants>;
</script>

<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { ChevronsUpDown } from "lucide-svelte";
	import { Select as SelectPrimitive, type WithoutChild } from "bits-ui";

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
