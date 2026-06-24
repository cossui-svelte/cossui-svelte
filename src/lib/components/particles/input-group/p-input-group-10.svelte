<script lang="ts">
  import { Badge } from "$lib/components/ui/badge";
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
  } from "$lib/components/ui/input-group";
</script>

<InputGroup>
  <InputGroupInput placeholder="Type to search…" type="search" />
  <InputGroupAddon align="inline-end">
    <Badge variant="info">Badge</Badge>
  </InputGroupAddon>
</InputGroup>
