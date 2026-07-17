<script lang="ts">
	import { Dialog } from "bits-ui";
	import { cn } from "$lib/utils";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: Dialog.DescriptionProps = $props();
</script>

<Dialog.Description
	bind:ref
	class={cn("text-muted-foreground text-sm", className)}
	data-slot="drawer-description"
	{...restProps}
/>
