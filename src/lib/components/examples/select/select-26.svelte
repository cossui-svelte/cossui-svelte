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

	const frontend = [
		{ label: "Svelte", value: "s1" },
		{ label: "Vue", value: "s2" },
		{ label: "Angular", value: "s3" },
	] as const;

	const backend = [
		{ label: "Node.js", value: "s4" },
		{ label: "Python", value: "s5" },
		{ label: "Java", value: "s6" },
	] as const;

	const items = [...frontend, ...backend];

	let value = $state("s1");

	const selected = $derived(items.find((i) => i.value === value));

	const uid = $props.id();
</script>

<div class="space-y-2">
	<Label for={uid}>Select with separator</Label>
	<Select type="single" bind:value>
		<SelectTrigger id={uid}>
			{selected?.label ?? "Select a framework"}
		</SelectTrigger>
		<SelectContent>
			<SelectGroup>
				<SelectGroupLabel>Frontend</SelectGroupLabel>
				{#each frontend as item (item.value)}
					<SelectItem value={item.value}>
						{item.label}
					</SelectItem>
				{/each}
			</SelectGroup>
			<SelectSeparator />
			<SelectGroup>
				<SelectGroupLabel>Backend</SelectGroupLabel>
				{#each backend as item (item.value)}
					<SelectItem value={item.value}>
						{item.label}
					</SelectItem>
				{/each}
			</SelectGroup>
		</SelectContent>
	</Select>
</div>
