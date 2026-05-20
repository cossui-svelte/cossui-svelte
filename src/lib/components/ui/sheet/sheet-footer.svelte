<script lang="ts">
import type { HTMLAttributes } from 'svelte/elements';
import { cn, type WithElementRef } from '$lib/utils.js';

let {
  ref = $bindable(null),
  class: className,
  children,
  variant = 'default',
  ...restProps
}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
  variant?: 'default' | 'bare';
} = $props();
</script>

<div
	bind:this={ref}
	data-slot="sheet-footer"
	class={cn(
		"flex flex-col-reverse gap-2 px-6 sm:flex-row sm:justify-end",
		variant === "default" && "border-t bg-muted/72 py-4",
		variant === "bare" &&
			"in-[[data-slot=sheet-popup]:has([data-slot=sheet-panel])]:pt-3 pt-4 pb-6",
		className,
	)}
	{...restProps}
>
	{@render children?.()}
</div>
