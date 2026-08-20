<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { FieldDescription, FieldItem, FieldLabel } from '$lib/components/ui/field';
  import { Fieldset, FieldsetLegend } from '$lib/components/ui/fieldset';
  import { Form } from '$lib/components/ui/form';
  import { Radio, RadioGroup } from '$lib/components/ui/radio-group';

  let loading = $state(false);

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    loading = true;
    await new Promise((r) => setTimeout(r, 800));
    loading = false;
    alert(`Selected plan: ${formData.get('plan') ?? ''}`);
  }
</script>

<Form class="flex w-full flex-col gap-4" onsubmit={handleSubmit}>
  <Fieldset class="gap-2">
    <FieldsetLegend class="font-medium text-sm">Choose Plan</FieldsetLegend>
    <RadioGroup name="plan" value="free">
      <FieldItem>
        <FieldLabel><Radio value="free" /> Free</FieldLabel>
      </FieldItem>
      <FieldItem>
        <FieldLabel><Radio value="pro" /> Pro</FieldLabel>
      </FieldItem>
      <FieldItem>
        <FieldLabel><Radio value="enterprise" /> Enterprise</FieldLabel>
      </FieldItem>
    </RadioGroup>
    <FieldDescription>Select the plan that fits your needs.</FieldDescription>
  </Fieldset>
  <Button {loading} type="submit">Submit</Button>
</Form>
