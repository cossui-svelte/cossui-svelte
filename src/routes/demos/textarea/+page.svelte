<script>
    import ComponentPreviewTabs from "$lib/components/app/TODEL/component-preview-tabs.svelte";
    import { defaults, superForm } from "sveltekit-superforms";
    import { valibot } from "sveltekit-superforms/adapters";
    import * as v from "valibot";
    import { Form } from "$lib/components/ui/form";
    import { Textarea } from "$lib/components/ui/textarea";
    import { Field, FieldError, FieldLabel } from "$lib/components/ui/field";
    import { Button } from "$lib/components/ui/button";
    import { Label } from "$lib/components/ui/label";

    let loading = $state(false);

    const id = $props.id();

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        loading = true;
        await new Promise((r) => setTimeout(r, 800));
        loading = false;
        alert(`Message: ${formData.get("message") || ""}`);
    };

    //===

    const schema = v.object({
        message: v.pipe(v.string(), v.minLength(1, "Required")),
    });

    const form = superForm(defaults(valibot(schema)), {
        SPA: true,
        validators: valibot(schema),
        onUpdate({ form }) {
            if (form.valid) {
                // do your thing — fetch, store write, etc.
                console.log("valid", form.data);
            }
        },
    });
</script>

<ComponentPreviewTabs>
    Default
    <Textarea placeholder="Type your message here" />
</ComponentPreviewTabs>

<ComponentPreviewTabs>
    Small size
    <Textarea placeholder="Type your message here" size="sm" />
</ComponentPreviewTabs>

<ComponentPreviewTabs>
    Large size
    <Textarea placeholder="Type your message here" size="lg" />
</ComponentPreviewTabs>
<ComponentPreviewTabs>
    Disabled
    <Textarea disabled placeholder="Type your message here" />
</ComponentPreviewTabs>
<ComponentPreviewTabs>
    <div class="flex flex-col items-start gap-2">
        <Label on:fullscreenerror={id}>Message</Label>
        <Textarea {id} placeholder="Type your message here" />
    </div>
</ComponentPreviewTabs>
<ComponentPreviewTabs>
    <Form config={form} class="flex w-full max-w-64 flex-col gap-4">
        <Field name="message">
            <FieldLabel>Message</FieldLabel>
            <Textarea
                name="message"
                placeholder="Type your message here"
                required
            />
            <FieldError>This field is required.</FieldError>
        </Field>
        <Button {loading} type="submit">Submit</Button>
    </Form>
</ComponentPreviewTabs>
