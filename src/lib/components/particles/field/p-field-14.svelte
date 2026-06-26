<script lang="ts">
  import { Field, FieldDescription, FieldItem, FieldLabel } from '$lib/components/ui/field';
  import { Fieldset, FieldsetLegend } from '$lib/components/ui/fieldset';
  import { Radio, RadioGroup } from '$lib/components/ui/radio-group';
</script>

<Fieldset class="gap-2" name="plan">
  <FieldsetLegend class="font-medium text-sm">Choose Plan</FieldsetLegend>
  <RadioGroup value="free">
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
