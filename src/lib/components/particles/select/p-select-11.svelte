<script lang="ts">
  import { z } from "zod";
  import { Button } from "$lib/components/ui/button";
  import { Field, FieldError, FieldLabel } from "$lib/components/ui/field";
  import { Form } from "$lib/components/ui/form";
  import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "$lib/components/ui/select";
  import { createForm } from "$lib/hooks/use-superform";

  const items = [
    { label: "Next.js", value: "next" },
    { label: "Vite", value: "vite" },
    { label: "Astro", value: "astro" },
  ];

  const schema = z.object({
    framework: z.string().min(1, "Please select a framework."),
  });

  const superform = createForm({
    onUpdated: (data) => {
      alert(`Framework: ${data.framework}`);
    },
    schema,
  });

  const { form, submitting } = superform;
</script>

<Form class="flex w-full max-w-64 flex-col gap-4" {superform}>
  <Field name="framework">
    <FieldLabel>Framework</FieldLabel>
    <Select
      aria-label="Select framework"
      name="framework"
      value={$form.framework}
      onValueChange={(v) => { $form.framework = v as string; }}
    >
      <SelectTrigger>
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
  <Button loading={$submitting} type="submit">Submit</Button>
</Form>
