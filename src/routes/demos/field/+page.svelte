<script>
    import ComponentPreviewTabs from "$lib/components/app/ComponentPreviewTabs.svelte";
    import {
        Field,
        FieldDescription,
        FieldLabel,
    } from "$lib/components/ui/field";
    import { Input } from "$lib/components/ui/input";
</script>

<ComponentPreviewTabs>
    <Field>
        <FieldLabel>Name</FieldLabel>
        <Input placeholder="Enter your name" type="text" />
        <FieldDescription>Visible on your profile</FieldDescription>
    </Field>
</ComponentPreviewTabs>
