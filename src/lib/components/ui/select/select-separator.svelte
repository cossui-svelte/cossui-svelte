<script lang="ts">
	import { cn } from "$lib/utils";

	import { Separator as SeparatorPrimitive } from "bits-ui";

	let {
		class: className,
		ref = $bindable(null),
		...restProps
	}: SeparatorPrimitive.RootProps = $props();
</script>

<SeparatorPrimitive.Root
	bind:ref
	class={cn("mx-2 my-1 h-px bg-border", className)}
	data-slot="select-separator"
	role="separator"
	{...restProps}
/>
