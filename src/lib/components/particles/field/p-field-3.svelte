<script lang="ts">
  import { z } from 'zod';
  import { Button } from '$lib/components/ui/button';
  import { Field, FieldDescription, FieldError, FieldLabel } from '$lib/components/ui/field';
  import { Form } from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { createForm } from '$lib/hooks/use-superform';

  const schema = z.object({
    email: z.email({ message: 'Please enter a valid email.' }),
  });

  const superform = createForm({
    onUpdated: (data) => {
      alert(`Email: ${data.email}`);
    },
    schema,
  });

  const { submitting } = superform;
</script>

<Form class="flex w-full flex-col gap-4" {superform}>
  <Field name="email">
    <FieldLabel>Email</FieldLabel>
    <Input disabled placeholder="Enter your email" type="email" />
    <FieldDescription>This field is currently disabled.</FieldDescription>
    <FieldError />
  </Field>
  <Button loading={$submitting} type="submit">Submit</Button>
</Form>
