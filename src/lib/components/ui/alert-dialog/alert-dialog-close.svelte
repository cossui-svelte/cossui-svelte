<script lang="ts">
	import { AlertDialog as DialogPrimitive } from "bits-ui";

	let {
		ref = $bindable(null),
		type = "button",
		...restProps
	}: DialogPrimitive.CancelProps = $props();
</script>

<DialogPrimitive.Cancel
	bind:ref
	data-slot="alert-dialog-close"
	{type}
	{...restProps}
/>
