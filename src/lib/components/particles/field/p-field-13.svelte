<script lang="ts">
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { CheckboxGroup } from '$lib/components/ui/checkbox-group';
  import { FieldItem, FieldLabel } from '$lib/components/ui/field';
  import { Fieldset, FieldsetLegend } from '$lib/components/ui/fieldset';
    import { Form } from '$lib/components/ui/form';
</script>

<Form>
<Fieldset class="gap-2">
  <FieldsetLegend class="font-medium text-sm">Frameworks</FieldsetLegend>
  <CheckboxGroup value={['svelte']}>
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
</Form>