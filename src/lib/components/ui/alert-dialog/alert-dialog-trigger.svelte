<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
	const props = $props();
</script>

<AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props}>
	{@render props.children?.()}
</AlertDialogPrimitive.Trigger>
