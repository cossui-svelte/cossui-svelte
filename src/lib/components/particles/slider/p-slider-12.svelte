<script lang="ts">
  import { NumberField, NumberFieldGroup, NumberFieldInput } from "$lib/components/ui/number-field";
  import { Slider } from "$lib/components/ui/slider";

  const min = 0;
  const max = 150;

  let value = $state(25);
</script>

<div class="flex items-center gap-4">
  <Slider
    aria-label="Slider with input"
    class="flex-1"
    {max}
    {min}
    bind:value
  />
  <NumberField
    aria-label="Enter slider value"
    class="w-12"
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
