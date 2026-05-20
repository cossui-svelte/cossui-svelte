<script lang="ts">
import { Checkbox } from '$lib/components/ui/checkbox';
import { Label } from '$lib/components/ui/label';

const uid = $props.id();
</script>

<div class="flex items-center gap-2">
	<Checkbox id={uid} />
	<Label for={uid}>Simple checkbox</Label>
</div>
