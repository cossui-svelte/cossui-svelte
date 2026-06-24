<script lang="ts">
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
  } from "$lib/components/ui/input-group";
  import {
    NumberField,
    NumberFieldInput,
  } from "$lib/components/ui/number-field";
</script>

<InputGroup>
  <NumberField aria-label="Enter the amount" value={10}>
    <NumberFieldInput class="text-left" />
  </NumberField>
  <InputGroupAddon>
    <InputGroupText>€</InputGroupText>
  </InputGroupAddon>
  <InputGroupAddon align="inline-end">
    <InputGroupText>EUR</InputGroupText>
  </InputGroupAddon>
</InputGroup>
