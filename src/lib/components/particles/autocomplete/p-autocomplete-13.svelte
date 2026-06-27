<script lang="ts">
  import { z } from 'zod';
  import {
    Autocomplete,
    AutocompleteEmpty,
    AutocompleteInput,
    AutocompleteItem,
    AutocompleteList,
    AutocompletePopup,
  } from '$lib/components/ui/autocomplete';
  import { Button } from '$lib/components/ui/button';
  import { Field, FieldError, FieldLabel } from '$lib/components/ui/field';
  import { Form } from '$lib/components/ui/form';
  import { createForm } from '$lib/hooks/use-superform';

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
    { label: 'Strawberry', value: 'strawberry' },
  ];

  const schema = z.object({
    item: z.string().min(1, { message: 'Please select a item.' }),
  });

  const superform = createForm({
    onUpdated: (data) => {
      alert(`Favorite item: ${data.item}`);
    },
    schema,
  });

  const { submitting } = superform;
</script>

<Form class="flex w-full max-w-64 flex-col gap-4" {superform}>
  <Field name="item">
    <FieldLabel>Favorite item</FieldLabel>
    <Autocomplete {items}>
      <AutocompleteInput placeholder="Search items…" />
      <AutocompletePopup>
        <AutocompleteEmpty>No items found.</AutocompleteEmpty>
        <AutocompleteList>
          {#each items as item (item.value)}
            <AutocompleteItem label={item.label} value={item.value}>{item.label}</AutocompleteItem>
          {/each}
        </AutocompleteList>
      </AutocompletePopup>
    </Autocomplete>
    <FieldError />
  </Field>
  <Button loading={$submitting} type="submit">Submit</Button>
</Form>
