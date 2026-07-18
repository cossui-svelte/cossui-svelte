<script lang="ts">
  import { z } from 'zod';
  import { Button } from '$lib/components/ui/button';
  import { Field, FieldError, FieldLabel } from '$lib/components/ui/field';
  import { Form } from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { createForm } from '$lib/hooks/use-superform';

  const schema = z.object({
    age: z.coerce
      .number({ message: 'Please enter a number.' })
      .positive({ message: 'Number must be positive.' }), 
    name: z.string().min(1, { message: 'Please enter a name.' })
  });

  const superform = createForm({
    onUpdated: (data) => {
      alert(`Name: ${data.name}\nAge: ${data.age}`);
    }, 
    schema
  });

  const { form, submitting } = superform;
</script>

<Form class="flex w-full max-w-64 flex-col gap-4" {superform}>
  <Field name="name">
    <FieldLabel>Name</FieldLabel>
    <Input bind:value={$form.name} placeholder="Enter name" />
    <FieldError />
  </Field>
  <Field name="age">
    <FieldLabel>Age</FieldLabel>
    <Input bind:value={$form.age} placeholder="Enter age" />
    <FieldError />
  </Field>
  <Button loading={$submitting} type="submit">Submit</Button>
</Form>
