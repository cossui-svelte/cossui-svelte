<script lang="ts">
    import ComponentPreviewTabs from "$lib/components/app/ComponentPreviewTabs.svelte";
    import { Button } from "$lib/components/ui/button";
    import { Field, FieldError, FieldLabel } from "$lib/components/ui/field";
    import { Form } from "$lib/components/ui/form";
    import { Input } from "$lib/components/ui/input";

    const [loading, setLoading] = useState(false);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        setLoading(true);
        await new Promise((r) => setTimeout(r, 800));
        setLoading(false);
        alert(`Email: ${formData.get("email") || ""}`);
    };
</script>

<ComponentPreviewTabs>
    <Form class="max-w-64" {onSubmit}>
        <Field name="email">
            <FieldLabel>Email</FieldLabel>
            <Input placeholder="you@example.com" required type="email" />
            <FieldError>Please enter a valid email.</FieldError>
        </Field>
        <Button {loading} type="submit">Submit</Button>
    </Form>
</ComponentPreviewTabs>
