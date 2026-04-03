<script lang="ts">
    import ComponentPreviewTabs from "$lib/components/app/ComponentPreviewTabs.svelte";
    import {
        Field,
        FieldDescription,
        FieldLabel,
    } from "$lib/components/ui/field";
    import { Fieldset, FieldsetLegend } from "$lib/components/ui/fieldset";
    import { Input } from "$lib/components/ui/input";
</script>

<ComponentPreviewTabs>
    <Fieldset>
        <FieldsetLegend>Billing Details</FieldsetLegend>
        <Field>
            <FieldLabel>Company</FieldLabel>
            <Input placeholder="Enter company name" type="text" />
            <FieldDescription>
                The name that will appear on invoices.
            </FieldDescription>
        </Field>

        <Field>
            <FieldLabel>Tax ID</FieldLabel>
            <Input placeholder="Enter tax identification number" type="text" />
            <FieldDescription>
                Your business tax identification number.
            </FieldDescription>
        </Field>
    </Fieldset>
</ComponentPreviewTabs>
