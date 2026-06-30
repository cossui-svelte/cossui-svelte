<script lang="ts">
  import { z } from 'zod';
  import { Button } from '$lib/components/ui/button';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { CheckboxGroup } from '$lib/components/ui/checkbox-group';
  import { Field, FieldError, FieldItem, FieldLabel } from '$lib/components/ui/field';
  import { Fieldset, FieldsetLegend } from '$lib/components/ui/fieldset';
  import { Form, FormDebug } from '$lib/components/ui/form';
  import { createForm } from '$lib/hooks/use-superform';

  const schema = z.object({
    frameworks: z.array(z.string()).min(1, { message: 'Please select at least one framework.' }),
  });

  const superform = createForm({
    initialData: { frameworks: ['next'] },
    onUpdated: ({ frameworks }) => alert(`Selected: ${frameworks.join(', ')}`),
    schema,
  });

  const { form, submitting } = superform;
</script>

<Form class="flex w-full max-w-[160px] flex-col gap-4" {superform}>
  <Field name="frameworks">
    <Fieldset>
      <FieldsetLegend class="font-medium text-sm">Frameworks</FieldsetLegend>
      <CheckboxGroup value={$form.frameworks as string[]} onValueChange={(v) => ($form.frameworks = v)}>
        <FieldItem>
          <FieldLabel>
            <Checkbox value="next" />
            Next.js
          </FieldLabel>
        </FieldItem>
        <FieldItem>
          <FieldLabel>
            <Checkbox value="vite" />
            Vite
          </FieldLabel>
        </FieldItem>
        <FieldItem>
          <FieldLabel>
            <Checkbox value="astro" />
            Astro
          </FieldLabel>
        </FieldItem>
      </CheckboxGroup>
    </Fieldset>
    <FieldError />
  </Field>

  <Button loading={$submitting} type="submit">Submit</Button>

  <FormDebug formData={form} />
</Form>
