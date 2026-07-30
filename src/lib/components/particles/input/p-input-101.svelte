<script lang="ts">
  import { DefaultDateDelimiter, formatDate, registerCursorTracker } from 'cleave-zen';
  import type { Attachment } from 'svelte/attachments';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';

  const expiryAttachment: Attachment<HTMLInputElement> = (input) => {
    const unregisterCursorTracker = registerCursorTracker({
      delimiter: DefaultDateDelimiter,
      input
    });

    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement;
      target.value = formatDate(target.value, {
        datePattern: ['m', 'y']
      });
    };

    input.addEventListener('input', handleInput);

    return () => {
      input.removeEventListener('input', handleInput);
      unregisterCursorTracker();
    };
  };
</script>

<div class="*:not-first:mt-2">
  <Label for="input-49">Expiry date</Label>
  <Input
    id="input-49"
    type="text"
    placeholder="MM/YY"
    autocomplete="cc-exp"
    class="peer pe-11"
    {@attach expiryAttachment}
  />
</div>
