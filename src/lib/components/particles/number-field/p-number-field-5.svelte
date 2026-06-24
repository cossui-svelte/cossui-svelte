<script lang="ts">
  import { Label } from "$lib/components/ui/label";
  import {
    NumberField,
    NumberFieldDecrement,
    NumberFieldGroup,
    NumberFieldIncrement,
    NumberFieldInput,
  } from "$lib/components/ui/number-field";
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
