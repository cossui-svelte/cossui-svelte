<script lang="ts">
  import Search from "@lucide/svelte/icons/search";
  import {
    Combobox,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
    ComboboxPopup,
    ComboboxTrigger,
    ComboboxValue,
  } from "$lib/components/ui/combobox";
  import { selectTriggerVariants } from "$lib/components/ui/select";

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

  let value = $state<string | undefined>(undefined);
  const selectedLabel = $derived(items.find((i) => i.value === value)?.label);
</script>

<Combobox bind:value {items}>
  <ComboboxTrigger class={selectTriggerVariants()}>
    <ComboboxValue value={selectedLabel} placeholder="Select a fruit" />
  </ComboboxTrigger>
  <ComboboxPopup aria-label="Select a fruit">
    <div class="border-b p-2">
      <ComboboxInput
        class="rounded-md before:rounded-[calc(var(--radius-md)-1px)]"
        placeholder="Search fruits..."
        showTrigger={false}
      >
        {#snippet startAddon()}<Search />{/snippet}
      </ComboboxInput>
    </div>
    <ComboboxEmpty>No items found.</ComboboxEmpty>
    <ComboboxList>
      {#each items as item (item.value)}
        <ComboboxItem value={item.value} label={item.label}>{item.label}</ComboboxItem>
      {/each}
    </ComboboxList>
  </ComboboxPopup>
</Combobox>
