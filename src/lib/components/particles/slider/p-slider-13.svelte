<script lang="ts">
  import { NumberField, NumberFieldGroup, NumberFieldInput } from "$lib/components/ui/number-field";
  import { Slider } from "$lib/components/ui/slider";

  const min = 0;
  const max = 50;

  let values = $state([0, 20]);

  function updateValue(index: number, newValue: number | null) {
    const v = newValue ?? min;
    if (index === 0) {
      values[0] = Math.min(v, values[1] ?? max);
    } else {
      values[1] = Math.max(v, values[0] ?? min);
    }
  }
</script>

<div class="flex items-center gap-2">
  <NumberField
    aria-label="Minimum value"
    class="w-10"
    max={values[1]}
    {min}
    onValueChange={(v) => updateValue(0, v)}
    value={values[0]}
    size="sm"
  >
    <NumberFieldGroup>
      <NumberFieldInput />
    </NumberFieldGroup>
  </NumberField>
  <Slider
    aria-label="Dual range slider"
    class="flex-1 *:min-w-0!"
    {max}
    {min}
    bind:value={values}
  />
  <NumberField
    aria-label="Maximum value"
    class="w-10"
    {max}
    min={values[0]}
    onValueChange={(v) => updateValue(1, v)}
    value={values[1]}
    size="sm"
  >
    <NumberFieldGroup>
      <NumberFieldInput />
    </NumberFieldGroup>
  </NumberField>
</div>
