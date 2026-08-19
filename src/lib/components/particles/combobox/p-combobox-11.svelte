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
  import { Field, FieldError, FieldLabel } from '$lib/components/ui/field';
  import { Form } from '$lib/components/ui/form';

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

  let loading = $state(false);

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    loading = true;
    await new Promise((r) => setTimeout(r, 800));
    loading = false;
    alert(`Favorite item: ${formData.get('item') ?? ''}`);
  }
</script>

<Form class="flex w-full max-w-64 flex-col gap-4" onsubmit={handleSubmit}>
  <Field name="item">
    <FieldLabel>Favorite item</FieldLabel>
    <Combobox {items}>
      <ComboboxInput placeholder="Select an item..." />
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
    <FieldError />
  </Field>
  <Button {loading} type="submit">Submit</Button>
</Form>
