<script lang="ts">
  import { z } from 'zod';
  import { Button } from '$lib/components/ui/button';
  import { FieldDescription, FieldItem, FieldLabel } from '$lib/components/ui/field';
  import { Fieldset, FieldsetLegend } from '$lib/components/ui/fieldset';
  import { Form } from '$lib/components/ui/form';
  import { Radio, RadioGroup } from '$lib/components/ui/radio-group';
  import { createForm } from '$lib/hooks/use-superform';

  const schema = z.object({
    plan: z.string(),
  });

  const superform = createForm({
    initialData: { plan: 'free' },
    onUpdated: ({ plan }) => alert(`Selected plan: ${plan}`),
    schema,
  });

  const { form, submitting } = superform;
</script>

<Form class="flex w-full flex-col gap-4" {superform}>
  <Fieldset class="gap-2" name="plan">
    <FieldsetLegend class="font-medium text-sm">Choose Plan</FieldsetLegend>
    <RadioGroup bind:value={$form.plan as string}>
      <FieldItem>
        <FieldLabel><Radio value="free" /> Free</FieldLabel>
      </FieldItem>
      <FieldItem>
        <FieldLabel><Radio value="pro" /> Pro</FieldLabel>
      </FieldItem>
      <FieldItem>
        <FieldLabel><Radio value="enterprise" /> Enterprise</FieldLabel>
      </FieldItem>
    </RadioGroup>
    <FieldDescription>Select the plan that fits your needs.</FieldDescription>
  </Fieldset>
  <Button loading={$submitting} type="submit">Submit</Button>
</Form>
