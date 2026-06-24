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

<div class="flex flex-col gap-6">
  <NumberField value={0} step={10}>
    <NumberFieldScrubArea label="Step 10" />
    <NumberFieldGroup>
      <NumberFieldDecrement />
      <NumberFieldInput />
      <NumberFieldIncrement />
    </NumberFieldGroup>
  </NumberField>
  <NumberField value={0} step={0.1}>
    <NumberFieldScrubArea label="Step 0.1" />
    <NumberFieldGroup>
      <NumberFieldDecrement />
      <NumberFieldInput />
      <NumberFieldIncrement />
    </NumberFieldGroup>
  </NumberField>
</div>
