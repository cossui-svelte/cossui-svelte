<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Field, FieldError, FieldLabel } from '$lib/components/ui/field';
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

<Form class="flex w-full max-w-64 flex-col gap-4" onsubmit={handleSubmit}>
  <Field name="email">
    <FieldLabel>Email</FieldLabel>
    <Input placeholder="you@example.com" required type="email" />
    <FieldError>Please enter a valid email.</FieldError>
  </Field>
  <Button {loading} type="submit">Submit</Button>
</Form>
