<script lang="ts">
  import { z } from 'zod';
  import { Button } from '$lib/components/ui/button';
  import { Field, FieldDescription, FieldError } from '$lib/components/ui/field';
  import { Form } from '$lib/components/ui/form';
  import {
    NumberField,
    NumberFieldDecrement,
    NumberFieldGroup,
    NumberFieldIncrement,
    NumberFieldInput,
    NumberFieldScrubArea,
  } from '$lib/components/ui/number-field';
  import { createForm } from '$lib/hooks/use-superform';

  const schema = z.object({
    quantity: z.number().min(1).max(100),
  });

  const superform = createForm({
    initialData: { quantity: 1 },
    onUpdated: (data) => {
      alert(`Quantity: ${data.quantity}`);
    },
    schema,
  });

  const { submitting } = superform;
</script>

<Form class="flex w-full flex-col gap-4" {superform}>
  <Field name="quantity">
    <NumberField max={100} min={1} value={1}>
      <NumberFieldScrubArea label="Quantity" />
      <NumberFieldGroup>
        <NumberFieldDecrement />
        <NumberFieldInput />
        <NumberFieldIncrement />
      </NumberFieldGroup>
    </NumberField>
    <FieldDescription>Choose a value between 1 and 100.</FieldDescription>
    <FieldError />
  </Field>
  <Button loading={$submitting} type="submit">Submit</Button>
</Form>
