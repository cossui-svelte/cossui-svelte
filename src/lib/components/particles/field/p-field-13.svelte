<script lang="ts">
  import { Button } from '#lib/components/ui/button/index.js';
  import { CheckboxGroup } from '#lib/components/ui/checkbox-group/index.js';
  import { Checkbox } from '#lib/components/ui/checkbox/index.js';
  import { Field, FieldItem, FieldLabel } from '#lib/components/ui/field/index.js';
  import { Fieldset, FieldsetLegend } from '#lib/components/ui/fieldset/index.js';
  import { Form } from '#lib/components/ui/form/index.js';

  let loading = $state(false);

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    loading = true;
    await new Promise((r) => setTimeout(r, 800));
    loading = false;
    alert(`Selected: ${formData.getAll('frameworks').join(', ')}`);
  }
</script>

<Form class="flex w-full flex-col gap-4" onsubmit={handleSubmit}>
  <Field name="frameworks">
    <Fieldset class="gap-2">
      <FieldsetLegend class="font-medium text-sm">Frameworks</FieldsetLegend>
      <CheckboxGroup value={['svelte']}>
        <FieldItem>
          <FieldLabel><Checkbox value="react" /> React</FieldLabel>
        </FieldItem>
        <FieldItem>
          <FieldLabel><Checkbox value="vue" /> Vue</FieldLabel>
        </FieldItem>
        <FieldItem>
          <FieldLabel><Checkbox value="svelte" /> Svelte</FieldLabel>
        </FieldItem>
      </CheckboxGroup>
    </Fieldset>
  </Field>
  <Button {loading} type="submit">Submit</Button>
</Form>
