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
    items: z.array(z.string()).min(1, { message: 'Please select at least one item.' }),
  });

  const superform = createForm({
    initialData: { items: [] as string[] },
    onUpdated: ({ items: selected }) => alert(`Favorite items: ${selected.join(', ')}`),
    schema,
  });

  const { form, submitting } = superform;

  let value = $state<string[]>($form.items as string[]);

  $effect(() => {
    $form.items = value;
  });

  function removeItem(v: string) {
    value = value.filter((x) => x !== v);
  }

  function getLabel(v: string) {
    return items.find((i) => i.value === v)?.label ?? v;
  }
</script>

<Form class="flex w-full max-w-64 flex-col gap-4" {superform}>
  <Field name="items">
    <FieldLabel>Favorite items</FieldLabel>
    <Combobox multiple bind:value {items}>
      <ComboboxChips>
        {#each value as v (v)}
          <ComboboxChip aria-label={getLabel(v)} removeProps={{ onclick: () => removeItem(v) }}>
            {getLabel(v)}
          </ComboboxChip>
        {/each}
        <ComboboxChipsInput placeholder={value.length > 0 ? undefined : 'Select items…'} />
      </ComboboxChips>
      <ComboboxPopup>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
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
