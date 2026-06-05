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

	let value = $state("s1");

	const selected = $derived(items.find((i) => i.value === value));

	const uid = $props.id();
</script>

<div class="space-y-2 [&_svg]:text-destructive/80">
	<Label for={uid}>Select with error</Label>
	<Select type="single" bind:value>
		<SelectTrigger
			id={uid}
			class="border-destructive/80 text-destructive focus:border-destructive/80 focus:ring-destructive/20"
		>
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
	<p class="mt-2 text-xs text-destructive" role="alert" aria-live="polite">
		Selected option is invalid
	</p>
</div>
