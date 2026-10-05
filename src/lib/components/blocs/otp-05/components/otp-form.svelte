<script lang="ts">
  import GalleryVerticalEndIcon from '@lucide/svelte/icons/gallery-vertical-end';
  import type { HTMLAttributes } from 'svelte/elements';
  import { Button } from '#lib/components/ui/button/index.js';
  import { Field, FieldDescription, FieldLabel } from '#lib/components/ui/field/index.js';
  import {
    OTPField,
    OTPFieldInput,
    OTPFieldSeparator
  } from '#lib/components/ui/otp-field/index.js';
  import { cn } from '#lib/utils.js';

  let { class: className, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div class={cn('flex flex-col gap-6', className)} {...restProps}>
  <form>
    <div class="flex flex-col gap-6">
      <div class="flex flex-col items-center gap-2 text-center">
        <a href="#/" class="flex flex-col items-center gap-2 font-medium">
          <div class="flex size-8 items-center justify-center rounded-md">
            <GalleryVerticalEndIcon class="size-6" />
          </div>
          <span class="sr-only">Acme Inc.</span>
        </a>
        <h1 class="text-xl font-bold">Enter verification code</h1>
        <p
          class="text-muted-foreground text-sm [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-foreground"
        >
          We sent a 6-digit code to your email address
        </p>
      </div>
      <Field>
        <FieldLabel class="sr-only">Verification code</FieldLabel>
        <OTPField maxlength={6} required class="gap-4">
          {#snippet children({ cells })}
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
          Didn't receive the code? <a href="#/">Resend</a>
        </FieldDescription>
      </Field>
      <div class="flex flex-col gap-3">
        <Button type="submit">Verify</Button>
      </div>
    </div>
  </form>
  <p
    class="text-muted-foreground text-sm [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-foreground px-6 text-center"
  >
    By clicking continue, you agree to our <a href="#/">Terms of Service</a>
    and <a href="#/">Privacy Policy</a>.
  </p>
</div>
