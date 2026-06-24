<script lang="ts">
  import Check from "@lucide/svelte/icons/check";
  import Copy from "@lucide/svelte/icons/copy";
  import { buttonVariants } from "$lib/components/ui/button";
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
  } from "$lib/components/ui/input-group";
  import {
    Tooltip,
    TooltipPopup,
    TooltipTrigger,
  } from "$lib/components/ui/tooltip";

  let inputValue = $state("https://coss.com");
  let isCopied = $state(false);

  async function copyToClipboard() {
    await navigator.clipboard.writeText(inputValue);
    isCopied = true;
    setTimeout(() => { isCopied = false; }, 2000);
  }
</script>

<InputGroup>
  <InputGroupInput
    aria-label="Url"
    bind:value={inputValue}
    type="text"
  />
  <InputGroupAddon align="inline-end">
    <Tooltip>
      <TooltipTrigger
        aria-label="Copy"
        class={buttonVariants({ size: "icon-xs", variant: "ghost" })}
        onclick={copyToClipboard}
      >
        {#if isCopied}<Check />{:else}<Copy />{/if}
      </TooltipTrigger>
      <TooltipPopup>
        <p>Copy to clipboard</p>
      </TooltipPopup>
    </Tooltip>
  </InputGroupAddon>
</InputGroup>
