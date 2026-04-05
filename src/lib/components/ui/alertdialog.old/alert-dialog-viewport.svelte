<script lang="ts">
	import { AlertDialog } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: AlertDialog.OverlayProps = $props();
</script>

<AlertDialog.Overlay
	bind:ref
	data-slot="alert-dialog-viewport"
	class={cn(
		"fixed inset-0 z-50 grid grid-rows-[1fr_auto_3fr] justify-items-center p-4",
		className,
	)}
	{...restProps}
/>
