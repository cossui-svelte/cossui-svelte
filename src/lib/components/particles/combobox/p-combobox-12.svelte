<script lang="ts">
  import { Button } from "$lib/components/ui/button";
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
  import { Field, FieldError, FieldLabel } from "$lib/components/ui/field";
  import { Form } from "$lib/components/ui/form";

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

  let loading = $state(false);
  let value = $state<string[]>([]);

  function removeItem(v: string) {
    value = value.filter((x) => x !== v);
  }

  function getLabel(v: string) {
    return items.find((i) => i.value === v)?.label ?? v;
  }

  async function onsubmit(e: SubmitEvent) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const selectedItems = formData.getAll("items");
    const itemValues = selectedItems.map(
      (selectedItem) =>
        items.find((item) => item.label === selectedItem)?.value || selectedItem,
    );
    loading = true;
    await new Promise((r) => setTimeout(r, 800));
    loading = false;
    alert(`Favorite items: ${itemValues.join(", ") || ""}`);
  }
</script>

<Form class="flex w-full max-w-64 flex-col gap-4" {onsubmit}>
  <Field name="items">
    <FieldLabel>Favorite items</FieldLabel>
    <Combobox type="multiple" bind:value {items} required>
      <ComboboxChips>
        {#each value as v (v)}
          <ComboboxChip aria-label={getLabel(v)} removeProps={{ onclick: () => removeItem(v) }}>
            {getLabel(v)}
          </ComboboxChip>
        {/each}
        <ComboboxChipsInput
          placeholder={value.length > 0 ? undefined : "Select items…"}
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
    <FieldError>Please select at least one item.</FieldError>
  </Field>
  <Button {loading} type="submit">Submit</Button>
</Form>
