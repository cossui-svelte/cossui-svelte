<script lang="ts">
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
  } from "$lib/components/ui/input-group";
  import { Kbd } from "$lib/components/ui/kbd";
</script>

<InputGroup>
  <InputGroupInput aria-label="Search" placeholder="Search…" type="search" />
  <InputGroupAddon align="inline-end">
    <Kbd>/</Kbd>
  </InputGroupAddon>
</InputGroup>
