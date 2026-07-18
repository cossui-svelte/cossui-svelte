<script lang="ts">
  import { z } from "zod";
  import { Button } from "$lib/components/ui/button";
  import {
    Card,
    CardAction,
    CardHeader,
    CardPanel,
    CardTitle,
  } from "$lib/components/ui/card";
  import { Field, FieldError, FieldLabel } from "$lib/components/ui/field";
  import { Form } from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import { createForm } from "$lib/hooks/use-superform";

  const schema = z.object({
    email: z.email("Please enter a valid email."),
    password: z.string().min(8, "Password must be at least 8 characters."),
  });

  const superform = createForm({
    onUpdated: (data) => {
      alert(`Logging in as ${data.email}`);
    },
    schema,
  });

  const { form, submitting } = superform;
</script>

<Card class="w-full max-w-xs">
  <CardHeader>
    <CardTitle>Login to your account</CardTitle>
    <CardAction>
      <a class="text-muted-foreground text-sm leading-4.5 hover:underline" href="#">
        Sign up
      </a>
    </CardAction>
  </CardHeader>
  <CardPanel>
    <Form class="flex w-full flex-col gap-4" {superform}>
      <Field name="email">
        <FieldLabel>Email</FieldLabel>
        <Input bind:value={$form.email} placeholder="Enter your email" type="email" />
        <FieldError />
      </Field>
      <Field name="password">
        <FieldLabel>Password</FieldLabel>
        <Input bind:value={$form.password} placeholder="Enter your password" type="password" />
        <FieldError />
      </Field>
      <Button class="w-full" loading={$submitting} type="submit">Login</Button>
    </Form>
  </CardPanel>
</Card>
