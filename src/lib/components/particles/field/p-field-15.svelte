<script lang="ts">
  import { Button } from '#lib/components/ui/button/index.js';
  import { Field, FieldLabel } from '#lib/components/ui/field/index.js';
  import { Form } from '#lib/components/ui/form/index.js';
  import { Switch } from '#lib/components/ui/switch/index.js';

  let loading = $state(false);

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    loading = true;
    await new Promise((r) => setTimeout(r, 800));
    loading = false;
    alert(`Email notifications: ${formData.get('notifications') === 'on'}`);
  }
</script>

<Form class="flex w-full flex-col gap-4" onsubmit={handleSubmit}>
  <Field name="notifications">
    <FieldLabel>
      <Switch />
      Email notifications
    </FieldLabel>
  </Field>
  <Button {loading} type="submit">Submit</Button>
</Form>
