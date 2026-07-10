<script lang="ts">
  import { z } from 'zod';
  import { Field, FieldDescription, FieldLabel } from '$lib/components/ui/field';
  import { Fieldset, FieldsetLegend } from '$lib/components/ui/fieldset';
  import { Form } from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { createForm } from '$lib/hooks/use-superform';

  const schema = z.object({
    company: z.string(),
    taxId: z.string(),
  });

  const superform = createForm({ schema });
</script>

<Form {superform} class="contents">
  <Fieldset class="flex w-full flex-col gap-6" data-slot="fieldset">
    <FieldsetLegend class="font-semibold text-foreground" data-slot="fieldset-legend">Billing Details</FieldsetLegend>

    <Field name="company">
      <FieldLabel>Company</FieldLabel>
      <Input placeholder="Enter company name" type="text" />
      <FieldDescription>The name that will appear on invoices.</FieldDescription>
    </Field>

    <Field name="taxId">
      <FieldLabel>Tax ID</FieldLabel>
      <Input placeholder="Enter tax identification number" type="text" />
      <FieldDescription>Your business tax identification number.</FieldDescription>
    </Field>
  </Fieldset>
</Form>
