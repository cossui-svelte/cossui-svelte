<script lang="ts">
  import Search from "@lucide/svelte/icons/search";
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
  } from "$lib/components/ui/input-group";
</script>

<InputGroup>
  <InputGroupInput aria-label="Search" placeholder="Search" type="search" />
  <InputGroupAddon>
    <Search aria-hidden="true" />
  </InputGroupAddon>
</InputGroup>
