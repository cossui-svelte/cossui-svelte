<script lang="ts">
  import { z } from 'zod';
  import { Button } from '$lib/components/ui/button';
  import { Field, FieldDescription, FieldError, FieldLabel } from '$lib/components/ui/field';
  import { Form } from '$lib/components/ui/form';
  import { Textarea } from '$lib/components/ui/textarea';
  import { createForm } from '$lib/hooks/use-superform';

  const schema = z.object({
    bio: z.string().max(500, { message: 'Bio must be 500 characters or fewer.' }),
  });

  const superform = createForm({
    onUpdated: (data) => {
      alert(`Bio: ${data.bio}`);
    },
    schema,
  });

  const { form, submitting } = superform;
</script>

<Form class="flex w-full flex-col gap-4" {superform}>
  <Field name="bio">
    <FieldLabel>Bio</FieldLabel>
    <Textarea bind:value={$form.bio} placeholder="Tell us about yourself…" />
    <FieldDescription>Write a short bio. Maximum 500 characters.</FieldDescription>
    <FieldError />
  </Field>
  <Button loading={$submitting} type="submit">Submit</Button>
</Form>
