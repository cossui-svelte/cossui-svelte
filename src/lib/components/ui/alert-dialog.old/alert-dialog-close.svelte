<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
	const props = $props();
</script>

<AlertDialogPrimitive.Cancel data-slot="alert-dialog-close" {...props}>
	{@render props.children?.()}
</AlertDialogPrimitive.Cancel>
