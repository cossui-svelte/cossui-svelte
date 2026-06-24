<script lang="ts">
  import Search from "@lucide/svelte/icons/search";
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
  } from "$lib/components/ui/input-group";
</script>

<InputGroup>
  <InputGroupAddon>
    <Search aria-hidden="true" />
  </InputGroupAddon>
  <InputGroupInput aria-label="Search" placeholder="Search" type="search" />
</InputGroup>
