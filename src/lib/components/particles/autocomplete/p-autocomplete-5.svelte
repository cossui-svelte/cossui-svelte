<script lang="ts">
  import {
    Autocomplete,
    AutocompleteEmpty,
    AutocompleteInput,
    AutocompleteItem,
    AutocompleteList,
    AutocompletePopup,
  } from '$lib/components/ui/autocomplete';
  import { Label } from '$lib/components/ui/label';

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

<Autocomplete {items}>
  <div class="flex flex-col items-start gap-2">
    <Label for="fruit-input">Fruits</Label>
    <AutocompleteInput aria-label="Search items" id="fruit-input" placeholder="Search items…" />
  </div>
  <AutocompletePopup>
    <AutocompleteEmpty>No items found.</AutocompleteEmpty>
    <AutocompleteList>
      {#each items as item (item.value)}
        <AutocompleteItem label={item.label} value={item.value}>{item.label}</AutocompleteItem>
      {/each}
    </AutocompleteList>
  </AutocompletePopup>
</Autocomplete>
