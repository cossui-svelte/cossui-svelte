<script lang="ts">
  import { Button } from '#lib/components/ui/button/index.js';
  import { Checkbox } from '#lib/components/ui/checkbox/index.js';
  import { Field, FieldLabel } from '#lib/components/ui/field/index.js';
  import { Form } from '#lib/components/ui/form/index.js';

  let loading = $state(false);

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    loading = true;
    await new Promise((r) => setTimeout(r, 800));
    loading = false;
    alert(`Terms accepted: ${formData.get('terms') === 'on'}`);
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
