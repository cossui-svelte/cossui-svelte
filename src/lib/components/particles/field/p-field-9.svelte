<script lang="ts">
  import {
    Combobox,
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput,
    ComboboxEmpty,
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

  let value = $state([items[0], items[4]]);
</script>

<Field name="fruits">
  <FieldLabel>Fruits</FieldLabel>
  <Combobox bind:value {items} type="multiple">
    <ComboboxChips>
      {#each value as item (item.value)}
        <ComboboxChip aria-label={item.label}>{item.label}</ComboboxChip>
      {/each}
      <ComboboxChipsInput
        aria-label="Select items"
        placeholder={value.length > 0 ? undefined : 'Select items…'}
      />
    </ComboboxChips>
    <ComboboxPopup>
      <ComboboxEmpty>No items found.</ComboboxEmpty>
      <ComboboxList>
        {#each items as item (item.value)}
          <ComboboxItem label={item.label} value={item.value}>{item.label}</ComboboxItem>
        {/each}
      </ComboboxList>
    </ComboboxPopup>
  </Combobox>
  <FieldDescription>Select multiple items.</FieldDescription>
</Field>
