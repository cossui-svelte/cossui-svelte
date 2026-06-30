<script lang="ts">
  import { z } from 'zod';
  import { Button } from '$lib/components/ui/button';
  import { Field, FieldLabel } from '$lib/components/ui/field';
  import { Form } from '$lib/components/ui/form';
  import { Switch } from '$lib/components/ui/switch';
  import { createForm } from '$lib/hooks/use-superform';

  const schema = z.object({
    notifications: z.boolean().optional(),
  });

  const superform = createForm({
    onUpdated: (data) => {
      alert(`Email notifications: ${data.notifications ?? false}`);
    },
    schema,
  });

  const { submitting } = superform;
</script>

<Form class="flex w-full flex-col gap-4" {superform}>
  <Field name="notifications">
    <FieldLabel>
      <Switch />
      Email notifications
    </FieldLabel>
  </Field>
  <Button loading={$submitting} type="submit">Submit</Button>
</Form>
