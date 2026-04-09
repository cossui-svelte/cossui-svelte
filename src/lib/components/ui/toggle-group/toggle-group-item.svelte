<!-- <script lang="ts">
	import { ToggleGroup as ToggleGroupPrimitive } from "bits-ui";
	import { getToggleGroupCtx } from "./toggle-group.svelte";
	import { cn } from "$lib/utils.js";
	import {
		type ToggleVariants,
		toggleVariants,
	} from "$lib/components/ui/toggle/";

	let {
		ref = $bindable(null),
		value = $bindable(),
		class: className,
		size,
		variant,
		...restProps
	}: ToggleGroupPrimitive.ItemProps & ToggleVariants = $props();

	const ctx = getToggleGroupCtx();
</script>

<ToggleGroupPrimitive.Item
	bind:ref
	data-slot="toggle-group-item"
	data-variant={ctx.variant || variant}
	data-size={ctx.size || size}
	data-spacing={ctx.spacing}
	class={cn(
		"cn-toggle-group-item shrink-0 focus:z-10 focus-visible:z-10 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0 group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",
		toggleVariants({
			variant: ctx.variant || variant,
			size: ctx.size || size,
		}),
		className,
	)}
	{value}
	{...restProps}
/> -->
<script lang="ts">
	import { Toggle as ToggleComponent } from "$lib/components/ui/toggle";
	import { getToggleGroupCtx } from "./toggle-group.svelte";

	let {
		ref = $bindable(null),
		value = $bindable(),
		children,
		class: className,
		size,
		variant,
		...restProps
	} = $props();

	const context = getToggleGroupCtx();

	const resolvedVariant = context.variant || variant;
	const resolvedSize = context.size || size;
</script>

<ToggleComponent
	class={className}
	data-size={resolvedSize}
	data-variant={resolvedVariant}
	size={resolvedSize}
	variant={resolvedVariant}
	{...restProps}
>
	{@render children?.()}
</ToggleComponent>
