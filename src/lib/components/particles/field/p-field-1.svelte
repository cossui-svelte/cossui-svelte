<script lang="ts">
  import { z } from 'zod';
  import { Button } from '$lib/components/ui/button';
  import { Field, FieldDescription, FieldError, FieldLabel } from '$lib/components/ui/field';
  import { Form } from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { createForm } from '$lib/hooks/use-superform';

  const schema = z.object({
    name: z.string().min(1, { message: 'Please enter your name.' }),
  });

  const superform = createForm({
    onUpdated: (data) => {
      alert(`Name: ${data.name}`);
    },
    schema,
  });

  const { submitting } = superform;
</script>

<Form class="flex w-full flex-col gap-4" {superform}>
  <Field name="name">
    <FieldLabel>Name</FieldLabel>
    <Input placeholder="Enter your name" type="text" />
    <FieldDescription>Visible on your profile</FieldDescription>
    <FieldError />
  </Field>
  <Button loading={$submitting} type="submit">Submit</Button>
</Form>
