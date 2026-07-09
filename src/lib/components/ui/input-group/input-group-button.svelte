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
	import type { Snippet } from "svelte";
	import type { HTMLButtonAttributes } from "svelte/elements";
	import { Button, type ButtonVariant } from "$lib/components/ui/button";
	import { cn } from "$lib/utils";

	let {
		ref = $bindable(null),
		class: className,
		children,
		type = "button",
		variant = "ghost",
		size = "xs",
		...restProps
	}: Omit<HTMLButtonAttributes, "type"> & {
		ref?: HTMLElement | null;
		type?: HTMLButtonAttributes["type"];
		variant?: ButtonVariant;
		size?: InputGroupButtonSize;
		children?: Snippet;
		loading?: boolean;
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
