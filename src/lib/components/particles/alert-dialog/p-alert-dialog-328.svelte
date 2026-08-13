<script lang="ts">
  import CreditCardIcon from '@lucide/svelte/icons/credit-card';
  import WalletIcon from '@lucide/svelte/icons/wallet';
  import {
    DefaultCreditCardDelimiter,
    DefaultDateDelimiter,
    formatCreditCard,
    formatDate,
    formatGeneral,
    registerCursorTracker
  } from 'cleave-zen';
  import type { Attachment } from 'svelte/attachments';
  import { Button, buttonVariants } from '$lib/components/ui/button';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import {
    Dialog,
    DialogDescription,
    DialogHeader,
    DialogPanel,
    DialogPopup,
    DialogTitle,
    DialogTrigger
  } from '$lib/components/ui/dialog';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';

  const id = $props.id();

  let name = $state('');
  let setAsDefault = $state(false);

  const cardNumberAttachment: Attachment<HTMLInputElement> = (input) => {
    const unregisterCursorTracker = registerCursorTracker({
      delimiter: DefaultCreditCardDelimiter,
      input
    });

    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement;
      target.value = formatCreditCard(target.value);
    };

    input.addEventListener('input', handleInput);

    return () => {
      input.removeEventListener('input', handleInput);
      unregisterCursorTracker();
    };
  };

  const expiryAttachment: Attachment<HTMLInputElement> = (input) => {
    const unregisterCursorTracker = registerCursorTracker({
      delimiter: DefaultDateDelimiter,
      input
    });

    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement;
      target.value = formatDate(target.value, { datePattern: ['m', 'y'] });
    };

    input.addEventListener('input', handleInput);

    return () => {
      input.removeEventListener('input', handleInput);
      unregisterCursorTracker();
    };
  };

  const cvcAttachment: Attachment<HTMLInputElement> = (input) => {
    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement;
      target.value = formatGeneral(target.value, { blocks: [4], numericOnly: true });
    };

    input.addEventListener('input', handleInput);

    return () => input.removeEventListener('input', handleInput);
  };
</script>

<Dialog>
  <DialogTrigger class={buttonVariants({ variant: 'outline' })}>Card details</DialogTrigger>
  <DialogPopup>
    <div class="flex flex-col gap-2 px-6 pt-6">
      <div class="flex size-11 shrink-0 items-center justify-center rounded-full border">
        <WalletIcon class="opacity-80" size={16} />
      </div>
      <DialogHeader class="p-0">
        <DialogTitle class="text-left">Update your card</DialogTitle>
        <DialogDescription class="text-left">
          Your new card will replace your current card.
        </DialogDescription>
      </DialogHeader>
    </div>

    <DialogPanel class="flex flex-col gap-5">
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <Label for="{id}-name">Name on card</Label>
          <Input id="{id}-name" required type="text" bind:value={name} />
        </div>
        <div class="flex flex-col gap-2">
          <Label for="{id}-number">Card Number</Label>
          <div class="relative">
            <Input
              id="{id}-number"
              class="peer pe-9"
              autocomplete="cc-number"
              {@attach cardNumberAttachment}
            />
            <div
              class="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50"
            >
              <CreditCardIcon aria-hidden="true" size={16} />
            </div>
          </div>
        </div>
        <div class="flex gap-4">
          <div class="flex flex-1 flex-col gap-2">
            <Label for="{id}-expiry">Expiry date</Label>
            <Input id="{id}-expiry" autocomplete="cc-exp" {@attach expiryAttachment} />
          </div>
          <div class="flex flex-1 flex-col gap-2">
            <Label for="{id}-cvc">CVC</Label>
            <Input id="{id}-cvc" autocomplete="cc-csc" {@attach cvcAttachment} />
          </div>
        </div>
      </div>
      <Label class="font-normal text-muted-foreground">
        <Checkbox bind:checked={setAsDefault} />
        Set as default payment method
      </Label>
      <Button class="w-full">Update card</Button>
    </DialogPanel>
  </DialogPopup>
</Dialog>
