<script lang="ts">
	import { ToggleGroup as ToggleGroupPrimitive } from "bits-ui";
	import { getToggleGroupCtx } from "./toggle-group.svelte";
	import { cn } from "$lib/utils";
	import { toggleVariants, type ToggleSize, type ToggleVariant } from "../toggle/toggle-variants";

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
		// "cn-toggle-group-item shrink-0 focus:z-10 focus-visible:z-10 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0 group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",
		toggleVariants({
			variant: ctx.variant || variant,
			size: ctx.size || size,
		}),
		className,
	)}
	{value}
	{...restProps}
/>
