<script lang="ts">
    import ComponentPreviewTabs from "$lib/components/app/ComponentPreviewTabs.svelte";

    import { Button } from "$lib/components/ui/button";
    import { Field, FieldError, FieldLabel } from "$lib/components/ui/field";
    import { Form } from "$lib/components/ui/form";
    import { Input } from "$lib/components/ui/input";

    import { superForm } from "sveltekit-superforms";
    import { valibotClient } from "sveltekit-superforms/adapters";
    import { schema } from "./schema";

    let { data } = $props();

    const formConfig = superForm(data.form, {
        SPA: true,
        delayMs: 500,
        timeoutMs: 8000,
        validators: valibotClient(schema),
        validationMethod: "oninput",
        scrollToError: "smooth",
        resetForm: true,
        async onUpdated({ form }) {
            if (form.valid) {
                await sleep(1000);
                // alert("Form submitted successfully!");
            }
        },
    });

    const { form: formData, submitting, delayed } = formConfig;

    // function onsubmit() {
    //     loading = true;
    //     setTimeout(() => {
    //         loading = false;
    //         alert(`valid Email: ${$formData.email || ""}`);
    //     }, 1000);
    // }
</script>

<ComponentPreviewTabs>
    <Form config={formConfig} class="max-w-64">
        <Field name="email">
            <FieldLabel>Email</FieldLabel>
            <Input type="email" bind:value={$formData.email} />
            <FieldError />
        </Field>
        <Button type="submit" disabled={$submitting} loading={$submitting}>
            {$delayed ? "Submitting…" : "Submit"}
        </Button>
    </Form>
</ComponentPreviewTabs>
