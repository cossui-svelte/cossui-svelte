<script lang="ts">
  import Mail from "@lucide/svelte/icons/mail";
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
  } from "$lib/components/ui/input-group";
</script>

<InputGroup>
  <InputGroupInput aria-label="Email" placeholder="Email" type="email" />
  <InputGroupAddon align="inline-end">
    <Mail aria-hidden="true" />
  </InputGroupAddon>
</InputGroup>
