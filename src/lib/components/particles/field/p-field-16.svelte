<script lang="ts">
  import { z } from 'zod';
  import { Button } from '$lib/components/ui/button';
  import { Field, FieldDescription, FieldError, FieldLabel } from '$lib/components/ui/field';
  import { Form } from '$lib/components/ui/form';
  import { Slider } from '$lib/components/ui/slider';
  import { createForm } from '$lib/hooks/use-superform';

  const schema = z.object({
    volume: z.number().optional(),
  });

  const superform = createForm({
    initialData: { volume: 50 },
    onUpdated: (data) => {
      alert(`Volume: ${data.volume ?? 50}`);
    },
    schema,
  });

  const { form, submitting } = superform;
</script>

<Form class="flex w-full flex-col gap-4" {superform}>
  <Field class="items-stretch gap-3" name="volume">
    <FieldLabel>Volume</FieldLabel>
    <Slider bind:value={$form.volume} />
    <FieldDescription>This is an optional field</FieldDescription>
    <FieldError />
  </Field>
  <Button loading={$submitting} type="submit">Submit</Button>
</Form>
