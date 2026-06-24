<script lang="ts">
  import Check from "@lucide/svelte/icons/check";
  import Copy from "@lucide/svelte/icons/copy";
  import { buttonVariants } from "$lib/components/ui/button";
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupTextarea,
  } from "$lib/components/ui/input-group";
  import {
    Select,
    SelectItem,
    SelectPopup,
    SelectTrigger,
    SelectValue,
  } from "$lib/components/ui/select";
  import {
    Tooltip,
    TooltipPopup,
    TooltipTrigger,
  } from "$lib/components/ui/tooltip";

  const languages = [
    { label: "JavaScript", value: "javascript" },
    { label: "TypeScript", value: "typescript" },
    { label: "Python", value: "python" },
    { label: "Go", value: "go" },
    { label: "Rust", value: "rust" },
  ];

  let lang = $state("javascript");
  let code = $state("");
  let copied = $state(false);

  function handleCopy() {
    navigator.clipboard.writeText(code);
    copied = true;
    setTimeout(() => { copied = false; }, 2000);
  }
</script>

<InputGroup>
  <InputGroupTextarea
    class="font-mono"
    placeholder="Paste your code here…"
    rows={6}
    bind:value={code}
  />
  <InputGroupAddon
    align="block-start"
    class="justify-between rounded-t-lg border-b bg-muted/72 p-2!"
  >
    <Select bind:value={lang} items={languages}>
      <SelectTrigger class="w-fit" size="sm">
        <SelectValue />
      </SelectTrigger>
      <SelectPopup>
        {#each languages as { label, value } (value)}
          <SelectItem {value}>{label}</SelectItem>
        {/each}
      </SelectPopup>
    </Select>
    <Tooltip>
      <TooltipTrigger
        aria-label={copied ? "Copied" : "Copy code"}
        class={buttonVariants({ size: "icon-sm", variant: "ghost" })}
        onclick={handleCopy}
      >
        {#if copied}<Check />{:else}<Copy />{/if}
      </TooltipTrigger>
      <TooltipPopup>
        {copied ? "Copied!" : "Copy to clipboard"}
      </TooltipPopup>
    </Tooltip>
  </InputGroupAddon>
</InputGroup>
