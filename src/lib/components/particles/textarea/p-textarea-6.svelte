<script lang="ts">
  import { z } from 'zod';
  import { Button } from '$lib/components/ui/button';
  import { Field, FieldError, FieldLabel } from '$lib/components/ui/field';
  import { Form } from '$lib/components/ui/form';
  import { Textarea } from '$lib/components/ui/textarea';
  import { createForm } from '$lib/hooks/use-superform';

  const schema = z.object({
    message: z.string().min(1, { message: 'Please fill out this field.' }),
  });

  const superform = createForm({
    onUpdated: (data) => {
      alert(`Message: ${data.message}`);
    },
    schema,
  });

  const { form, submitting } = superform;
</script>

<Form class="flex w-full max-w-64 flex-col gap-4" {superform}>
  <Field name="message">
    <FieldLabel>Message</FieldLabel>
    <Textarea bind:value={$form.message} placeholder="Type your message here" />
    <FieldError />
  </Field>
  <Button loading={$submitting} type="submit">Submit</Button>
</Form>
