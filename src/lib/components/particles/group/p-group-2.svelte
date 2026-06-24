<script lang="ts">
  import Check from "@lucide/svelte/icons/check";
  import Copy from "@lucide/svelte/icons/copy";
  import { buttonVariants } from "$lib/components/ui/button";
  import { Group, GroupSeparator } from "$lib/components/ui/group";
  import { Input } from "$lib/components/ui/input";
  import { Tooltip, TooltipPopup, TooltipTrigger } from "$lib/components/ui/tooltip";

  let inputValue = $state("https://coss.com");
  let isCopied = $state(false);

  async function copyToClipboard() {
    await navigator.clipboard.writeText(inputValue);
    isCopied = true;
    setTimeout(() => { isCopied = false; }, 2000);
  }
</script>

<Group aria-label="Url input">
  <Input aria-label="Url" bind:value={inputValue} type="text" />
  <GroupSeparator />
  <Tooltip>
    <TooltipTrigger
      aria-label="Copy"
      class={buttonVariants({ size: "icon", variant: "outline" })}
      onclick={copyToClipboard}
    >
      {#if isCopied}
        <Check aria-hidden />
      {:else}
        <Copy aria-hidden />
      {/if}
    </TooltipTrigger>
    <TooltipPopup>
      <p>Copy to clipboard</p>
    </TooltipPopup>
  </Tooltip>
</Group>
