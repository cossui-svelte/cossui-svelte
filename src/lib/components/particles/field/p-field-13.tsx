"use client";

import { Checkbox } from "@/registry/default/ui/checkbox";
import { CheckboxGroup } from "@/registry/default/ui/checkbox-group";
import { Field, FieldItem, FieldLabel } from "@/registry/default/ui/field";
import { Fieldset, FieldsetLegend } from "@/registry/default/ui/fieldset";

export default function Particle() {
  return (
    <Field
      className="gap-2"
      name="frameworks"
      render={(props) => <Fieldset {...props} />}
    >
      <FieldsetLegend className="font-medium text-sm">
        Frameworks
      </FieldsetLegend>
      <CheckboxGroup defaultValue={["react"]}>
        <FieldItem>
          <FieldLabel>
            <Checkbox value="react" /> React
          </FieldLabel>
        </FieldItem>
        <FieldItem>
          <FieldLabel>
            <Checkbox value="vue" /> Vue
          </FieldLabel>
        </FieldItem>
        <FieldItem>
          <FieldLabel>
            <Checkbox value="svelte" /> Svelte
          </FieldLabel>
        </FieldItem>
      </CheckboxGroup>
    </Field>
  );
}
