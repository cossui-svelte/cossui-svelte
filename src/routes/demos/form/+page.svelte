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

    let loading = $state(false);

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

    function onsubmit() {
        loading = true;
        setTimeout(() => {
            loading = false;
            alert(`valid Email: ${$formData.email || ""}`);
        }, 1000);
    }
</script>

<ComponentPreviewTabs>
    <Form form={formConfig} class="max-w-64">
        <Field name="email">
            <FieldLabel>Email</FieldLabel>
            <FieldControl>
                {#snippet children({ props })}
                    <Input
                        type="email"
                        onchange={() => {
                            formConfig.validate("email");
                        }}
                        bind:value={$formData.email}
                        {...props}
                    />
                {/snippet}
            </FieldControl>
            <FieldError />
        </Field>
        <Button {loading} type="submit" {onsubmit}>Submit</Button>
    </Form>
</ComponentPreviewTabs>
