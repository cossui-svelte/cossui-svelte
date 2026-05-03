<script lang="ts">
  import ComponentPreviewTabs from "$lib/components/app/component-preview-tabs.svelte";
  import {
    NumberField,
    NumberFieldGroup,
    NumberFieldInput,
    NumberFieldIncrement,
    NumberFieldDecrement,
    NumberFieldScrubArea,
  } from "$lib/components/ui/number-field";

  let value = $state(0);
</script>

<ComponentPreviewTabs>
  <div class="flex flex-col gap-6 p-4">
    <NumberField bind:value min={0} max={100} step={1}>
      <NumberFieldScrubArea label="Quantity" />
      <NumberFieldGroup>
        <NumberFieldDecrement />
        <NumberFieldInput />
        <NumberFieldIncrement />
      </NumberFieldGroup>
    </NumberField>

    <NumberField value={42} size="sm" min={0} max={200} step={5}>
      <NumberFieldGroup>
        <NumberFieldDecrement />
        <NumberFieldInput />
        <NumberFieldIncrement />
      </NumberFieldGroup>
    </NumberField>

    <NumberField value={10} size="lg" disabled>
      <NumberFieldGroup>
        <NumberFieldDecrement />
        <NumberFieldInput />
        <NumberFieldIncrement />
      </NumberFieldGroup>
    </NumberField>
  </div>
</ComponentPreviewTabs>
