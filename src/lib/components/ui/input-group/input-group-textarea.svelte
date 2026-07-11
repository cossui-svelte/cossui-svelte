<script lang="ts">
	import type { ComponentProps } from "svelte";
	import { Textarea } from "$lib/components/ui/textarea";

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
