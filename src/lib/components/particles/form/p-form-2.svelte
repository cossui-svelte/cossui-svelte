<script lang="ts">
  import { z } from 'zod';
  import { Button } from '$lib/components/ui/button';
  import { Field, FieldError, FieldLabel } from '$lib/components/ui/field';
  import { Form, type FormErrors } from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';

  const schema = z.object({
    age: z.coerce
      .number({ message: 'Please enter a number.' })
      .positive({ message: 'Number must be positive.' }),
    name: z.string().min(1, { message: 'Please enter a name.' })
  });

  let loading = $state(false);
  let errors = $state<FormErrors>({});

  async function handleSubmit(values: Record<string, unknown>) {
    const result = schema.safeParse(values);
    if (!result.success) {
      errors = z.flattenError(result.error).fieldErrors as FormErrors;
      return;
    }
    errors = {};
    loading = true;
    await new Promise((r) => setTimeout(r, 800));
    loading = false;
    alert(`Name: ${result.data.name}\nAge: ${result.data.age}`);
  }
</script>

<Form class="flex w-full max-w-64 flex-col gap-4" {errors} onFormSubmit={handleSubmit}>
  <Field name="name">
    <FieldLabel>Name</FieldLabel>
    <Input placeholder="Enter name" />
    <FieldError />
  </Field>
  <Field name="age">
    <FieldLabel>Age</FieldLabel>
    <Input placeholder="Enter age" />
    <FieldError />
  </Field>
  <Button {loading} type="submit">Submit</Button>
</Form>
