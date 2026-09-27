<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import { Button } from '$lib/components/ui/button';
  import { Card, CardDescription, CardHeader, CardPanel, CardTitle } from '$lib/components/ui/card';
  import { Field, FieldDescription, FieldLabel } from '$lib/components/ui/field';
  import { Input } from '$lib/components/ui/input';

  let { ...restProps }: ComponentProps<typeof Card> = $props();
</script>

<Card {...restProps}>
  <CardHeader>
    <CardTitle>Create an account</CardTitle>
    <CardDescription>Enter your information below to create your account</CardDescription>
  </CardHeader>
  <CardPanel>
    <form>
      <div class="flex flex-col gap-6">
        <Field>
          <FieldLabel>Full Name</FieldLabel>
          <Input type="text" placeholder="John Doe" required />
        </Field>
        <Field>
          <FieldLabel>Email</FieldLabel>
          <Input type="email" placeholder="m@example.com" required />
          <FieldDescription>
            We'll use this to contact you. We will not share your email with anyone else.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel>Password</FieldLabel>
          <Input type="password" required />
          <FieldDescription>Must be at least 8 characters long.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel>Confirm Password</FieldLabel>
          <Input type="password" required />
          <FieldDescription>Please confirm your password.</FieldDescription>
        </Field>
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-3">
            <Button type="submit">Create Account</Button>
            <Button variant="outline" type="button">Sign up with Google</Button>
            <p
              class="text-muted-foreground text-sm [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-foreground px-6 text-center"
            >
              Already have an account? <a href="#/">Sign in</a>
            </p>
          </div>
        </div>
      </div>
    </form>
  </CardPanel>
</Card>
