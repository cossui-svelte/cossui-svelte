<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Field, FieldDescription } from '$lib/components/ui/field';
  import { Fieldset, FieldsetLegend } from '$lib/components/ui/fieldset';
  import { Form } from '$lib/components/ui/form';
  import { Slider } from '$lib/components/ui/slider';

  let value = $state([25, 75]);
  let loading = $state(false);

  const displayValue = $derived(Array.isArray(value) ? value.join(' – ') : value);

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    loading = true;
    await new Promise((r) => setTimeout(r, 800));
    loading = false;
    alert(`Volume: ${value.join(', ')}`);
  }
</script>

<Form class="flex w-full flex-col gap-4" onsubmit={handleSubmit}>
  <Fieldset class="flex w-full flex-col items-stretch gap-3">
    <Field>
      <div class="mb-2 flex items-center justify-between gap-1">
        <FieldsetLegend>Volume</FieldsetLegend>
        <span class="tabular-nums text-sm">{displayValue}</span>
      </div>
      <Slider name="volume" bind:value />
      <FieldDescription>Choose a value between 0 and 100</FieldDescription>
    </Field>
  </Fieldset>
  <Button {loading} type="submit">Submit</Button>
</Form>
