<script lang="ts">
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
</script>

<div class="space-y-2">
	<Label for="input-52">Read-only input</Label>
	<Input
		id="input-52"
		class="read-only:bg-muted"
		value="This is a read-only input"
		readonly
		placeholder="Email"
		type="email"
	/>
</div>
