<script lang="ts">
	import type { WithElementRef, WithoutChildren } from "bits-ui";
	import type { HTMLAttributes } from "svelte/elements";

	import { cn } from "$lib/utils";

	import Ellipsis from "@lucide/svelte/icons/ellipsis";

	let {
		class: className,
		ref = $bindable(null),
		...restProps
	}: WithoutChildren<
		WithElementRef<HTMLAttributes<HTMLSpanElement>>
	> = $props();
</script>

<span
	bind:this={ref}
	aria-hidden="true"
	class={cn("flex min-w-7 justify-center", className)}
	data-slot="pagination-ellipsis"
	{...restProps}
>
	<Ellipsis class="size-5 sm:size-4" />
	<span class="sr-only">More pages</span>
</span>
