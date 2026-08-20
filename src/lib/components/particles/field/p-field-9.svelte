<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import {
    Combobox,
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput,
    ComboboxCollection,
    ComboboxEmpty,
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

  let value = $state<string[]>(['apple', 'mango']);
  let loading = $state(false);

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    loading = true;
    await new Promise((r) => setTimeout(r, 800));
    loading = false;
    alert(`Selected: ${value.join(', ')}`);
  }
</script>

<Form class="flex w-full flex-col gap-4" onsubmit={handleSubmit}>
  <Field name="fruits">
    <FieldLabel>Fruits</FieldLabel>
    <Combobox bind:value {items} multiple>
      <ComboboxChips>
        {#each value as v (v)}
          <ComboboxChip aria-label={v}>{items.find((i) => i.value === v)?.label ?? v}</ComboboxChip>
        {/each}
        <ComboboxChipsInput
          aria-label="Select items"
          placeholder={value.length > 0 ? undefined : 'Select items…'}
        />
      </ComboboxChips>
      <ComboboxPopup>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          <ComboboxCollection>
            {#snippet children(item: { label: string; value: string })}
              <ComboboxItem label={item.label} value={item.value}>{item.label}</ComboboxItem>
            {/snippet}
          </ComboboxCollection>
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>
    <FieldDescription>Select multiple items.</FieldDescription>
    <FieldError>Please select at least one fruit.</FieldError>
  </Field>
  <Button {loading} type="submit">Submit</Button>
</Form>
