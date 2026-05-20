<script lang="ts">
import type { AlertDialog as AlertDialogPrimitive } from 'bits-ui';
import { cn } from '$lib/utils.js';

let {
  ref = $bindable(null),
  class: className,
  ...restProps
}: AlertDialogPrimitive.TitleProps = $props();
</script>

<AlertDialogPrimitive.Title
	bind:ref
	data-slot="alert-dialog-title"
	class={cn("font-heading font-semibold text-xl leading-none", className)}
	{...restProps}
/>
