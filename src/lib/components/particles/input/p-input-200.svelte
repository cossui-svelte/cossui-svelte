<script lang="ts">
  import { registerCursorTracker } from 'cleave-zen';
  import type { Attachment } from 'svelte/attachments';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';

  // Groups digits into up to 4 dot-separated octets, capping each at 255 by
  // rolling any digit that would overflow it into the start of the next octet.
  function formatIPv4(value: string): string {
    const digits = value.replace(/\D/g, '');
    const octets = [''];

    for (const digit of digits) {
      const last = octets.length - 1;
      const candidate = octets[last] + digit;
      if (octets[last].length < 3 && Number(candidate) <= 255) {
        octets[last] = candidate;
      } else if (octets.length < 4) {
        octets.push(digit);
      }
    }

    return octets.join('.');
  }

  const ipv4Attachment: Attachment<HTMLInputElement> = (input) => {
    const unregisterCursorTracker = registerCursorTracker({
      delimiter: '.',
      input
    });

    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement;
      target.value = formatIPv4(target.value);
    };

    input.addEventListener('input', handleInput);

    return () => {
      input.removeEventListener('input', handleInput);
      unregisterCursorTracker();
    };
  };
</script>

<div class="space-y-4">
  <div class="*:not-first:mt-2">
    <Label for="input-200-ip">IP Address</Label>
    <Input
      id="input-200-ip"
      type="text"
      inputmode="decimal"
      placeholder="192.168.1.1"
      {@attach ipv4Attachment}
    />
  </div>
  <div class="*:not-first:mt-2">
    <Label for="input-200-subnet">Subnet Mask</Label>
    <Input
      id="input-200-subnet"
      type="text"
      inputmode="decimal"
      placeholder="255.255.255.0"
      {@attach ipv4Attachment}
    />
  </div>
  <div class="*:not-first:mt-2">
    <Label for="input-200-gateway">Gateway</Label>
    <Input
      id="input-200-gateway"
      type="text"
      inputmode="decimal"
      placeholder="192.168.1.254"
      {@attach ipv4Attachment}
    />
  </div>
</div>
