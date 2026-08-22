<script lang="ts">
  import Search from '@lucide/svelte/icons/search';
  import {
    Combobox,
    ComboboxCollection,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
    ComboboxPopup
  } from '$lib/components/ui/combobox';

  const items = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Orange', value: 'orange' },
    { label: 'Grape', value: 'grape' },
    { label: 'Strawberry', value: 'strawberry' },
    { label: 'Mango', value: 'mango' },
    { label: 'Pineapple', value: 'pineapple' },
    { label: 'Kiwi', value: 'kiwi' },
    { label: 'Peach', value: 'peach' },
    { label: 'Pear', value: 'pear' }
  ];
</script>

<Combobox {items}>
  <ComboboxInput aria-label="Search items" placeholder="Search items…">
    {#snippet startAddon()}
      <Search />
    {/snippet}
  </ComboboxInput>
  <ComboboxPopup>
    <ComboboxEmpty>No items found.</ComboboxEmpty>
    <ComboboxList>
      <ComboboxCollection>
        {#snippet children(item: { label: string; value: string })}
          <ComboboxItem value={item.value} label={item.label}>{item.label}</ComboboxItem>
        {/snippet}
      </ComboboxCollection>
    </ComboboxList>
  </ComboboxPopup>
</Combobox>
