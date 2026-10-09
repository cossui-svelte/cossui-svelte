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
  import { Field, FieldDescription, FieldLabel } from '#lib/components/ui/field/index.js';
  import { Input } from '#lib/components/ui/input/index.js';
  import PasswordInput from '../password/password-input.svelte';

  const MANUAL_SETUP_KEY = 'EBBDGDSAJVEA6RTUE4IGKXAJG4IBQWZ5';

  type Step = 'password' | 'scan' | 'verify';

  let { open = $bindable(false), onEnabled }: { open?: boolean; onEnabled?: () => void } = $props();

  let step = $state<Step>('password');

  $effect(() => {
    if (open) {
      step = 'password';
    }
  });

  function handleEnable() {
    onEnabled?.();
    open = false;
  }
</script>

<Dialog bind:open>
  <DialogPopup showCloseButton={false}>
    {#if step === 'password'}
      <DialogHeader>
        <DialogTitle>Enable two-factor authentication</DialogTitle>
        <DialogDescription>Confirm your current password to get started.</DialogDescription>
      </DialogHeader>
      <DialogPanel>
        <PasswordInput label="Password" placeholder="Enter your password" />
      </DialogPanel>
      <DialogFooter>
        <DialogClose class={buttonVariants({ variant: 'ghost' })}>Cancel</DialogClose>
        <Button onclick={() => (step = 'scan')} variant="outline">Continue</Button>
      </DialogFooter>
    {:else if step === 'scan'}
      <DialogHeader>
        <DialogTitle>Enable two-factor authentication</DialogTitle>
        <DialogDescription>
          Scan the image below with the authenticator app on your phone or manually enter the text
          code instead.
        </DialogDescription>
      </DialogHeader>
      <DialogPanel class="flex flex-col items-center gap-4">
        <div aria-hidden="true" class="aspect-square size-48 shrink-0 bg-black"></div>
        <code class="font-mono text-muted-foreground text-xs">{MANUAL_SETUP_KEY}</code>
      </DialogPanel>
      <DialogFooter>
        <DialogClose class={buttonVariants({ variant: 'ghost' })}>Cancel</DialogClose>
        <Button onclick={() => (step = 'verify')} variant="outline">Continue</Button>
      </DialogFooter>
    {:else}
      <DialogHeader>
        <DialogTitle>Enable two-factor authentication</DialogTitle>
        <DialogDescription>
          Enter the six-digit code from your authenticator app below.
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
          <FieldDescription>
            Two-factor authentication enabled. Please enter the six-digit code from your
            authenticator app.
          </FieldDescription>
        </Field>
      </DialogPanel>
      <DialogFooter>
        <DialogClose class={buttonVariants({ variant: 'ghost' })}>Cancel</DialogClose>
        <Button onclick={handleEnable}>Enable</Button>
      </DialogFooter>
    {/if}
  </DialogPopup>
</Dialog>
