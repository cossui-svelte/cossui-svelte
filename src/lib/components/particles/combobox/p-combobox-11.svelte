<script lang="ts">
  import { z } from 'zod';
  import { Button } from '$lib/components/ui/button';
  import {
    Combobox,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
    ComboboxPopup,
  } from '$lib/components/ui/combobox';
  import { Field, FieldError, FieldLabel } from '$lib/components/ui/field';
  import { Form } from '$lib/components/ui/form';
  import { createForm } from '$lib/hooks/use-superform';

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
    { label: 'Pear', value: 'pear' },
  ];

  const schema = z.object({
    item: z.string().min(1, { message: 'Please select a item.' }),
  });

  const superform = createForm({
    onUpdated: ({ item }) => alert(`Favorite item: ${item}`),
    schema,
  });

  const { form, submitting } = superform;
</script>

<Form class="flex w-full max-w-64 flex-col gap-4" {superform}>
  <Field name="item">
    <FieldLabel>Favorite item</FieldLabel>
    <Combobox bind:value={$form.item} {items}>
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
    <FieldError />
  </Field>
  <Button loading={$submitting} type="submit">Submit</Button>
</Form>
