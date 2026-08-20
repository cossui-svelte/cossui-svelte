<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Field, FieldDescription, FieldError, FieldLabel } from '$lib/components/ui/field';
  import { Form } from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';

  let loading = $state(false);

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    loading = true;
    await new Promise((r) => setTimeout(r, 800));
    loading = false;
    alert(`Email: ${formData.get('email') ?? ''}`);
  }
</script>

<Form class="flex w-full flex-col gap-4" onsubmit={handleSubmit}>
  <Field name="email">
    <FieldLabel>Email</FieldLabel>
    <Input disabled placeholder="Enter your email" type="email" />
    <FieldDescription>This field is currently disabled.</FieldDescription>
    <FieldError>Please enter a valid email.</FieldError>
  </Field>
  <Button {loading} type="submit">Submit</Button>
</Form>
