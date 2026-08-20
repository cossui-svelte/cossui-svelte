<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { Field, FieldLabel } from '$lib/components/ui/field';
  import { Form } from '$lib/components/ui/form';

  let loading = $state(false);

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    loading = true;
    await new Promise((r) => setTimeout(r, 800));
    loading = false;
    alert(`Terms: ${formData.get('terms') === 'on'}`);
  }
</script>

<Form class="flex w-auto flex-col gap-4" onsubmit={handleSubmit}>
  <Field name="terms">
    <FieldLabel>
      <Checkbox />
      Accept terms and conditions
    </FieldLabel>
  </Field>
  <Button {loading} type="submit">Submit</Button>
</Form>
