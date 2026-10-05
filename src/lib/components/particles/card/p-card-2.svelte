<script lang="ts">
  import { Button } from '#lib/components/ui/button/index.js';
  import {
    Card,
    CardAction,
    CardHeader,
    CardPanel,
    CardTitle
  } from '#lib/components/ui/card/index.js';
  import { Field, FieldLabel } from '#lib/components/ui/field/index.js';
  import { Form } from '#lib/components/ui/form/index.js';
  import { Input } from '#lib/components/ui/input/index.js';
</script>

<Card class="w-full max-w-xs">
  <CardHeader>
    <CardTitle>Login to your account</CardTitle>
    <CardAction>
      <a class="text-muted-foreground text-sm leading-4.5 hover:underline" href="#"> Sign up </a>
    </CardAction>
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
</Card>
