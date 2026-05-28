<script lang="ts">
	import { Label } from "$lib/components/ui/label";
	import {
		Select,
		SelectContent,
		SelectGroup,
		SelectGroupLabel,
		SelectItem,
		SelectSeparator,
		SelectTrigger,
	} from "$lib/components/ui/select";

	const items = [
		{ label: "Svelte", value: "s1" },
		{ label: "Next.js", value: "s2" },
		{ label: "Astro", value: "s3" },
		{ label: "Gatsby", value: "s4" },
	];

	let value = $state("s2");

	const selected = $derived(items.find((i) => i.value === value));

	const uid = $props.id();
</script>

<div class="space-y-2">
	<Label for={uid}>Select with gray background</Label>
	<Select type="single" bind:value>
		<SelectTrigger id={uid} class="border-transparent bg-muted shadow-none">
			{selected?.label ?? "Select a framework"}
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
