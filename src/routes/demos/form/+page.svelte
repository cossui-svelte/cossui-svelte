<script lang="ts">
    import ComponentPreviewTabs from "$lib/components/app/ComponentPreviewTabs.svelte";
    import { Button } from "$lib/components/ui/button";
    import { Field, FieldError, FieldLabel } from "$lib/components/ui/field";
    import { Form } from "$lib/components/ui/form";
    import { Input } from "$lib/components/ui/input";

    // const loading, setLoading = useState(false);

    const onSubmit = async (e: Event) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        alert(`Email: ${formData.get("email") || ""}`);
    };
</script>

<ComponentPreviewTabs>
    <Form class="max-w-64" onsubmit={onSubmit}>
        <Field>
            <FieldLabel>Email</FieldLabel>
            <Input
                name="email"
                placeholder="you@example.com"
                required
                type="email"
            />
            <FieldError>Please enter a valid email.</FieldError>
        </Field>
        <Button type="submit">Submit</Button>
    </Form>
</ComponentPreviewTabs>
