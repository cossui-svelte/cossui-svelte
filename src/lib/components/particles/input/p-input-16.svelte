<script lang="ts">
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput
  } from '#lib/components/ui/input-group/index.js';
  import { Spinner } from '#lib/components/ui/spinner/index.js';
</script>

<InputGroup>
  <InputGroupInput disabled placeholder="Processing…" type="search" />
  <InputGroupAddon align="inline-end">
    <Spinner />
  </InputGroupAddon>
</InputGroup>
