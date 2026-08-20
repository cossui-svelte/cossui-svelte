<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Field, FieldDescription, FieldError } from '$lib/components/ui/field';
  import { Form } from '$lib/components/ui/form';
  import {
    NumberField,
    NumberFieldDecrement,
    NumberFieldGroup,
    NumberFieldIncrement,
    NumberFieldInput,
    NumberFieldScrubArea
  } from '$lib/components/ui/number-field';

  let quantity = $state(1);
  let loading = $state(false);

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    loading = true;
    await new Promise((r) => setTimeout(r, 800));
    loading = false;
    alert(`Quantity: ${quantity}`);
  }
</script>

<Form class="flex w-full flex-col gap-4" onsubmit={handleSubmit}>
  <Field name="quantity">
    <NumberField bind:value={quantity} max={100} min={1}>
      <NumberFieldScrubArea label="Quantity" />
      <NumberFieldGroup>
        <NumberFieldDecrement />
        <NumberFieldInput />
        <NumberFieldIncrement />
      </NumberFieldGroup>
    </NumberField>
    <FieldDescription>Choose a value between 1 and 100.</FieldDescription>
    <FieldError />
  </Field>
  <Button {loading} type="submit">Submit</Button>
</Form>
