<script lang="ts">
  import CircleAlert from "@lucide/svelte/icons/circle-alert";
  import { Button } from "$lib/components/ui/button";
  import {
    Card,
    CardDescription,
    CardHeader,
    CardPanel,
    CardTitle,
  } from "$lib/components/ui/card";
  import { Field, FieldLabel } from "$lib/components/ui/field";
  import { Form } from "$lib/components/ui/form";
  import { Frame, FrameFooter } from "$lib/components/ui/frame";
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
  <Card>
    <CardHeader>
      <CardTitle>Create project</CardTitle>
      <CardDescription>Deploy your new project in one-click.</CardDescription>
    </CardHeader>
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
  <FrameFooter>
    <div class="flex gap-1 text-muted-foreground text-xs">
      <CircleAlert class="size-3 h-lh shrink-0" />
      <p>This will take a few seconds to complete.</p>
    </div>
  </FrameFooter>
</Frame>
