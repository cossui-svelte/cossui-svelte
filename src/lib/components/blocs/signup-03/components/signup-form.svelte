<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { Button } from '#lib/components/ui/button/index.js';
  import {
    Card,
    CardDescription,
    CardHeader,
    CardPanel,
    CardTitle
  } from '#lib/components/ui/card/index.js';
  import { Field, FieldLabel } from '#lib/components/ui/field/index.js';
  import { Input } from '#lib/components/ui/input/index.js';
  import { cn } from '#lib/utils.js';

  let { class: className, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div class={cn('flex flex-col gap-6', className)} {...restProps}>
  <Card>
    <CardHeader class="text-center">
      <CardTitle class="text-xl">Create your account</CardTitle>
      <CardDescription>Enter your email below to create your account</CardDescription>
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
          </Field>
          <div class="flex flex-col gap-3">
            <div class="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel>Password</FieldLabel>
                <Input type="password" required />
              </Field>
              <Field>
                <FieldLabel>Confirm Password</FieldLabel>
                <Input type="password" required />
              </Field>
            </div>
            <p
              class="text-muted-foreground text-sm [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-foreground"
            >
              Must be at least 8 characters long.
            </p>
          </div>
          <div class="flex flex-col gap-3">
            <Button type="submit">Create Account</Button>
            <p
              class="text-muted-foreground text-sm [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-foreground text-center"
            >
              Already have an account? <a href="#/">Sign in</a>
            </p>
          </div>
        </div>
      </form>
    </CardPanel>
  </Card>
  <p
    class="text-muted-foreground text-sm [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-foreground px-6 text-center"
  >
    By clicking continue, you agree to our <a href="#/">Terms of Service</a>
    and <a href="#/">Privacy Policy</a>.
  </p>
</div>
