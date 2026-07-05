<script lang="ts">
  import { z } from 'zod';
  import { Button } from '$lib/components/ui/button';
  import {
    Combobox,
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput,
    ComboboxEmpty,
    ComboboxItem,
    ComboboxList,
    ComboboxPopup,
  } from '$lib/components/ui/combobox';
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
    fruits: z.array(z.string()).min(1, { message: 'Please select at least one fruit.' }),
  });

  const superform = createForm({
    initialData: { fruits: ['apple', 'mango'] },
    onUpdated: ({ fruits }) => alert(`Selected: ${fruits.join(', ')}`),
    schema,
  });

  const { form, submitting } = superform;

  let value = $state<string[]>($form.fruits as string[]);

  $effect(() => {
    $form.fruits = value;
  });
</script>

<Form class="flex w-full flex-col gap-4" {superform}>
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
          {#each items as item (item.value)}
            <ComboboxItem label={item.label} value={item.value}>{item.label}</ComboboxItem>
          {/each}
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>
    <FieldDescription>Select multiple items.</FieldDescription>
    <FieldError />
  </Field>
  <Button loading={$submitting} type="submit">Submit</Button>
</Form>
