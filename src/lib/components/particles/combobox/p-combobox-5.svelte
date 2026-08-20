<script lang="ts">
  import {
    Combobox,
    ComboboxCollection,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
    ComboboxPopup
  } from '$lib/components/ui/combobox';
  import { Label } from '$lib/components/ui/label';

  const id = $props.id();

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
  <div class="flex flex-col items-start gap-2">
    <Label for={id}>Fruits</Label>
    <ComboboxInput aria-label="Select an item" {id} placeholder="Select an item..." />
  </div>
  <ComboboxPopup>
    <ComboboxEmpty>No results found.</ComboboxEmpty>
    <ComboboxList>
      <ComboboxCollection>
        {#snippet children(item: { label: string; value: string })}
          <ComboboxItem value={item.value} label={item.label}>{item.label}</ComboboxItem>
        {/snippet}
      </ComboboxCollection>
    </ComboboxList>
  </ComboboxPopup>
</Combobox>
