<script lang="ts">
	import { Label } from "$lib/components/ui/label";
	import { Select } from "$lib/components/ui/select";

	const uid = $props.id();
</script>

<div class="space-y-2">
	<Label for={uid}>Simple select (native)</Label>
	<Select id={uid}>
		<option value="s1">Svelte</option>
		<option value="s2">Next.js</option>
		<option value="s3">Astro</option>
		<option value="s4">Gatsby</option>
	</Select>
</div>
