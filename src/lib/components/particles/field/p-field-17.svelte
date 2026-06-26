<script lang="ts">
  import { Field, FieldDescription } from '$lib/components/ui/field';
  import {
    NumberField,
    NumberFieldDecrement,
    NumberFieldGroup,
    NumberFieldIncrement,
    NumberFieldInput,
    NumberFieldScrubArea,
  } from '$lib/components/ui/number-field';
</script>

<Field name="quantity">
  <NumberField max={100} min={1} value={1}>
    <NumberFieldScrubArea label="Quantity" />
    <NumberFieldGroup>
      <NumberFieldDecrement />
      <NumberFieldInput />
      <NumberFieldIncrement />
    </NumberFieldGroup>
  </NumberField>
  <FieldDescription>Choose a value between 1 and 100.</FieldDescription>
</Field>
