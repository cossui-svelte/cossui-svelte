"use client";

import {
  Field,
  FieldDescription,
  FieldItem,
  FieldLabel,
} from "@/registry/default/ui/field";
import { Fieldset, FieldsetLegend } from "@/registry/default/ui/fieldset";
import { Radio, RadioGroup } from "@/registry/default/ui/radio-group";

export default function Particle() {
  return (
    <Field
      className="gap-2"
      name="plan"
      render={(props) => <Fieldset {...props} />}
    >
      <FieldsetLegend className="font-medium text-sm">
        Choose Plan
      </FieldsetLegend>
      <RadioGroup defaultValue="free">
        <FieldItem>
          <FieldLabel>
            <Radio value="free" /> Free
          </FieldLabel>
        </FieldItem>
        <FieldItem>
          <FieldLabel>
            <Radio value="pro" /> Pro
          </FieldLabel>
        </FieldItem>
        <FieldItem>
          <FieldLabel>
            <Radio value="enterprise" /> Enterprise
          </FieldLabel>
        </FieldItem>
      </RadioGroup>
      <FieldDescription>Select the plan that fits your needs.</FieldDescription>
    </Field>
  );
}
