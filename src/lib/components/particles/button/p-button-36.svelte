<script lang="ts">
  import Check from "@lucide/svelte/icons/check";
  import Copy from "@lucide/svelte/icons/copy";
  import { Button } from "$lib/components/ui/button";

  let copied = $state(false);

  function handleCopy() {
    navigator.clipboard.writeText("Text copied!");
    copied = true;
    setTimeout(() => (copied = false), 2000);
  }
</script>

<Button onclick={handleCopy} variant="outline">
  {#if copied}
    <Check aria-hidden="true" />
    Copied
  {:else}
    <Copy aria-hidden="true" />
    Copy
  {/if}
</Button>
