<script lang="ts">
  import { z } from 'zod';
  import { Button } from '$lib/components/ui/button';
  import { Field, FieldDescription, FieldError, FieldLabel } from '$lib/components/ui/field';
  import { Form } from '$lib/components/ui/form';
  import { StarRating } from '$lib/components/ui/starrating';
  import { createForm } from '$lib/hooks/use-superform';

  const schema = z.object({
    rating: z.number().min(1, 'Please select a rating')
  });

  const superform = createForm({
    initialData: { rating: 0 },
    onUpdated: (data) => {
      alert(`Rating: ${data.rating}`);
    },
    schema
  });

  const { form, submitting } = superform;
</script>

<Form class="flex w-full flex-col gap-4" {superform}>
  <Field class="items-stretch gap-3" name="rating">
    <FieldLabel>How would you rate your experience?</FieldLabel>
    <StarRating bind:value={$form.rating} />
    <FieldDescription>Select a rating from 1 to 5 stars</FieldDescription>
    <FieldError />
  </Field>
  <Button loading={$submitting} type="submit">Submit</Button>
</Form>
