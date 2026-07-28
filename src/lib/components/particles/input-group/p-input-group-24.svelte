<script lang="ts">
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
  } from "$lib/components/ui/input-group";
  import { useCharacterLimit } from "$lib/hooks/use-character-limit.svelte";

  const charLimit = useCharacterLimit(14);
</script>

<InputGroup>
  <InputGroupInput
    aria-label="Username"
    maxlength={charLimit.maxLength}
    placeholder="Enter username"
    type="text"
    bind:value={charLimit.value}
  />
  <InputGroupAddon align="inline-end">
    <InputGroupText
      aria-live="polite"
      class="text-xs tabular-nums"
      role="status"
    >
      {charLimit.characterCount}/{charLimit.maxLength}
    </InputGroupText>
  </InputGroupAddon>
</InputGroup>
