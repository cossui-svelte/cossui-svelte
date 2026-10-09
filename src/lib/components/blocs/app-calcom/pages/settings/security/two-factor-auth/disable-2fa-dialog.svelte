<script lang="ts">
  import { Button, buttonVariants } from '#lib/components/ui/button/index.js';
  import {
    Dialog,
    DialogClose,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogPanel,
    DialogPopup,
    DialogTitle
  } from '#lib/components/ui/dialog/index.js';
  import { Field, FieldLabel } from '#lib/components/ui/field/index.js';
  import { Input } from '#lib/components/ui/input/index.js';
  import PasswordInput from '../password/password-input.svelte';

  type Step = 'password' | 'verify';

  let { open = $bindable(false), onDisabled }: { open?: boolean; onDisabled?: () => void } =
    $props();

  let step = $state<Step>('password');

  $effect(() => {
    if (open) {
      step = 'password';
    }
  });

  function handleDisable() {
    onDisabled?.();
    open = false;
  }
</script>

<Dialog bind:open>
  <DialogPopup showCloseButton={false}>
    {#if step === 'password'}
      <DialogHeader>
        <DialogTitle>Disable two-factor authentication</DialogTitle>
        <DialogDescription>
          Confirm your password and enter the six-digit code from your authenticator app to disable
          two-factor authentication.
        </DialogDescription>
      </DialogHeader>
      <DialogPanel>
        <PasswordInput label="Password" placeholder="Enter your password" />
      </DialogPanel>
      <DialogFooter>
        <DialogClose class={buttonVariants({ variant: 'ghost' })}>Cancel</DialogClose>
        <Button onclick={() => (step = 'verify')} variant="outline">Continue</Button>
      </DialogFooter>
    {:else}
      <DialogHeader>
        <DialogTitle>Disable two-factor authentication</DialogTitle>
        <DialogDescription>
          Enter the six-digit code from your authenticator app to confirm.
        </DialogDescription>
      </DialogHeader>
      <DialogPanel>
        <Field>
          <FieldLabel>Two-factor code</FieldLabel>
          <Input
            aria-label="Two-factor code"
            inputmode="numeric"
            maxlength={6}
            placeholder="000000"
            type="text"
          />
        </Field>
      </DialogPanel>
      <DialogFooter>
        <DialogClose class={buttonVariants({ variant: 'ghost' })}>Cancel</DialogClose>
        <Button onclick={handleDisable}>Disable</Button>
      </DialogFooter>
    {/if}
  </DialogPopup>
</Dialog>
