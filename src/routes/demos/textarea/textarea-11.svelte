<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Label } from "$lib/components/ui/label";
	import { Textarea } from "$lib/components/ui/textarea";

	const uid = $props.id();
</script>

<div class="space-y-2">
	<Label for={uid}>Textarea with right button</Label>
	<Textarea id={uid} placeholder="Leave a comment" />
	<div class="flex justify-end">
		<Button variant="outline">Send</Button>
	</div>
</div>
