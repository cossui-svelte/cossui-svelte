<script lang="ts">
	import { Checkbox } from "$lib/components/ui/checkbox";
	import { Label } from "$lib/components/ui/label";

	const uid = $props.id();
</script>

<div class="flex items-center justify-between gap-2">
	<Checkbox id={uid} class="order-1" />
	<Label for={uid}>Right aligned checkbox</Label>
</div>
