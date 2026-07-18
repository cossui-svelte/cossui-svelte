<script lang="ts">
  import { z } from 'zod';
  import { Button } from '$lib/components/ui/button';
  import { Field, FieldError, FieldLabel } from '$lib/components/ui/field';
  import { Form } from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { createForm } from '$lib/hooks/use-superform';

  const schema = z.object({
    email: z.email({ message: 'Please enter a valid email address.' }),
  });

  const superform = createForm({
    onUpdated: (data) => {
      alert(`Email: ${data.email}`);
    },
    schema,
  });

  const { form, submitting } = superform;
</script>

<Form class="flex w-full flex-col gap-4" {superform}>
  <Field name="email">
    <FieldLabel>Email</FieldLabel>
    <Input bind:value={$form.email} placeholder="Enter your email" type="email" />
    <FieldError />
  </Field>
  <Button loading={$submitting} type="submit">Submit</Button>
</Form>
