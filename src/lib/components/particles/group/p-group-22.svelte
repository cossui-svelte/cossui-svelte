<script lang="ts">
  import { Group, GroupSeparator } from '#lib/components/ui/group/index.js';
  import { Label } from '#lib/components/ui/label/index.js';
  import {
    NumberField,
    NumberFieldGroup,
    NumberFieldInput
  } from '#lib/components/ui/number-field/index.js';
</script>

<div class="flex flex-col gap-2">
  <Label>Range</Label>
  <Group aria-label="Range input">
    <NumberField aria-label="Min value">
      <NumberFieldGroup>
        <NumberFieldInput class="text-left" placeholder="From" />
      </NumberFieldGroup>
    </NumberField>
    <GroupSeparator />
    <NumberField aria-label="Max value">
      <NumberFieldGroup>
        <NumberFieldInput class="text-left" placeholder="To" />
      </NumberFieldGroup>
    </NumberField>
  </Group>
</div>
