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

	let value = $state("s3");

	const selected = $derived(items.find((i) => i.value === value));

	const uid = $props.id();
</script>

<div class="space-y-2">
	<Label for={uid}>Select with helper text</Label>
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
	<p
		class="mt-2 text-xs text-muted-foreground"
		role="region"
		aria-live="polite"
	>
		Tell us what&lsquo;s your favorite
	</p>
</div>
