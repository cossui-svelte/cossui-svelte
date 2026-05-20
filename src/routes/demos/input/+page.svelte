<script>
import ComponentPreviewTabs from '$lib/components/app/component-preview-tabs.svelte';
import { Input } from '$lib/components/ui/input';
</script>

<ComponentPreviewTabs>
    <Input
        aria-label="Enter text"
        placeholder="Enter text"
        size="sm"
        type="text"
    />
</ComponentPreviewTabs>
