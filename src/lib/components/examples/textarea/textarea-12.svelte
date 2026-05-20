<script lang="ts">
import { Button } from '$lib/components/ui/button';
import { Label } from '$lib/components/ui/label';
import { Textarea } from '$lib/components/ui/textarea';

const uid = $props.id();
</script>

<div class="space-y-2">
	<Label for={uid}>Textarea with button</Label>
	<Textarea id={uid} placeholder="Leave a comment" />
	<Button variant="outline" class="w-full">Send</Button>
</div>
