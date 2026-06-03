<script lang="ts">
	import { cn } from "$lib/utils";
	import { Textarea } from "$lib/components/ui/textarea";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		value = $bindable(),
		class: className,
		...props
	}: ComponentProps<typeof Textarea> = $props();
</script>

<Textarea
	bind:ref
	data-slot="input-group-control"
	class={className}
	unstyled
	bind:value
	{...props}
/>
