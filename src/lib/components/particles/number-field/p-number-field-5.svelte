<script lang="ts">
  import { Label } from '#lib/components/ui/label/index.js';
  import {
    NumberField,
    NumberFieldDecrement,
    NumberFieldGroup,
    NumberFieldIncrement,
    NumberFieldInput
  } from '#lib/components/ui/number-field/index.js';
</script>

<div class="flex flex-col items-start gap-2">
  <Label for="quantity-5">Quantity</Label>
  <NumberField value={0} id="quantity-5">
    <NumberFieldGroup>
      <NumberFieldDecrement />
      <NumberFieldInput />
      <NumberFieldIncrement />
    </NumberFieldGroup>
  </NumberField>
</div>
