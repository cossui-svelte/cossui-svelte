<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { Button } from '$lib/components/ui/button';
  import { Card, CardPanel } from '$lib/components/ui/card';
  import { Field, FieldDescription, FieldLabel } from '$lib/components/ui/field';
  import { OTPField, OTPFieldInput, OTPFieldSeparator } from '$lib/components/ui/otp-field';
  import { cn } from '$lib/utils';

  let { class: className, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div class={cn('flex flex-col gap-6 md:min-h-[450px]', className)} {...restProps}>
  <Card class="flex-1 overflow-hidden p-0">
    <CardPanel class="grid flex-1 p-0 md:grid-cols-2">
      <form class="flex flex-col items-center justify-center p-6 md:p-8">
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-3 items-center text-center">
            <h1 class="text-2xl font-bold">Enter verification code</h1>
            <p class="text-sm text-balance text-muted-foreground">
              We sent a 6-digit code to your email
            </p>
          </div>
          <Field>
            <FieldLabel class="sr-only">Verification code</FieldLabel>
            <OTPField maxlength={6} required class="gap-4">
              {#snippet children({
    cells
  })}
                {#each cells.slice(0, 3) as cell (cell)}
                  <OTPFieldInput {cell} />
                {/each}
                <OTPFieldSeparator />
                {#each cells.slice(3, 6) as cell (cell)}
                  <OTPFieldInput {cell} />
                {/each}
              {/snippet}
            </OTPField>
            <FieldDescription class="text-center">
              Enter the 6-digit code sent to your email.
            </FieldDescription>
          </Field>
          <div class="flex flex-col gap-3">
            <Button type="submit">Verify</Button>
            <p
              class="text-muted-foreground text-sm [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-foreground text-center"
            >
              Didn't receive the code? <a href="#/">Resend</a>
            </p>
          </div>
        </div>
      </form>
      <div class="relative hidden bg-muted md:block">
        <img
          src="/placeholder.svg"
          alt=""
          class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        >
      </div>
    </CardPanel>
  </Card>
  <p
    class="text-muted-foreground text-sm [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-foreground text-center"
  >
    By clicking continue, you agree to our <a href="#/">Terms of Service</a>
    and <a href="#/">Privacy Policy</a>.
  </p>
</div>
