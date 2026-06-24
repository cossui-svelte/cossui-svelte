<script lang="ts">
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
  } from "$lib/components/ui/input-group";
  import { Kbd } from "$lib/components/ui/kbd";
</script>

<InputGroup>
  <InputGroupInput placeholder="Search…" type="search" />
  <InputGroupAddon align="inline-end">
    <Kbd>⌘K</Kbd>
  </InputGroupAddon>
</InputGroup>
