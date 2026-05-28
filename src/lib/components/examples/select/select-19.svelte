<script lang="ts">
	import { Label } from "$lib/components/ui/label";
	import {
		Select,
		SelectContent,
		SelectItem,
		SelectTrigger,
	} from "$lib/components/ui/select/index.js";

	const items = [
		{ label: "Svelte", value: "s1" },
		{ label: "Next.js", value: "s2" },
		{ label: "Astro", value: "s3" },
		{ label: "Gatsby", value: "s4" },
	];

	let value = $state("s1");

	const selected = $derived(items.find((i) => i.value === value));

	const uid = $props.id();
</script>

<!-- NOTE: This inline style is to show how to set the --ring variable in your CSS file in order to change the focus ring color. -->
<div class="space-y-2" style="--ring: 234 89% 74%;">
	<Label for={uid}>Select with colored border and ring</Label>
	<Select type="single" bind:value>
		<SelectTrigger id={uid}>
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
