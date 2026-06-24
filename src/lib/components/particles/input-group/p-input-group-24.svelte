<script lang="ts">
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
  } from "$lib/components/ui/input-group";

  const maxLength = 14;
  let value = $state("");
</script>

<InputGroup>
  <InputGroupInput
    aria-label="Username"
    maxlength={maxLength}
    oninput={(e) => { value = (e.currentTarget as HTMLInputElement).value; }}
    placeholder="Enter username"
    type="text"
    {value}
  />
  <InputGroupAddon align="inline-end">
    <InputGroupText
      aria-live="polite"
      class="text-xs tabular-nums"
      role="status"
    >
      {value.length}/{maxLength}
    </InputGroupText>
  </InputGroupAddon>
</InputGroup>
