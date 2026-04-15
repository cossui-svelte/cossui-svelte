<script lang="ts">
    import ComponentPreviewTabs from "$lib/components/app/ComponentPreviewTabs.svelte";
    import { Button } from "$lib/components/ui/button";
    import { Field, FieldError, FieldLabel } from "$lib/components/ui/field";
    import { Form } from "$lib/components/ui/form";
    import { Input } from "$lib/components/ui/input";
    import { defaults, superForm } from "sveltekit-superforms";
    import { zod4, zod4Client } from "sveltekit-superforms/adapters";
    import { z } from "zod/v4";

    export const schema = z.object({
        email: z.string().email("Please enter a valid email."),
    });

    const formConfig = superForm(defaults(zod4(schema)), {
        validators: zod4Client(schema),
        SPA: true,
        onUpdate: ({ form: f }) => {
            alert(`Email: ${f.data.email}`);
        },
    });
</script>

<ComponentPreviewTabs>
    <Form form={formConfig} class="max-w-64">
        <Field name="email">
            <FieldLabel>Email</FieldLabel>
            <Input placeholder="you@example.com" required type="email" />
            <FieldError>Please enter a valid email.</FieldError>
        </Field>
        <Button type="submit">Submit</Button>
    </Form>
</ComponentPreviewTabs>
