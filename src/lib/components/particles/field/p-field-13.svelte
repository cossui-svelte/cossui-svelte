<script lang="ts">
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { CheckboxGroup } from '$lib/components/ui/checkbox-group';
  import { Field, FieldItem, FieldLabel } from '$lib/components/ui/field';
  import { Fieldset, FieldsetLegend } from '$lib/components/ui/fieldset';
</script>

<Fieldset class="gap-2" name="frameworks">
  <FieldsetLegend class="font-medium text-sm">Frameworks</FieldsetLegend>
  <CheckboxGroup value={['react']}>
    <FieldItem>
      <FieldLabel><Checkbox value="react" /> React</FieldLabel>
    </FieldItem>
    <FieldItem>
      <FieldLabel><Checkbox value="vue" /> Vue</FieldLabel>
    </FieldItem>
    <FieldItem>
      <FieldLabel><Checkbox value="svelte" /> Svelte</FieldLabel>
    </FieldItem>
  </CheckboxGroup>
</Fieldset>
