<script lang="ts">
  import { Badge } from '#lib/components/ui/badge/index.js';
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput
  } from '#lib/components/ui/input-group/index.js';
</script>

<InputGroup>
  <InputGroupInput placeholder="Type to search…" type="search" />
  <InputGroupAddon align="inline-end">
    <Badge variant="info">Badge</Badge>
  </InputGroupAddon>
</InputGroup>
