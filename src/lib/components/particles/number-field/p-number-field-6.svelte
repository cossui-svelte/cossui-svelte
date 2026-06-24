<script lang="ts">
  import {
    NumberField,
    NumberFieldDecrement,
    NumberFieldGroup,
    NumberFieldIncrement,
    NumberFieldInput,
    NumberFieldScrubArea,
  } from "$lib/components/ui/number-field";
</script>

<NumberField value={0}>
  <NumberFieldScrubArea label="Quantity" />
  <NumberFieldGroup>
    <NumberFieldDecrement />
    <NumberFieldInput />
    <NumberFieldIncrement />
  </NumberFieldGroup>
</NumberField>
