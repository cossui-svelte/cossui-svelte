<script>
    import {
        Alert,
        AlertDescription,
        AlertTitle,
    } from "$lib/components/ui/alert";
    import ComponentPreviewTabs from "$lib/components/app/docs/component-preview-tabs.svelte";
</script>

<ComponentPreviewTabs>
    <Alert>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
            <p>Describe what can be done about it here.</p>
        </AlertDescription>
    </Alert>
</ComponentPreviewTabs>
