<script lang="ts">
    import ComponentPreviewTabs from "$lib/components/app/docs/component-preview-tabs.svelte";
    import {
        Field,
        FieldDescription,
        FieldLabel,
    } from "$lib/components/ui/field";
    import { Fieldset, FieldsetLegend } from "$lib/components/ui/fieldset";
    import { Form } from "$lib/components/ui/form";
    import { Input } from "$lib/components/ui/input";
    import { superForm } from "sveltekit-superforms";

    let { data } = $props();
    const formConfig = superForm(data.form);
</script>

<ComponentPreviewTabs>
    <Form config={formConfig}>
        <Fieldset name="companyInfo">
            <FieldsetLegend>Billing Details</FieldsetLegend>
            <Field name="company">
                <FieldLabel>Company</FieldLabel>
                <Input placeholder="Enter company name" type="text" />
                <FieldDescription>
                    The name that will appear on invoices.
                </FieldDescription>
            </Field>

            <Field name="taxId">
                <FieldLabel>Tax ID</FieldLabel>
                <Input
                    placeholder="Enter tax identification number"
                    type="text"
                />
                <FieldDescription>
                    Your business tax identification number.
                </FieldDescription>
            </Field>
        </Fieldset>
    </Form>
</ComponentPreviewTabs>
