<!-- <script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
	import {
		buttonVariants,
		type ButtonVariant,
		type ButtonSize,
	} from "$lib/components/ui/button";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		variant = "outline",
		size = "default",
		...restProps
	}: AlertDialogPrimitive.CancelProps & {
		variant?: ButtonVariant;
		size?: ButtonSize;
	} = $props();
</script>

<AlertDialogPrimitive.Cancel
	bind:ref
	data-slot="alert-dialog-cancel"
	class={cn(
		buttonVariants({ variant, size }),
		"cn-alert-dialog-cancel",
		className,
	)}
	{...restProps}
/> -->
<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
	const props = $props();
</script>

<AlertDialogPrimitive.Cancel data-slot="alert-dialog-close" {...props}>
	{@render props.children?.()}
</AlertDialogPrimitive.Cancel>
