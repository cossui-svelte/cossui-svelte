<script lang="ts">
import { Label } from '$lib/components/ui/label';
import { Switch } from '$lib/components/ui/switch';

const uid = $props.id();
</script>

<div class="inline-flex items-center gap-2">
	<Switch id={uid} disabled />
	<Label for={uid} class="sr-only">Disabled</Label>
</div>
