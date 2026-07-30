<script lang="ts">
  import { formatGeneral } from 'cleave-zen';
  import type { Attachment } from 'svelte/attachments';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';

  const cvcAttachment: Attachment<HTMLInputElement> = (input) => {
    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement;
      target.value = formatGeneral(target.value, {
        blocks: [4],
        numericOnly: true
      });
    };

    input.addEventListener('input', handleInput);

    return () => input.removeEventListener('input', handleInput);
  };
</script>

<div class="*:not-first:mt-2">
  <Label for="input-50">Code</Label>
  <Input
    id="input-50"
    type="text"
    placeholder="CVC"
    autocomplete="cc-csc"
    class="peer pe-11"
    {@attach cvcAttachment}
  />
</div>
