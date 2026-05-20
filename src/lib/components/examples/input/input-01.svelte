<script lang="ts">
import { Input } from '$lib/components/ui/input';
import { Label } from '$lib/components/ui/label';

const uid = $props.id();
</script>

<div class="space-y-2">
	<Label for={uid}>Simple input</Label>
	<Input id={uid} placeholder="Email" type="email" />
</div>
