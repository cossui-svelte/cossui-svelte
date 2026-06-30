<script lang="ts">
  import { z } from 'zod';
  import { Button } from '$lib/components/ui/button';
  import { Field, FieldDescription, FieldError, FieldLabel } from '$lib/components/ui/field';
  import { Form } from '$lib/components/ui/form';
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '$lib/components/ui/select';
  import { createForm } from '$lib/hooks/use-superform';

  const schema = z.object({
    country: z.string().optional(),
  });

  const superform = createForm({
    onUpdated: (data) => {
      alert(`Country: ${data.country ?? 'none'}`);
    },
    schema,
  });

  const { submitting } = superform;
</script>

<Form class="flex w-full flex-col gap-4" {superform}>
  <Field name="country">
    <FieldLabel>Country</FieldLabel>
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select a country" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="us">United States</SelectItem>
        <SelectItem value="uk">United Kingdom</SelectItem>
        <SelectItem value="ca">Canada</SelectItem>
        <SelectItem value="au">Australia</SelectItem>
      </SelectContent>
    </Select>
    <FieldDescription>This is an optional field</FieldDescription>
    <FieldError />
  </Field>
  <Button loading={$submitting} type="submit">Submit</Button>
</Form>
