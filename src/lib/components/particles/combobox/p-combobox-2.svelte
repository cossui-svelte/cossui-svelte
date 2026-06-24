<script lang="ts">
  import {
    Combobox,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
    ComboboxPopup,
  } from "$lib/components/ui/combobox";

  const items = [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Orange", value: "orange" },
    { label: "Grape", value: "grape" },
    { label: "Strawberry", value: "strawberry" },
    { label: "Mango", value: "mango" },
    { label: "Pineapple", value: "pineapple" },
    { label: "Kiwi", value: "kiwi" },
    { label: "Peach", value: "peach" },
    { label: "Pear", value: "pear" },
  ];
</script>

<Combobox defaultValue={items[2]} disabled {items}>
  <ComboboxInput aria-label="Select an item" placeholder="Select an item…" />
  <ComboboxPopup>
    <ComboboxEmpty>No items found.</ComboboxEmpty>
    <ComboboxList>
      {#each items as item (item.value)}
        <ComboboxItem value={item.value} label={item.label}>{item.label}</ComboboxItem>
      {/each}
    </ComboboxList>
  </ComboboxPopup>
</Combobox>
