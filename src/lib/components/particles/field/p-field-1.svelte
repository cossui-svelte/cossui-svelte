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
    alert(`Name: ${formData.get('name') ?? ''}`);
  }
</script>

<Form class="flex w-full flex-col gap-4" onsubmit={handleSubmit}>
  <Field name="name">
    <FieldLabel>Name</FieldLabel>
    <Input placeholder="Enter your name" required type="text" />
    <FieldDescription>Visible on your profile</FieldDescription>
    <FieldError>Please enter your name.</FieldError>
  </Field>
  <Button {loading} type="submit">Submit</Button>
</Form>
