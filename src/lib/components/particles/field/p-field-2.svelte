<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Field, FieldError, FieldLabel } from '$lib/components/ui/field';
  import { Form } from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';

  let loading = $state(false);

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    loading = true;
    await new Promise((r) => setTimeout(r, 800));
    loading = false;
    alert('Password submitted');
  }
</script>

<Form class="flex w-full flex-col gap-4" onsubmit={handleSubmit}>
  <Field name="password">
    <FieldLabel>Password <span class="text-destructive-foreground">*</span></FieldLabel>
    <Input placeholder="Enter password" required type="password" />
    <FieldError>Please fill out this field.</FieldError>
  </Field>
  <Button {loading} type="submit">Submit</Button>
</Form>
