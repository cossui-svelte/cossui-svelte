<script lang="ts">
  import { z } from 'zod';
  import { Button } from '$lib/components/ui/button';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { CheckboxGroup } from '$lib/components/ui/checkbox-group';
  import { FieldItem, FieldLabel } from '$lib/components/ui/field';
  import { Fieldset, FieldsetLegend } from '$lib/components/ui/fieldset';
  import { Form } from '$lib/components/ui/form';
  import { createForm } from '$lib/hooks/use-superform';

  const schema = z.object({
    frameworks: z.array(z.string()).min(1, { message: 'Please select at least one framework.' }),
  });

  const superform = createForm({
    initialData: { frameworks: ['svelte'] },
    onUpdated: ({ frameworks }) => alert(`Selected: ${frameworks.join(', ')}`),
    schema,
  });

  const { form, submitting } = superform;
</script>

<Form class="flex w-full flex-col gap-4" {superform}>
  <Fieldset class="gap-2">
    <FieldsetLegend class="font-medium text-sm">Frameworks</FieldsetLegend>
    <CheckboxGroup value={$form.frameworks as string[]} onValueChange={(v) => ($form.frameworks = v)}>
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
  <Button loading={$submitting} type="submit">Submit</Button>
</Form>
