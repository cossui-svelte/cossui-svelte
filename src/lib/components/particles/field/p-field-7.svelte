<script lang="ts">
  import {
    Autocomplete,
    AutocompleteCollection,
    AutocompleteEmpty,
    AutocompleteInput,
    AutocompleteItem,
    AutocompleteList,
    AutocompletePopup
  } from '$lib/components/ui/autocomplete';
  import { Button } from '$lib/components/ui/button';
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

  let fruit = $state('');
  let loading = $state(false);

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    loading = true;
    await new Promise((r) => setTimeout(r, 800));
    loading = false;
    alert(`Fruit: ${fruit}`);
  }
</script>

<Form class="flex w-full flex-col gap-4" onsubmit={handleSubmit}>
  <Field name="fruit">
    <FieldLabel>Fruits</FieldLabel>
    <Autocomplete {items} bind:value={fruit}>
      <AutocompleteInput aria-label="Search items" placeholder="Search items…" />
      <AutocompletePopup>
        <AutocompleteEmpty>No items found.</AutocompleteEmpty>
        <AutocompleteList>
          <AutocompleteCollection>
            {#snippet children(item: { label: string; value: string })}
              <AutocompleteItem value={item}>{item.label}</AutocompleteItem>
            {/snippet}
          </AutocompleteCollection>
        </AutocompleteList>
      </AutocompletePopup>
    </Autocomplete>
    <FieldDescription>Select a item.</FieldDescription>
    <FieldError>Please select a fruit.</FieldError>
  </Field>
  <Button {loading} type="submit">Submit</Button>
</Form>
