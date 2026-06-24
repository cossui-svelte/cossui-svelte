<script lang="ts">
  import { NumberField, NumberFieldGroup, NumberFieldInput } from "$lib/components/ui/number-field";
  import { Slider } from "$lib/components/ui/slider";

  const min = 0;
  const max = 100;

  let value = $state(25);
</script>

<div class="flex flex-col items-center justify-center gap-4">
  <Slider
    aria-label="Vertical slider with input"
    {max}
    {min}
    orientation="vertical"
    bind:value
  />
  <NumberField
    aria-label="Enter slider value"
    class="w-16"
    {max}
    {min}
    {value}
    onValueChange={(v) => { value = v ?? min; }}
    size="sm"
  >
    <NumberFieldGroup>
      <NumberFieldInput />
    </NumberFieldGroup>
  </NumberField>
</div>
