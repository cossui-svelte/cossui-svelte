<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Field, FieldDescription, FieldError, FieldLabel } from '$lib/components/ui/field';
  import { Form } from '$lib/components/ui/form';
  import { Textarea } from '$lib/components/ui/textarea';

  let loading = $state(false);

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    loading = true;
    await new Promise((r) => setTimeout(r, 800));
    loading = false;
    alert(`Bio: ${formData.get('bio') ?? ''}`);
  }
</script>

<Form class="flex w-full flex-col gap-4" onsubmit={handleSubmit}>
  <Field name="bio">
    <FieldLabel>Bio</FieldLabel>
    <Textarea maxlength={500} placeholder="Tell us about yourself…" />
    <FieldDescription>Write a short bio. Maximum 500 characters.</FieldDescription>
    <FieldError>Bio must be 500 characters or fewer.</FieldError>
  </Field>
  <Button {loading} type="submit">Submit</Button>
</Form>
