<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Field, FieldDescription, FieldError, FieldLabel } from '$lib/components/ui/field';
  import { Form } from '$lib/components/ui/form';
  import { Slider } from '$lib/components/ui/slider';

  let loading = $state(false);

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    loading = true;
    await new Promise((r) => setTimeout(r, 800));
    loading = false;
    alert(`Volume: ${formData.get('volume') ?? 50}`);
  }
</script>

<Form class="flex w-full flex-col gap-4" onsubmit={handleSubmit}>
  <Field class="items-stretch gap-3" name="volume">
    <FieldLabel>Volume</FieldLabel>
    <Slider value={50} />
    <FieldDescription>This is an optional field</FieldDescription>
    <FieldError />
  </Field>
  <Button {loading} type="submit">Submit</Button>
</Form>
