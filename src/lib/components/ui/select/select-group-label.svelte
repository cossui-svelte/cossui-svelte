<script lang="ts">
	import { cn } from "$lib/utils";
	import { Select as SelectPrimitive } from "bits-ui";

	let {
		class: className,
		ref = $bindable(null),
		...restProps
	}: SelectPrimitive.GroupHeadingProps = $props();
</script>

<SelectPrimitive.GroupHeading
	bind:ref
	class={cn(
		"px-2 py-1.5 font-medium text-muted-foreground text-xs",
		className,
	)}
	data-slot="select-group-label"
	{...restProps}
/>
