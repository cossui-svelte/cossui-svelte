<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import {
    Combobox,
    ComboboxCollection,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
    ComboboxPopup
  } from '$lib/components/ui/combobox';
  import { Field, FieldDescription, FieldError, FieldLabel } from '$lib/components/ui/field';
  import { Form } from '$lib/components/ui/form';

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
    { label: 'Strawberry', value: 'strawberry' }
  ];

  let loading = $state(false);

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    loading = true;
    await new Promise((r) => setTimeout(r, 800));
    loading = false;
    alert(`Fruit: ${formData.get('fruit') ?? ''}`);
  }
</script>

<Form class="flex w-full flex-col gap-4" onsubmit={handleSubmit}>
  <Field name="fruit">
    <FieldLabel>Fruits</FieldLabel>
    <Combobox {items}>
      <ComboboxInput aria-label="Select an item" placeholder="Select an item..." />
      <ComboboxPopup>
        <ComboboxEmpty>No results found.</ComboboxEmpty>
        <ComboboxList>
          <ComboboxCollection>
            {#snippet children(item: { label: string; value: string })}
              <ComboboxItem label={item.label} value={item.value}>{item.label}</ComboboxItem>
            {/snippet}
          </ComboboxCollection>
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>
    <FieldDescription>Select a item.</FieldDescription>
    <FieldError>Please select a fruit.</FieldError>
  </Field>
  <Button {loading} type="submit">Submit</Button>
</Form>
