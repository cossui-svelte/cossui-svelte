<script lang="ts">
  import ShieldAlert from "@lucide/svelte/icons/shield-alert";
  import { Button } from "$lib/components/ui/button";
  import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardPanel,
    CardTitle,
  } from "$lib/components/ui/card";
  import { Field, FieldLabel } from "$lib/components/ui/field";
  import { Form } from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
</script>

<Card class="w-full max-w-xs">
  <CardHeader class="border-b">
    <CardTitle>Login to your account</CardTitle>
    <CardDescription>Enter email and password to login</CardDescription>
  </CardHeader>
  <CardPanel>
    <Form class="flex w-full flex-col gap-4">
      <Field>
        <FieldLabel>Email</FieldLabel>
        <Input placeholder="Enter your email" type="email" />
      </Field>
      <Field>
        <FieldLabel>Password</FieldLabel>
        <Input placeholder="Enter your password" type="password" />
      </Field>
      <Button class="w-full" type="submit">Login</Button>
    </Form>
  </CardPanel>
  <CardFooter class="border-t">
    <div class="flex gap-1 text-muted-foreground text-xs">
      <ShieldAlert class="size-3 h-lh shrink-0" />
      <p>The information you enter is encrypted and stored securely.</p>
    </div>
  </CardFooter>
</Card>
