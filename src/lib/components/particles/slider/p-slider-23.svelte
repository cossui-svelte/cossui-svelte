<script lang="ts">
  import { z } from "zod";
  import { Button } from "$lib/components/ui/button";
  import { Field, FieldDescription } from "$lib/components/ui/field";
  import { Fieldset, FieldsetLegend } from "$lib/components/ui/fieldset";
  import { Form } from "$lib/components/ui/form";
  import { Slider } from "$lib/components/ui/slider";
  import { createForm } from "$lib/hooks/use-superform";

  const schema = z.object({
    volume: z.array(z.number()),
  });

  const superform = createForm({
    initialData: { volume: [25, 75] },
    onUpdated: ({ volume }) => alert(`Volume: ${volume.join(", ")}`),
    schema,
  });

  const { form, submitting } = superform;

  const displayValue = $derived(
    Array.isArray($form.volume) ? $form.volume.join(" – ") : $form.volume,
  );
</script>

<Form class="flex w-full flex-col gap-4" {superform}>
  <Fieldset class="flex w-full flex-col items-stretch gap-3">
    <Field>
      <div class="mb-2 flex items-center justify-between gap-1">
        <FieldsetLegend>Volume</FieldsetLegend>
        <span class="tabular-nums text-sm">{displayValue}</span>
      </div>
      <Slider name="volume" bind:value={$form.volume} />
      <FieldDescription>Choose a value between 0 and 100</FieldDescription>
    </Field>
  </Fieldset>
  <Button loading={$submitting} type="submit">Submit</Button>
</Form>
