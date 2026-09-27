<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import { Button } from '$lib/components/ui/button';
  import { Card, CardDescription, CardHeader, CardPanel, CardTitle } from '$lib/components/ui/card';
  import { Field, FieldDescription, FieldLabel } from '$lib/components/ui/field';
  import { OTPField, OTPFieldInput } from '$lib/components/ui/otp-field';

  let { ...props }: ComponentProps<typeof Card> = $props();
</script>

<Card {...props}>
  <CardHeader>
    <CardTitle>Enter verification code</CardTitle>
    <CardDescription>We sent a 6-digit code to your email.</CardDescription>
  </CardHeader>
  <CardPanel>
    <form>
      <div class="flex flex-col gap-6">
        <Field>
          <FieldLabel>Verification code</FieldLabel>
          <OTPField maxlength={6} required>
            {#snippet children({
    cells
  })}
              {#each cells as cell (cell)}
                <OTPFieldInput {cell} />
              {/each}
            {/snippet}
          </OTPField>
          <FieldDescription>Enter the 6-digit code sent to your email.</FieldDescription>
        </Field>
        <div class="flex flex-col gap-6">
          <Button type="submit">Verify</Button>
          <p
            class="text-muted-foreground text-sm [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-foreground text-center"
          >
            Didn't receive the code? <a href="#/">Resend</a>
          </p>
        </div>
      </div>
    </form>
  </CardPanel>
</Card>
