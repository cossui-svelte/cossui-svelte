<script lang="ts">
  import X from "@lucide/svelte/icons/x";
  import { Button } from "$lib/components/ui/button";
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
  } from "$lib/components/ui/input-group";

  let value = $state("Clear me");
</script>

<InputGroup>
  <InputGroupInput
    aria-label="Text input with clear button"
    oninput={(e) => { value = (e.currentTarget as HTMLInputElement).value; }}
    placeholder="Enter text"
    type="text"
    {value}
  />
  {#if value}
    <InputGroupAddon align="inline-end">
      <Button
        aria-label="Clear input"
        onclick={() => { value = ""; }}
        size="icon-xs"
        variant="ghost"
      >
        <X aria-hidden="true" />
      </Button>
    </InputGroupAddon>
  {/if}
</InputGroup>
