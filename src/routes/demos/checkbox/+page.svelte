<script lang="ts">
import ComponentPreviewTabs from '$lib/components/app/component-preview-tabs.svelte';
import { Checkbox } from '$lib/components/ui/checkbox';
import { Label } from '$lib/components/ui/label';

let checked = $state(false);

const uid = $props.id();
</script>

<ComponentPreviewTabs>
    <div class="flex items-center gap-2">
        <Checkbox id={uid} bind:checked indeterminate />
        <Label for={uid}>Indeterminate checkbox</Label>
    </div>
</ComponentPreviewTabs>
