<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
bind:this={ref}
  class={cn(
    "flex flex-col gap-2.5 text-muted-foreground [svg~&]:col-start-2",
    className,
  )}
  data-slot="alert-description"
  {...restProps}
>
  {@render children?.()}
</div>
