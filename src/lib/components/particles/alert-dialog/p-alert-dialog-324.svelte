<script lang="ts">
  import { Button, buttonVariants } from '$lib/components/ui/button';
  import {
    Dialog,
    DialogClose,
    DialogDescription,
    DialogHeader,
    DialogPanel,
    DialogPopup,
    DialogTitle,
    DialogTrigger
  } from '$lib/components/ui/dialog';
  import { OTPField, OTPFieldInput } from '$lib/components/ui/otp-field';

  const CORRECT_CODE = '6548';
  const OTP_LENGTH = 4;

  let value = $state('');
  let hasGuessed = $state<boolean | undefined>(undefined);
  let closeButtonEl = $state<HTMLButtonElement | null>(null);

  $effect(() => {
    if (hasGuessed) {
      closeButtonEl?.focus();
    }
  });

  async function checkCode() {
    await new Promise((r) => setTimeout(r, 100));
    hasGuessed = value === CORRECT_CODE;
    value = '';
  }

  function handleValueChange(newValue: string) {
    if (newValue.length === OTP_LENGTH) {
      checkCode();
    }
  }
</script>

<Dialog>
  <DialogTrigger class={buttonVariants({ variant: 'outline' })}>OTP code</DialogTrigger>
  <DialogPopup>
    <div class="flex flex-col items-center gap-2 px-6 pt-6">
      <div class="flex size-11 shrink-0 items-center justify-center rounded-full border">
        <svg
          aria-hidden="true"
          class="stroke-zinc-800 dark:stroke-zinc-100"
          height="20"
          viewBox="0 0 32 32"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="16" cy="16" fill="none" r="12" stroke-width="8" />
        </svg>
      </div>
      <DialogHeader class="p-0">
        <DialogTitle class="sm:text-center">
          {hasGuessed ? 'Code verified!' : 'Enter confirmation code'}
        </DialogTitle>
        <DialogDescription class="sm:text-center">
          {hasGuessed
            ? 'Your code has been successfully verified.'
            : `Check your email and enter the code - Try ${CORRECT_CODE}`}
        </DialogDescription>
      </DialogHeader>
    </div>

    <DialogPanel>
      {#if hasGuessed}
        <div class="text-center">
          <DialogClose>
            {#snippet child({ props })}
              <Button bind:ref={closeButtonEl} {...props}>Close</Button>
            {/snippet}
          </DialogClose>
        </div>
      {:else}
        <div class="flex flex-col gap-4">
          <div class="flex justify-center">
            <OTPField
              aria-label="Confirmation code"
              maxlength={OTP_LENGTH}
              onValueChange={handleValueChange}
              bind:value
            >
              {#snippet children({ cells })}
                {#each cells as cell, i (i)}
                  <OTPFieldInput aria-label={`Digit ${i + 1} of ${OTP_LENGTH}`} {cell} />
                {/each}
              {/snippet}
            </OTPField>
          </div>
          {#if hasGuessed === false}
            <p aria-live="polite" class="text-center text-muted-foreground text-xs" role="alert">
              Invalid code. Please try again.
            </p>
          {/if}
          <p class="text-center text-sm">
            <a class="underline hover:no-underline" href="#">Resend code</a>
          </p>
        </div>
      {/if}
    </DialogPanel>
  </DialogPopup>
</Dialog>
