<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Field, FieldError, FieldLabel } from '$lib/components/ui/field';
  import { Form } from '$lib/components/ui/form';
  import {
    Select,
    SelectItem,
    SelectPopup,
    SelectTrigger,
    SelectValue
  } from '$lib/components/ui/select';

  const items = [
    { label: 'Next.js', value: 'next' },
    { label: 'Vite', value: 'vite' },
    { label: 'Astro', value: 'astro' }
  ];

  let loading = $state(false);

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    loading = true;
    await new Promise((r) => setTimeout(r, 800));
    loading = false;
    alert(`Framework: ${formData.get('framework') ?? ''}`);
  }
</script>

<Form class="flex w-full max-w-64 flex-col gap-4" onsubmit={handleSubmit}>
  <Field name="framework">
    <FieldLabel>Framework</FieldLabel>
    <Select>
      <SelectTrigger aria-label="Select framework">
        <SelectValue placeholder="Select a framework" />
      </SelectTrigger>
      <SelectPopup>
        {#each items as { label, value } (value)}
          <SelectItem {value}>{label}</SelectItem>
        {/each}
      </SelectPopup>
    </Select>
    <p class="text-muted-foreground text-sm">Pick your favorite.</p>
    <FieldError />
  </Field>
  <Button {loading} type="submit">Submit</Button>
</Form>
