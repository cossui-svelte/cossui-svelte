<script>
import ComponentPreviewTabs from '$lib/components/app/component-preview-tabs.svelte';
import { Alert, AlertDescription, AlertTitle } from '$lib/components/ui/alert';
</script>

<ComponentPreviewTabs>
    <Alert>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
            <p>Describe what can be done about it here.</p>
        </AlertDescription>
    </Alert>
</ComponentPreviewTabs>
