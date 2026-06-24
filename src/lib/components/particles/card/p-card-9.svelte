<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Card, CardPanel } from "$lib/components/ui/card";
  import { Field, FieldLabel } from "$lib/components/ui/field";
  import { Form } from "$lib/components/ui/form";
  import {
    Frame,
    FrameDescription,
    FrameHeader,
    FrameTitle,
  } from "$lib/components/ui/frame";
  import { Input } from "$lib/components/ui/input";
  import {
    Select,
    SelectItem,
    SelectPopup,
    SelectTrigger,
    SelectValue,
  } from "$lib/components/ui/select";

  const frameworkOptions = [
    { label: "Next.js", value: "next" },
    { label: "Vite", value: "vite" },
    { label: "Remix", value: "remix" },
    { label: "Astro", value: "astro" },
  ];
</script>

<Frame class="w-full max-w-xs">
  <FrameHeader>
    <FrameTitle>Create project</FrameTitle>
    <FrameDescription>Deploy your new project in one-click.</FrameDescription>
  </FrameHeader>
  <Card>
    <CardPanel>
      <Form class="flex w-full flex-col gap-4">
        <Field>
          <FieldLabel>Name</FieldLabel>
          <Input placeholder="Name of your project" type="text" />
        </Field>
        <Field>
          <FieldLabel>Framework</FieldLabel>
          <Select value="next">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectPopup>
              {#each frameworkOptions as { label, value } (value)}
                <SelectItem {value} {label} />
              {/each}
            </SelectPopup>
          </Select>
        </Field>
        <Button class="w-full" type="submit">Deploy</Button>
      </Form>
    </CardPanel>
  </Card>
</Frame>
