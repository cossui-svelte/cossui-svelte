<script lang="ts">
  import { z } from 'zod';
  import { Button } from '$lib/components/ui/button';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { Field, FieldDescription, FieldError, FieldLabel } from '$lib/components/ui/field';
  import { Form } from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '$lib/components/ui/select';
  import { createForm } from '$lib/hooks/use-superform';

  const schema = z.object({
    email: z.string().email({ message: 'Please enter a valid email.' }),
    fullName: z.string().min(1, { message: 'Please enter a valid name.' }),
    newsletter: z.boolean().optional(),
    role: z.string().optional(),
  });

  const superform = createForm({
    onUpdated: (data) => {
      alert(
        `Full name: ${data.fullName}\nEmail: ${data.email}\nRole: ${data.role ?? ''}\nNewsletter: ${data.newsletter ?? false}`
      );
    },
    schema,
  });

  const { submitting } = superform;
</script>

<Form class="flex w-full flex-col gap-4" {superform}>
  <Field name="fullName">
    <FieldLabel>Full Name <span class="text-destructive">*</span></FieldLabel>
    <Input placeholder="John Doe" type="text" />
    <FieldError />
  </Field>

  <Field name="email">
    <FieldLabel>Email <span class="text-destructive">*</span></FieldLabel>
    <Input placeholder="john@example.com" type="email" />
    <FieldError />
  </Field>

  <Field name="role">
    <FieldLabel>Role</FieldLabel>
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select your role" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="developer">Developer</SelectItem>
        <SelectItem value="designer">Designer</SelectItem>
        <SelectItem value="manager">Product Manager</SelectItem>
        <SelectItem value="other">Other</SelectItem>
      </SelectContent>
    </Select>
    <FieldDescription>This is an optional field</FieldDescription>
  </Field>

  <Field name="newsletter">
    <div class="flex items-center gap-2">
      <Checkbox />
      <FieldLabel class="cursor-pointer">Subscribe to newsletter</FieldLabel>
    </div>
  </Field>

  <Button loading={$submitting} type="submit">Submit</Button>
</Form>
