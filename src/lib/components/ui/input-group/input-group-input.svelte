<script lang="ts">
	import type { ComponentProps } from "svelte";
	import { Input } from "$lib/components/ui/input";

	let {
		ref = $bindable(null),
		value = $bindable(),
		class: className,
		...props
	}: ComponentProps<typeof Input> = $props();
</script>

<Input
	bind:ref
	data-slot="input-group-control"
	class={className}
	bind:value
	unstyled
	{...props}
/>
