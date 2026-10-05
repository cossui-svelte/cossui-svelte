<script lang="ts">
  import {
    Field,
    FieldDescription,
    FieldItem,
    FieldLabel
  } from '#lib/components/ui/field/index.js';
  import { Fieldset, FieldsetLegend } from '#lib/components/ui/fieldset/index.js';
  import { Form } from '#lib/components/ui/form/index.js';
  import { Radio, RadioGroup } from '#lib/components/ui/radio-group/index.js';
</script>

<Field name="plan" class="gap-2">
  <Fieldset>
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
</Field>
