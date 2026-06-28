<script lang="ts">
	import { Label } from "$lib/components/ui/label";
	import {
		Select,
		SelectContent,
		SelectItem,
		SelectTrigger,
	} from "$lib/components/ui/select";

	const items = [
		{ label: "Javascript", value: "s1" },
		{ label: "Bash", value: "s2" },
	];

	let value = $state("s1");

	const selected = $derived(items.find((i) => i.value === value));

	const uid = $props.id();
</script>

<div class="space-y-2">
	<Label for={uid}>Select with left text</Label>
	<Select type="single" bind:value>
		<SelectTrigger id={uid}>
			{#if selected}
				Language: {selected.label}
			{:else}
				Select a language
			{/if}
		</SelectTrigger>
		<SelectContent>
			{#each items as item (item.value)}
				<SelectItem value={item.value}>
					{item.label}
				</SelectItem>
			{/each}
		</SelectContent>
	</Select>
</div>
