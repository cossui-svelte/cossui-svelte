<script lang="ts">
	import { ToggleGroup as ToggleGroupPrimitive } from "bits-ui";
	import { cn } from "$lib/utils";
	import {
		type ToggleSize,
		type ToggleVariant,
		toggleVariants,
	} from "../toggle/toggle-variants";
	import { getToggleGroupCtx } from "./toggle-group.svelte";

	let {
		ref = $bindable(null),
		value = $bindable(),
		class: className,
		size,
		variant,
		...restProps
	}: ToggleGroupPrimitive.ItemProps & {
		size?: ToggleSize;
		variant?: ToggleVariant;
	} = $props();

	const ctx = getToggleGroupCtx();
</script>

<ToggleGroupPrimitive.Item
	data-slot="toggle-group-item"
	class={cn(
		toggleVariants({
			size: ctx.size || size,
			variant: ctx.variant || variant,
		}),
		className,
	)}
	{value}
	{...restProps}
/>
