<script lang="ts">
import Check from '@lucide/svelte/icons/check';
import Copy from '@lucide/svelte/icons/copy';
import { Button } from '$lib/components/ui/button';

interface Props {
  page: string;
}

let { page }: Props = $props();

let isCopied = $state(false);
let timeoutId: ReturnType<typeof setTimeout> | undefined;

async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(page);
    isCopied = true;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      isCopied = false;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
}
</script>

<Button onclick={copyToClipboard} size="xs" variant="outline">
  {#if isCopied}
    <Check class="size-4" strokeWidth={2.5} />
  {:else}
    <Copy class="size-4" strokeWidth={2.5} />
  {/if}
  Copy Markdown
</Button>
