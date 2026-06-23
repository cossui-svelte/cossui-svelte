<script lang="ts">
	import { Toggle as TogglePrimitive } from "bits-ui";
	import { cn } from "$lib/utils";
	import {
		type ToggleSize,
		type ToggleVariant,
		toggleVariants,
	} from "./toggle-variants";

	type ToggleProps = TogglePrimitive.RootProps & {
		variant?: ToggleVariant;
		size?: ToggleSize;
	};

	let {
		ref = $bindable(null),
		pressed = $bindable(false),
		class: className,
		size = "default",
		variant = "default",
		...restProps
	}: ToggleProps = $props();
</script>

<TogglePrimitive.Root
	bind:ref
	bind:pressed
	data-slot="toggle"
	class={cn(toggleVariants({ variant, size }), className)}
	{...restProps}
/>
