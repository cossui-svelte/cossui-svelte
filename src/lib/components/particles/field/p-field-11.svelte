<script lang="ts">
  import { Field, FieldDescription, FieldLabel } from '$lib/components/ui/field';
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '$lib/components/ui/select';
</script>

<Field name="country">
  <FieldLabel>Country</FieldLabel>
  <Select>
    <SelectTrigger>
      <SelectValue placeholder="Select a country" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="us">United States</SelectItem>
      <SelectItem value="uk">United Kingdom</SelectItem>
      <SelectItem value="ca">Canada</SelectItem>
      <SelectItem value="au">Australia</SelectItem>
    </SelectContent>
  </Select>
  <FieldDescription>This is an optional field</FieldDescription>
</Field>
