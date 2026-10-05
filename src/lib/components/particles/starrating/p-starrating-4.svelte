<script lang="ts">
  import { Button } from '#lib/components/ui/button/index.js';
  import {
    Field,
    FieldDescription,
    FieldError,
    FieldLabel
  } from '#lib/components/ui/field/index.js';
  import { Form } from '#lib/components/ui/form/index.js';
  import { StarRating } from '#lib/components/ui/starrating/index.js';

  let rating = $state(0);
  let loading = $state(false);

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    loading = true;
    await new Promise((r) => setTimeout(r, 800));
    loading = false;
    alert(`Rating: ${rating}`);
  }
</script>

<Form class="flex w-full flex-col gap-4" onsubmit={handleSubmit}>
  <Field class="items-stretch gap-3" name="rating">
    <FieldLabel>How would you rate your experience?</FieldLabel>
    <StarRating bind:value={rating} />
    <FieldDescription>Select a rating from 1 to 5 stars</FieldDescription>
    <FieldError />
  </Field>
  <Button {loading} type="submit">Submit</Button>
</Form>
