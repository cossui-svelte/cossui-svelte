<script lang="ts" module>
	import { tv, type VariantProps } from "tailwind-variants";

	const inputGroupButtonVariants = tv({
		base: "cn-input-group-button flex items-center shadow-none",
		defaultVariants: {
			size: "xs",
		},
		variants: {
			size: {
				"icon-sm": "cn-input-group-button-size-icon-sm",
				"icon-xs": "cn-input-group-button-size-icon-xs",
				sm: "cn-input-group-button-size-sm",
				xs: "cn-input-group-button-size-xs",
			},
		},
	});

	export type InputGroupButtonSize = VariantProps<
		typeof inputGroupButtonVariants
	>["size"];
</script>

<script lang="ts">
	import type { ComponentProps } from "svelte";
	import { Button } from "$lib/components/ui/button";
	import { cn } from "$lib/utils";

	let {
		ref = $bindable(null),
		class: className,
		children,
		type = "button",
		variant = "ghost",
		size = "xs",
		...restProps
	}: Omit<ComponentProps<typeof Button>, "href" | "size"> & {
		size?: InputGroupButtonSize;
	} = $props();
</script>

<Button
	bind:ref
	{type}
	data-size={size}
	{variant}
	class={cn(inputGroupButtonVariants({ size }), className)}
	{...restProps}
>
	{@render children?.()}
</Button>
