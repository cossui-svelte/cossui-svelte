<script lang="ts">
  import { z } from "zod";
  import { Button } from "$lib/components/ui/button";
  import {
    Card,
    CardFrame,
    CardFrameDescription,
    CardFrameHeader,
    CardFrameTitle,
    CardPanel,
  } from "$lib/components/ui/card";
  import { Field, FieldError, FieldLabel } from "$lib/components/ui/field";
  import { Form } from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import {
    Select,
    SelectItem,
    SelectPopup,
    SelectTrigger,
    SelectValue,
  } from "$lib/components/ui/select";
  import { createForm } from "$lib/hooks/use-superform";

  const frameworkOptions = [
    { label: "Next.js", value: "next" },
    { label: "Vite", value: "vite" },
    { label: "Remix", value: "remix" },
    { label: "Astro", value: "astro" },
  ] as const;

  const schema = z.object({
    framework: z.enum(["next", "vite", "remix", "astro"], {
      message: "Please select a framework.",
    }),
    name: z.string().min(1, "Project name is required."),
  });

  const superform = createForm({
    initialData: { framework: "next" as const },
    onUpdated: (data) => {
      alert(`Deploying "${data.name}" with ${data.framework}`);
    },
    schema,
  });

  const { form, submitting } = superform;
</script>

<CardFrame class="w-full max-w-xs">
  <CardFrameHeader>
    <CardFrameTitle>Create project</CardFrameTitle>
    <CardFrameDescription>Deploy your new project in one-click.</CardFrameDescription>
  </CardFrameHeader>
  <Card>
    <CardPanel>
      <Form class="flex w-full flex-col gap-4" {superform}>
        <Field name="name">
          <FieldLabel>Name</FieldLabel>
          <Input bind:value={$form.name} placeholder="Name of your project" type="text" />
          <FieldError />
        </Field>
        <Field name="framework">
          <FieldLabel>Framework</FieldLabel>
          <Select bind:value={$form.framework}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectPopup>
              {#each frameworkOptions as { label, value } (value)}
                <SelectItem {value} {label} />
              {/each}
            </SelectPopup>
          </Select>
          <FieldError />
        </Field>
        <Button class="w-full" loading={$submitting} type="submit">Deploy</Button>
      </Form>
    </CardPanel>
  </Card>
</CardFrame>
