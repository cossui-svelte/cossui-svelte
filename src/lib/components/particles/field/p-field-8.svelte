<script lang="ts">
  import {
    Combobox,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
    ComboboxPopup,
  } from '$lib/components/ui/combobox';
  import { Field, FieldDescription, FieldLabel } from '$lib/components/ui/field';

  const items = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Grape', value: 'grape' },
    { label: 'Kiwi', value: 'kiwi' },
    { label: 'Mango', value: 'mango' },
    { label: 'Orange', value: 'orange' },
    { label: 'Peach', value: 'peach' },
    { label: 'Pear', value: 'pear' },
    { label: 'Pineapple', value: 'pineapple' },
    { label: 'Strawberry', value: 'strawberry' },
  ];
</script>

<Field name="fruit">
  <FieldLabel>Fruits</FieldLabel>
  <Combobox {items}>
    <ComboboxInput aria-label="Select an item" placeholder="Select an item..." />
    <ComboboxPopup>
      <ComboboxEmpty>No results found.</ComboboxEmpty>
      <ComboboxList>
        {#each items as item (item.value)}
          <ComboboxItem label={item.label} value={item.value}>{item.label}</ComboboxItem>
        {/each}
      </ComboboxList>
    </ComboboxPopup>
  </Combobox>
  <FieldDescription>Select a item.</FieldDescription>
</Field>
