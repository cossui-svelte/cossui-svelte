<script lang="ts">
  import CreditCardIcon from '@lucide/svelte/icons/credit-card';
  import StoreIcon from '@lucide/svelte/icons/store';
  import {
    DefaultCreditCardDelimiter,
    DefaultDateDelimiter,
    formatCreditCard,
    formatDate,
    formatGeneral,
    registerCursorTracker
  } from 'cleave-zen';
  import type { Attachment } from 'svelte/attachments';
  import { Badge } from '$lib/components/ui/badge';
  import { Button, buttonVariants } from '$lib/components/ui/button';
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
  import { Radio, RadioGroup } from '$lib/components/ui/radio-group';

  const id = $props.id();

  let name = $state('');
  let showCouponInput = $state(false);
  let couponCode = $state('');
  let couponInputEl = $state<HTMLInputElement | null>(null);

  $effect(() => {
    if (showCouponInput) {
      couponInputEl?.focus();
    }
  });

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
  <DialogTrigger class={buttonVariants({ variant: 'outline' })}>Checkout</DialogTrigger>
  <DialogPopup>
    <div class="flex flex-col gap-2 px-6 pt-6">
      <div class="flex size-11 shrink-0 items-center justify-center rounded-full border">
        <StoreIcon class="opacity-80" size={16} />
      </div>
      <DialogHeader class="p-0">
        <DialogTitle class="text-left">Confirm and pay</DialogTitle>
        <DialogDescription class="text-left">Pay securely and cancel any time.</DialogDescription>
      </DialogHeader>
    </div>

    <DialogPanel class="flex flex-col gap-5">
      <div class="flex flex-col gap-4">
        <RadioGroup class="grid grid-cols-2 gap-3" value="yearly">
          <Label
            class="relative flex cursor-pointer flex-col gap-1 rounded-md border border-input px-4 py-3 shadow-xs outline-none has-data-[state=checked]:border-primary/50"
          >
            <Radio class="sr-only after:absolute after:inset-0" value="monthly" />
            <p class="font-medium text-foreground text-sm">Monthly</p>
            <p class="text-muted-foreground text-sm">$32/month</p>
          </Label>
          <Label
            class="relative flex cursor-pointer flex-col gap-1 rounded-md border border-input px-4 py-3 shadow-xs outline-none has-data-[state=checked]:border-primary/50"
          >
            <Radio class="sr-only after:absolute after:inset-0" value="yearly" />
            <div class="inline-flex items-start justify-between gap-2">
              <p class="font-medium text-foreground text-sm">Yearly</p>
              <Badge>Popular</Badge>
            </div>
            <p class="text-muted-foreground text-sm">$320/month</p>
          </Label>
        </RadioGroup>
        <div class="flex flex-col gap-2">
          <Label for="{id}-name">Name on card</Label>
          <Input id="{id}-name" required type="text" bind:value={name} />
        </div>
        <div class="flex flex-col gap-2">
          <legend class="font-medium text-foreground text-sm">Card Details</legend>
          <div class="rounded-md shadow-xs">
            <div class="relative focus-within:z-10">
              <Input class="peer rounded-b-none pe-9 shadow-none" {@attach cardNumberAttachment} />
              <div
                class="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50"
              >
                <CreditCardIcon aria-hidden="true" size={16} />
              </div>
            </div>
            <div class="-mt-px flex">
              <div class="min-w-0 flex-1 focus-within:z-10">
                <Input
                  class="rounded-e-none rounded-t-none shadow-none"
                  {@attach expiryAttachment}
                />
              </div>
              <div class="-ms-px min-w-0 flex-1 focus-within:z-10">
                <Input class="rounded-s-none rounded-t-none shadow-none" {@attach cvcAttachment} />
              </div>
            </div>
          </div>
        </div>
        {#if !showCouponInput}
          <button
            class="text-sm underline hover:no-underline"
            onclick={() => {
              showCouponInput = true;
            }}
            type="button"
          >
            + Add coupon
          </button>
        {:else}
          <div class="flex flex-col gap-2">
            <Label for="{id}-coupon">Coupon code</Label>
            <Input
              id="{id}-coupon"
              bind:ref={couponInputEl}
              placeholder="Enter your code"
              bind:value={couponCode}
            />
          </div>
        {/if}
      </div>
      <Button class="w-full">Subscribe</Button>
      <p class="text-center text-muted-foreground text-xs">
        Payments are non-refundable. Cancel anytime.
      </p>
    </DialogPanel>
  </DialogPopup>
</Dialog>
