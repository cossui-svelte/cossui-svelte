<script lang="ts">
  import { z } from 'zod';
  import { Button } from '$lib/components/ui/button';
  import { Field, FieldError, FieldLabel } from '$lib/components/ui/field';
  import { Form } from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { createForm } from '$lib/hooks/use-superform';

  const schema = z.object({
    password: z.string().min(1, { message: 'Please fill out this field.' }),
  });

  const superform = createForm({
    onUpdated: (_data) => {
      alert(`Password submitted`);
    },
    schema,
  });

  const { submitting } = superform;
</script>

<Form class="flex w-full flex-col gap-4" {superform}>
  <Field name="password">
    <FieldLabel>Password <span class="text-destructive-foreground">*</span></FieldLabel>
    <Input placeholder="Enter password" type="password" />
    <FieldError />
  </Field>
  <Button loading={$submitting} type="submit">Submit</Button>
</Form>
