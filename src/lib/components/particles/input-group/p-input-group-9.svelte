<script lang="ts">
  import { Button } from '#lib/components/ui/button/index.js';
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput
  } from '#lib/components/ui/input-group/index.js';
</script>

<InputGroup>
  <InputGroupInput placeholder="Type to search…" type="search" />
  <InputGroupAddon align="inline-end">
    <Button size="xs" variant="secondary">Search</Button>
  </InputGroupAddon>
</InputGroup>
