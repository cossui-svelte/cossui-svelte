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
  import { Field, FieldError, FieldLabel } from '$lib/components/ui/field';
  import { Form } from '$lib/components/ui/form';

  const items = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Orange', value: 'orange' },
    { label: 'Grape', value: 'grape' },
    { label: 'Strawberry', value: 'strawberry' },
    { label: 'Mango', value: 'mango' },
    { label: 'Peach', value: 'peach' },
    { label: 'Pear', value: 'pear' },
    { label: 'Pineapple', value: 'pineapple' },
    { label: 'Kiwi', value: 'kiwi' }
  ];

  let item = $state('');
  let loading = $state(false);

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    loading = true;
    await new Promise((r) => setTimeout(r, 800));
    loading = false;
    alert(`Favorite item: ${item}`);
  }
</script>

<Form class="flex w-full max-w-64 flex-col gap-4" onsubmit={handleSubmit}>
  <Field name="item">
    <FieldLabel>Favorite item</FieldLabel>
    <Autocomplete {items} bind:value={item}>
      <AutocompleteInput placeholder="Search items…" />
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
    <FieldError />
  </Field>
  <Button {loading} type="submit">Submit</Button>
</Form>
