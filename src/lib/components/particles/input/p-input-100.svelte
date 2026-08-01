<script lang="ts">
  import CreditCardIcon from '@lucide/svelte/icons/credit-card';
  import { DefaultCreditCardDelimiter, formatCreditCard, registerCursorTracker } from 'cleave-zen';
  import type { Attachment } from 'svelte/attachments';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';

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
</script>

<div class="*:not-first:mt-2">
  <Label for="input-48">Card Number</Label>
  <div class="relative">
    <Input
      id="input-48"
      type="text"
      placeholder="Card number"
      autocomplete="cc-number"
      class="peer pe-11"
      {@attach cardNumberAttachment}
    />
    <div
      class="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50"
    >
      <CreditCardIcon class="size-4" />
      <span class="sr-only">Card Provider</span>
    </div>
  </div>
</div>
