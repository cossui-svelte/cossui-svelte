<script lang="ts">
  import { z } from 'zod';
  import { Button } from '$lib/components/ui/button';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { Field, FieldLabel } from '$lib/components/ui/field';
  import { Form } from '$lib/components/ui/form';
  import { createForm } from '$lib/hooks/use-superform';

  const schema = z.object({
    terms: z.boolean(),
  });

  const superform = createForm({
    onUpdated: (data) => {
      alert(`Terms accepted: ${data.terms}`);
    },
    schema,
  });

  const { form: formData, submitting } = superform;
</script>

<Form class="flex w-auto flex-col gap-4" {superform}>
  <Field name="terms">
    <FieldLabel>
      <Checkbox bind:checked={$formData.terms as boolean | undefined} />
      Accept terms and conditions
    </FieldLabel>
  </Field>
  <Button loading={$submitting} type="submit">Submit</Button>
</Form>
