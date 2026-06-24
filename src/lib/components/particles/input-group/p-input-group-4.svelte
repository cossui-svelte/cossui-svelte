<script lang="ts">
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
  } from "$lib/components/ui/input-group";
</script>

<InputGroup>
  <InputGroupInput
    aria-label="Choose a username"
    placeholder="Choose a username"
    type="text"
  />
  <InputGroupAddon align="inline-end">
    <InputGroupText>@coss.com</InputGroupText>
  </InputGroupAddon>
</InputGroup>
