<script lang="ts">
  import { Collapsible, CollapsiblePanel } from '#lib/components/ui/collapsible/index.js';
  import { Field, FieldLabel } from '#lib/components/ui/field/index.js';
  import { Input } from '#lib/components/ui/input/index.js';
  import { Switch } from '#lib/components/ui/switch/index.js';

  let enabled = $state(false);
</script>

<Collapsible bind:open={enabled}>
  <Field>
    <FieldLabel>
      <Switch bind:checked={enabled} />
      Enable custom brand colors
    </FieldLabel>
  </Field>
  <CollapsiblePanel>
    <div class="mt-4 flex flex-col items-start gap-4">
      <Field>
        <FieldLabel>Brand color (light theme)</FieldLabel>
        <Input placeholder="#000000" type="text" />
      </Field>
      <Field>
        <FieldLabel>Brand color (dark theme)</FieldLabel>
        <Input placeholder="#000000" type="text" />
      </Field>
    </div>
  </CollapsiblePanel>
</Collapsible>
