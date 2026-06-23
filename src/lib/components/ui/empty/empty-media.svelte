<script lang="ts" module>
	import { tv, type VariantProps } from "tailwind-variants";

	export const emptyMediaVariants = tv({
		base: "cn-empty-media flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
		defaultVariants: {
			variant: "default",
		},
		variants: {
			variant: {
				default: "cn-empty-media-default",
				icon: "cn-empty-media-icon",
			},
		},
	});

	export type EmptyMediaVariant = VariantProps<
		typeof emptyMediaVariants
	>["variant"];
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils";

	let {
		ref = $bindable(null),
		class: className,
		children,
		variant = "default",
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		variant?: EmptyMediaVariant;
	} = $props();
</script>

<div
	bind:this={ref}
	data-slot="empty-icon"
	data-variant={variant}
	class={cn(emptyMediaVariants({ variant }), className)}
	{...restProps}
>
	{@render children?.()}
</div>
