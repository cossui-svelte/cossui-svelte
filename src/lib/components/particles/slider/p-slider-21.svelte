<script lang="ts">
  import RotateCcwIcon from "@lucide/svelte/icons/rotate-ccw";
  import { Button } from "$lib/components/ui/button";
  import { Label } from "$lib/components/ui/label";
  import { NumberField, NumberFieldGroup, NumberFieldInput } from "$lib/components/ui/number-field";
  import { Slider } from "$lib/components/ui/slider";

  const min = -10;
  const max = 10;
  const defaultValues = { x: 0, y: 0, z: 0 };
  const initialValues = { x: -2, y: 4, z: 2 };

  let values = $state({ ...initialValues });
</script>

<fieldset class="flex w-full flex-col gap-4 border-0 p-0 m-0">
  <legend class="text-sm font-medium">Object position</legend>
  <div class="flex flex-col gap-2">
    {#each (["x", "y", "z"] as const) as axis (axis)}
      <div class="flex items-center gap-2">
        <Label class="w-3 text-muted-foreground text-xs">{axis.toUpperCase()}</Label>
        <Slider
          aria-label={`${axis.toUpperCase()} position`}
          class="flex-1"
          {max}
          {min}
          bind:value={values[axis]}
        />
        <NumberField
          aria-label={`Enter ${axis.toUpperCase()} value`}
          class="w-16"
          {max}
          {min}
          bind:value={values[axis]}
          size="sm"
        >
          <NumberFieldGroup>
            <NumberFieldInput />
          </NumberFieldGroup>
        </NumberField>
      </div>
    {/each}
  </div>
  <Button class="w-full" onclick={() => { values = { ...defaultValues }; }} variant="outline">
    <RotateCcwIcon aria-hidden="true" class="-ms-1 opacity-60" />
    Reset
  </Button>
</fieldset>
