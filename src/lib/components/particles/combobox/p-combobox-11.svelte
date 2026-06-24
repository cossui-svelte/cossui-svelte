<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import {
    Combobox,
    ComboboxEmpty,
    ComboboxInput,
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

  async function onsubmit(e: SubmitEvent) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const selectedItem = formData.get("item");
    const itemValue =
      items.find((item) => item.label === selectedItem)?.value || selectedItem;
    loading = true;
    await new Promise((r) => setTimeout(r, 800));
    loading = false;
    alert(`Favorite item: ${itemValue || ""}`);
  }
</script>

<Form class="flex w-full max-w-64 flex-col gap-4" {onsubmit}>
  <Field name="item">
    <FieldLabel>Favorite item</FieldLabel>
    <Combobox {items} required>
      <ComboboxInput placeholder="Select an item..." />
      <ComboboxPopup>
        <ComboboxEmpty>No results found.</ComboboxEmpty>
        <ComboboxList>
          {#each items as item (item.value)}
            <ComboboxItem value={item.value} label={item.label}>{item.label}</ComboboxItem>
          {/each}
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>
    <FieldError>Please select a item.</FieldError>
  </Field>
  <Button {loading} type="submit">Submit</Button>
</Form>
