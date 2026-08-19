<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { CheckboxGroup } from '$lib/components/ui/checkbox-group';
  import { Field, FieldItem, FieldLabel } from '$lib/components/ui/field';
  import { Fieldset, FieldsetLegend } from '$lib/components/ui/fieldset';
  import { Form } from '$lib/components/ui/form';

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
