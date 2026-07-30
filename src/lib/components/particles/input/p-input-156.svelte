<script lang="ts">
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';

  import { formatTime, registerCursorTracker } from 'cleave-zen';
  import type { Attachment } from 'svelte/attachments';

  const timestampAttachment: Attachment<HTMLInputElement> = (input) => {
    const unregisterCursorTracker = registerCursorTracker({
      delimiter: ':',
      input
    });

    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement;
      target.value = formatTime(target.value, {
        timePattern: ['h', 'm', 's']
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
  <Label for={uid}>Timestamp</Label>
  <Input id={uid} placeholder="00:00:00" type="text" {@attach timestampAttachment} />
</div>
