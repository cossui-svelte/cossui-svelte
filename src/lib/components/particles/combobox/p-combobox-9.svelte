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

  let value = $state<string[]>([items[0].value, items[4].value]);

  function removeItem(v: string) {
    value = value.filter((x) => x !== v);
  }

  function getLabel(v: string) {
    return items.find((i) => i.value === v)?.label ?? v;
  }
</script>

<Combobox type="multiple" bind:value {items}>
  <ComboboxChips>
    {#each value as v (v)}
      <ComboboxChip aria-label={getLabel(v)} removeProps={{ onclick: () => removeItem(v) }}>
        {getLabel(v)}
      </ComboboxChip>
    {/each}
    <ComboboxChipsInput
      aria-label="Select a item"
      placeholder={value.length > 0 ? undefined : "Select a item..."}
    />
  </ComboboxChips>
  <ComboboxPopup>
    <ComboboxEmpty>No items found.</ComboboxEmpty>
    <ComboboxList>
      {#each items as item (item.value)}
        <ComboboxItem value={item.value} label={item.label}>{item.label}</ComboboxItem>
      {/each}
    </ComboboxList>
  </ComboboxPopup>
</Combobox>
