<script lang="ts">
  import BoldIcon from '@lucide/svelte/icons/bold';
  import ItalicIcon from '@lucide/svelte/icons/italic';
  import type { Snippet } from 'svelte';
  import { Button, buttonVariants } from '#lib/components/ui/button/index.js';
  import {
    Dialog,
    DialogClose,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogPanel,
    DialogPopup,
    DialogTitle,
    DialogTrigger
  } from '#lib/components/ui/dialog/index.js';
  import { Field, FieldLabel } from '#lib/components/ui/field/index.js';
  import { Form } from '#lib/components/ui/form/index.js';
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroupTextarea
  } from '#lib/components/ui/input-group/index.js';
  import { Input } from '#lib/components/ui/input/index.js';
  import { NumberField, NumberFieldInput } from '#lib/components/ui/number-field/index.js';
  import { Toggle } from '#lib/components/ui/toggle/index.js';
  import { cn } from '#lib/utils.js';

  let { children, class: className }: { children?: Snippet; class?: string } = $props();

  let title = $state('Quick Chat');
  let url = $state('https://i.cal.com/pasquale/');
  let description = $state('A quick video meeting.');
  let duration = $state<number | undefined>(15);
</script>

<Dialog>
  <DialogTrigger class={cn(buttonVariants(), className)}>
    {@render children?.()}
  </DialogTrigger>
  <DialogPopup class="max-w-xl">
    <DialogHeader>
      <DialogTitle>Add a new event type</DialogTitle>
      <DialogDescription>
        Set up event types to offer different types of meetings.
      </DialogDescription>
    </DialogHeader>
    <Form class="contents">
      <DialogPanel class="grid gap-6">
        <Field>
          <FieldLabel>Title</FieldLabel>
          <Input bind:value={title} type="text" />
        </Field>
        <Field>
          <FieldLabel>URL</FieldLabel>
          <Input bind:value={url} type="text" />
        </Field>
        <Field>
          <FieldLabel>Description</FieldLabel>
          <InputGroup>
            <InputGroupTextarea bind:value={description} placeholder="Enter description…" />
            <InputGroupAddon
              align="block-start"
              class="gap-1 rounded-t-lg border-b bg-muted/72 p-2!"
            >
              <Toggle aria-label="Toggle bold" size="sm">
                <BoldIcon />
              </Toggle>
              <Toggle aria-label="Toggle italic" size="sm">
                <ItalicIcon />
              </Toggle>
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel>Duration</FieldLabel>
          <InputGroup>
            <NumberField aria-label="Enter the duration" bind:value={duration} min={1}>
              <NumberFieldInput class="text-left" />
            </NumberField>
            <InputGroupAddon align="inline-end">
              <InputGroupText>minutes</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </Field>
      </DialogPanel>
      <DialogFooter>
        <DialogClose class={buttonVariants({ variant: 'ghost' })}>Close</DialogClose>
        <Button type="submit">Continue</Button>
      </DialogFooter>
    </Form>
  </DialogPopup>
</Dialog>
