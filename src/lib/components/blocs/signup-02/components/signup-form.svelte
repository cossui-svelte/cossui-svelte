<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { Button } from '#lib/components/ui/button/index.js';
  import { Field, FieldDescription, FieldLabel } from '#lib/components/ui/field/index.js';
  import { Input } from '#lib/components/ui/input/index.js';
  import { Separator } from '#lib/components/ui/separator/index.js';
  import { cn } from '#lib/utils.js';

  let { class: className, ...restProps }: HTMLAttributes<HTMLFormElement> = $props();
</script>

<form class={cn('flex flex-col gap-6', className)} {...restProps}>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col items-center gap-1 text-center">
      <h1 class="text-2xl font-bold">Create your account</h1>
      <p class="text-sm text-balance text-muted-foreground">
        Fill in the form below to create your account
      </p>
    </div>
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
    <div class="flex flex-col gap-3">
      <Button type="submit">Create Account</Button>
    </div>
    <div class="flex items-center gap-3 text-muted-foreground text-sm">
      <Separator class="flex-1" />
      Or continue with
      <Separator class="flex-1" />
    </div>
    <div class="flex flex-col gap-3">
      <Button variant="outline" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
            fill="currentColor"
          />
        </svg>
        Sign up with GitHub
      </Button>
      <p
        class="text-muted-foreground text-sm [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-foreground px-6 text-center"
      >
        Already have an account? <a href="#/">Sign in</a>
      </p>
    </div>
  </div>
</form>
