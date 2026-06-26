<script lang="ts">
  import {
    Autocomplete,
    AutocompleteEmpty,
    AutocompleteInput,
    AutocompleteItem,
    AutocompleteList,
    AutocompletePopup,
  } from '$lib/components/ui/autocomplete';
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
  <Autocomplete {items}>
    <AutocompleteInput aria-label="Search items" placeholder="Search items…" />
    <AutocompletePopup>
      <AutocompleteEmpty>No items found.</AutocompleteEmpty>
      <AutocompleteList>
        {#each items as item (item.value)}
          <AutocompleteItem label={item.label} value={item.value}>{item.label}</AutocompleteItem>
        {/each}
      </AutocompleteList>
    </AutocompletePopup>
  </Autocomplete>
  <FieldDescription>Select a item.</FieldDescription>
</Field>
