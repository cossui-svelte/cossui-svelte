<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Field, FieldError, FieldLabel } from '$lib/components/ui/field';
  import { Form } from '$lib/components/ui/form';
  import { Textarea } from '$lib/components/ui/textarea';

  let loading = $state(false);

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    loading = true;
    await new Promise((r) => setTimeout(r, 800));
    loading = false;
    alert(`Message: ${formData.get('message') ?? ''}`);
  }
</script>

<Form class="flex w-full max-w-64 flex-col gap-4" onsubmit={handleSubmit}>
  <Field name="message">
    <FieldLabel>Message</FieldLabel>
    <Textarea placeholder="Type your message here" required />
    <FieldError>Please fill out this field.</FieldError>
  </Field>
  <Button {loading} type="submit">Submit</Button>
</Form>
