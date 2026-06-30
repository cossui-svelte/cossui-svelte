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
  import { Field, FieldDescription, FieldError, FieldLabel } from '$lib/components/ui/field';
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
    fruit: z.string().min(1, { message: 'Please select a fruit.' }),
  });

  const superform = createForm({
    onUpdated: (data) => {
      alert(`Fruit: ${data.fruit}`);
    },
    schema,
  });

  const { submitting } = superform;
</script>

<Form class="flex w-full flex-col gap-4" {superform}>
  <Field name="fruit">
    <FieldLabel>Fruits</FieldLabel>
    <Autocomplete {items}>
      <AutocompleteInput aria-label="Search items" placeholder="Search items…" />
      <AutocompletePopup>
        <AutocompleteEmpty>No items found.</AutocompleteEmpty>
        <AutocompleteList>
          {#each items as item (item.value)}
            <AutocompleteItem label={item.label} value={item.value}>{item.label}</AutocompleteItem>
          {/each}
        </AutocompleteList>
      </AutocompletePopup>
    </Autocomplete>
    <FieldDescription>Select a item.</FieldDescription>
    <FieldError />
  </Field>
  <Button loading={$submitting} type="submit">Submit</Button>
</Form>
