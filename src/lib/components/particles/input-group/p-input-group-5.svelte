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
    aria-label="Enter your domain"
    class="*:[input]:px-0!"
    placeholder="coss"
    type="text"
  />
  <InputGroupAddon>
    <InputGroupText>https://</InputGroupText>
  </InputGroupAddon>
  <InputGroupAddon align="inline-end">
    <InputGroupText>.com</InputGroupText>
  </InputGroupAddon>
</InputGroup>
