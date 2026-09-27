<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { Button } from '$lib/components/ui/button';
  import { Field, FieldDescription, FieldLabel } from '$lib/components/ui/field';
  import { OTPField, OTPFieldInput, OTPFieldSeparator } from '$lib/components/ui/otp-field';
  import { cn } from '$lib/utils';

  let { class: className, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div class={cn('flex flex-col gap-6', className)} {...restProps}>
  <form>
    <div class="flex flex-col gap-6">
      <div class="flex flex-col items-center gap-1 text-center">
        <h1 class="text-2xl font-bold">Enter verification code</h1>
        <p class="text-sm text-balance text-muted-foreground">
          We sent a 6-digit code to your email.
        </p>
      </div>
      <Field>
        <FieldLabel class="sr-only">Verification code</FieldLabel>
        <OTPField maxlength={6} required>
          {#snippet children({
    cells
  })}
            {#each cells.slice(0, 2) as cell (cell)}
              <OTPFieldInput {cell} />
            {/each}
            <OTPFieldSeparator />
            {#each cells.slice(2, 4) as cell (cell)}
              <OTPFieldInput {cell} />
            {/each}
            <OTPFieldSeparator />
            {#each cells.slice(4, 6) as cell (cell)}
              <OTPFieldInput {cell} />
            {/each}
          {/snippet}
        </OTPField>
        <FieldDescription class="text-center">
          Enter the 6-digit code sent to your email.
        </FieldDescription>
      </Field>
      <Button type="submit">Verify</Button>
      <p
        class="text-muted-foreground text-sm [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-foreground text-center"
      >
        Didn't receive the code? <a href="#/">Resend</a>
      </p>
    </div>
  </form>
</div>
