<script lang="ts">
    import ComponentPreviewTabs from "$lib/components/app/ComponentPreviewTabs.svelte";
    import { Button } from "$lib/components/ui/button";
    import {
        Field,
        FieldControl,
        FieldError,
        FieldLabel,
    } from "$lib/components/ui/field";
    import { Form } from "$lib/components/ui/form";
    import { Input } from "$lib/components/ui/input";
    import { defaults, superForm } from "sveltekit-superforms";
    import { zod4, zod4Client } from "sveltekit-superforms/adapters";
    import { z } from "zod/v4";

    export const schema = z.object({
        email: z.string().email("Please enter a valid email HEHE."),
    });

    const formConfig = superForm(defaults(zod4(schema)), {
        validators: zod4Client(schema),
        SPA: true,
        onUpdate: ({ form: f }) => {
            if (f.valid) alert(`Email: ${f.data.email}`);
        },
    });
    const { form: formData } = formConfig;
</script>

<ComponentPreviewTabs>
    <Form form={formConfig} class="max-w-64">
        <Field name="email">
            <FieldControl>
                {#snippet children({ props })}
                    <FieldLabel>Email</FieldLabel>
                    <Input
                        {...props}
                        type="email"
                        bind:value={$formData.email}
                    />
                {/snippet}
            </FieldControl>
            <FieldError />
        </Field>
        <Button type="submit">Submit</Button>
    </Form>
</ComponentPreviewTabs>
