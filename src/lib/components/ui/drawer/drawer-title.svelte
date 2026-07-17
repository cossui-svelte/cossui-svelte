<script lang="ts">
	import { Dialog } from "bits-ui";
	import { cn } from "$lib/utils";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: Dialog.TitleProps = $props();
</script>

<Dialog.Title
	bind:ref
	data-slot="drawer-title"
	class={cn("font-heading font-semibold text-xl leading-none", className)}
	{...restProps}
/>
