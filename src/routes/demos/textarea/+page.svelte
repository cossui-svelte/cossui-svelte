<script>
    import ComponentPreviewTabs from "$lib/components/app/component-preview-tabs.svelte";

    import { Form } from "$lib/components/ui/form";
    import { Textarea } from "$lib/components/ui/textarea";
    import { Field, FieldError, FieldLabel } from "$lib/components/ui/field";
    import { Button } from "$lib/components/ui/button";
    import { Label } from "$lib/components/ui/label";

    let loading = $state(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        loading = true;
        await new Promise((r) => setTimeout(r, 800));
        loading = false;
        alert(`Message: ${formData.get("message") || ""}`);
    };
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
    <div className="flex flex-col items-start gap-2">
        <Label htmlFor={id}>Message</Label>
        <Textarea {id} placeholder="Type your message here" />
    </div>
</ComponentPreviewTabs>
<ComponentPreviewTabs>
    <Form className="flex w-full max-w-64 flex-col gap-4" {onSubmit}>
        <Field>
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
