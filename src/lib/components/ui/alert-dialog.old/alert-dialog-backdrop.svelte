<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { AlertDialog as AlertDialogPrimitive } from "bits-ui";

	let {
		class: className,
		ref = $bindable(null),
		...restProps
	}: AlertDialogPrimitive.OverlayProps = $props();
</script>

<AlertDialogPrimitive.Overlay
	bind:ref
	class={cn(
		"fixed inset-0 z-50 bg-black/32 backdrop-blur-sm transition-all duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0",
		className,
	)}
	data-slot="alert-dialog-backdrop"
	{...restProps}
/>
