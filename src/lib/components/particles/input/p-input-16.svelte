<script lang="ts">
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
  } from "$lib/components/ui/input-group";
  import { Spinner } from "$lib/components/ui/spinner";
</script>

<InputGroup>
  <InputGroupInput disabled placeholder="Processing…" type="search" />
  <InputGroupAddon align="inline-end">
    <Spinner />
  </InputGroupAddon>
</InputGroup>
