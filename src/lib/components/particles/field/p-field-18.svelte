<script lang="ts">
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
    SelectValue
  } from '$lib/components/ui/select';

  let loading = $state(false);

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    loading = true;
    await new Promise((r) => setTimeout(r, 800));
    loading = false;
    alert(
      `Full name: ${formData.get('fullName')}\nEmail: ${formData.get('email')}\nRole: ${
        formData.get('role') ?? ''
      }\nNewsletter: ${formData.get('newsletter') === 'on'}`
    );
  }
</script>

<Form class="flex w-full flex-col gap-4" onsubmit={handleSubmit}>
  <Field name="fullName">
    <FieldLabel>Full Name <span class="text-destructive">*</span></FieldLabel>
    <Input placeholder="John Doe" required type="text" />
    <FieldError>Please enter a valid name.</FieldError>
  </Field>

  <Field name="email">
    <FieldLabel>Email <span class="text-destructive">*</span></FieldLabel>
    <Input placeholder="john@example.com" required type="email" />
    <FieldError>Please enter a valid email.</FieldError>
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

  <Button {loading} type="submit">Submit</Button>
</Form>
