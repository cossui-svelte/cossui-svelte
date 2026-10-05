<script lang="ts">
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput
  } from '#lib/components/ui/input-group/index.js';
  import { Kbd } from '#lib/components/ui/kbd/index.js';
</script>

<InputGroup>
  <InputGroupInput placeholder="Search…" type="search" />
  <InputGroupAddon align="inline-end">
    <Kbd>⌘K</Kbd>
  </InputGroupAddon>
</InputGroup>
