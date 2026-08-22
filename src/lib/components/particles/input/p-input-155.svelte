<script lang="ts">
  import { formatGeneral, registerCursorTracker } from 'cleave-zen';
  import type { Attachment } from 'svelte/attachments';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';

  const maskAttachment: Attachment<HTMLInputElement> = (input) => {
    const unregisterCursorTracker = registerCursorTracker({
      delimiter: ' ',
      input
    });

    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement;
      target.value = formatGeneral(target.value, {
        blocks: [4, 3],
        delimiter: ' ',
        uppercase: true
      });
    };

    input.addEventListener('input', handleInput);

    return () => {
      input.removeEventListener('input', handleInput);
      unregisterCursorTracker();
    };
  };

  const uid = $props.id();
</script>

<div class="*:not-first:mt-2">
  <Label for={uid}>Input with mask</Label>
  <Input id={uid} placeholder="AB12 CDE" type="text" {@attach maskAttachment} />
</div>
