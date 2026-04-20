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
    import { schema } from "./schema";

    const formConfig = superForm(defaults(zod4(schema)), {
        SPA: true,
        validators: zod4Client(schema),
        validationMethod: "oninput",
        onUpdate: ({ form: f }) => {
            if (f.valid) console.log(`Email: ${f.data.email}`);
            else console.log("Form is invalid! " + f.data.email);
        },
    });

    const { form: formData, enhance } = formConfig;
</script>

<ComponentPreviewTabs>
    <Form form={formConfig} class="max-w-64">
        <form use:enhance>
            <Field name="email">
                <FieldControl>
                    {#snippet children({ props })}
                        <FieldLabel>Email</FieldLabel>
                        <input
                            type="email"
                            onchange={() => {
                                console.log("onchange");
                                formConfig.validate("email");
                            }}
                            bind:value={$formData.email}
                            {...props}
                        />
                    {/snippet}
                </FieldControl>
                <FieldError />
            </Field>
            <Button type="submit">Submit</Button>
        </form></Form
    >
</ComponentPreviewTabs>
