<script lang="ts">
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";

	const uid = $props.id();
</script>

<div class="space-y-2">
	<Label for={uid}>Input with gray background</Label>
	<Input
		id={uid}
		class="border-transparent bg-muted shadow-none"
		placeholder="Email"
		type="email"
	/>
</div>
