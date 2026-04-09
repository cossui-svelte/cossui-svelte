<script lang="ts" module>
	import { getContext, setContext } from "svelte";
	import type { VariantProps } from "tailwind-variants";
	import {
		toggleVariants,
		type ToggleVariant,
		type ToggleSize,
	} from "$lib/components/ui/toggle";

	interface ToggleGroupProps {
		variant?: ToggleVariant;
		size?: ToggleSize;
		orientation?: Orientation;
	}

	export function setToggleGroupCtx(props: ToggleGroupProps) {
		setContext("toggleGroup", props);
	}

	export function getToggleGroupCtx() {
		return getContext<Required<ToggleGroupProps>>("toggleGroup");
	}
</script>

<script lang="ts">
	import {
		ToggleGroup as ToggleGroupPrimitive,
		type Orientation,
	} from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		value = $bindable(),
		class: className,
		children,
		size = "default",
		orientation = "horizontal",
		variant = "default",
		//	type = "single",
		...restProps
	}: ToggleGroupPrimitive.RootProps & ToggleGroupProps = $props();

	setToggleGroupCtx({
		get variant() {
			return variant;
		},
		get size() {
			return size;
		},
		get orientation() {
			return orientation;
		},
	});
</script>

<!--
Discriminated Unions + Destructing (required for bindable) do not
get along, so we shut typescript up by casting `value` to `never`.
-->
<ToggleGroupPrimitive.Root
	bind:value={value as never}
	bind:ref
	{orientation}
	data-slot="toggle-group"
	data-variant={variant}
	data-size={size}
	// data-spacing={spacing}
	// style={`--gap: ${spacing}`}
	class={cn(
		"flex w-fit *:focus-visible:z-10 dark:*:[[data-slot=separator]:has(+[data-slot=toggle]:hover)]:before:bg-input/64 dark:*:[[data-slot=separator]:has(+[data-slot=toggle][data-pressed])]:before:bg-input dark:*:[[data-slot=toggle]:hover+[data-slot=separator]]:before:bg-input/64 dark:*:[[data-slot=toggle][data-pressed]+[data-slot=separator]]:before:bg-input",
		orientation === "horizontal"
			? "*:pointer-coarse:after:min-w-auto"
			: "*:pointer-coarse:after:min-h-auto",
		variant === "default"
			? "gap-0.5"
			: orientation === "horizontal"
				? "*:not-first:not-data-[slot=separator]:before:-start-[0.5px] *:not-last:not-data-[slot=separator]:before:-end-[0.5px] *:not-first:rounded-s-none *:not-last:rounded-e-none *:not-first:border-s-0 *:not-last:border-e-0 *:not-first:before:rounded-s-none *:not-last:before:rounded-e-none"
				: "*:not-first:not-data-[slot=separator]:before:-top-[0.5px] *:not-last:not-data-[slot=separator]:before:-bottom-[0.5px] flex-col *:not-first:rounded-t-none *:not-last:rounded-b-none *:not-first:border-t-0 *:not-last:border-b-0 *:not-first:before:rounded-t-none *:not-last:before:rounded-b-none *:data-[slot=toggle]:not-last:before:hidden dark:*:last:before:hidden dark:*:first:before:block",
		className,
	)}
	{...restProps}
>
	{@render children?.()}
</ToggleGroupPrimitive.Root>
