<script lang="ts">
    import {
        Field,
        FieldDescription,
        FieldLabel,
    } from "$lib/components/ui/field";
    import { Form } from "$lib/components/ui/form";
    import { Input } from "$lib/components/ui/input";
    import { superForm } from "sveltekit-superforms";

    let { data } = $props();
    const formConfig = superForm(data.form);
</script>

<Form config={formConfig}>
    <Field name="name">
        <FieldLabel>Name</FieldLabel>
        <Input placeholder="Enter your name" type="text" />
        <FieldDescription>Visible on your profile</FieldDescription>
    </Field>
</Form>
