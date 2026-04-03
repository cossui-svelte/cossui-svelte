<script lang="ts">
    import ComponentPreviewTabs from "$lib/components/app/ComponentPreviewTabs.svelte";
    import { Checkbox } from "$lib/components/ui/checkbox";
    import { Label } from "$lib/components/ui/label";
</script>

<ComponentPreviewTabs>
    <Label>
        <Checkbox />
        Accept terms and conditions
    </Label>
</ComponentPreviewTabs>
