<script lang="ts">
  import { buttonVariants, Button } from '#lib/components/ui/button/index.js';
  import {
    Dialog,
    DialogClose,
    DialogFooter,
    DialogHeader,
    DialogPanel,
    DialogPopup,
    DialogTitle
  } from '#lib/components/ui/dialog/index.js';
  import { Field, FieldLabel } from '#lib/components/ui/field/index.js';
  import { Form } from '#lib/components/ui/form/index.js';
  import { Input } from '#lib/components/ui/input/index.js';
  import type { ApiKeyItem } from './api-keys-list.svelte';

  let { open = $bindable(false), apiKey }: { open?: boolean; apiKey: ApiKeyItem | null } = $props();
</script>

<Dialog open={open && !!apiKey} onOpenChange={(next) => (open = next)}>
  <DialogPopup class="max-w-xl" showCloseButton={false}>
    {#if apiKey}
      <DialogHeader>
        <DialogTitle>Edit API key</DialogTitle>
      </DialogHeader>
      <Form
        class="contents"
        onsubmit={(e: SubmitEvent) => {
          e.preventDefault();
          open = false;
        }}
      >
        <DialogPanel class="grid gap-6">
          <Field>
            <FieldLabel>Name this key</FieldLabel>
            <Input name="note" placeholder="E.g. Development" type="text" value={apiKey.note} />
          </Field>
        </DialogPanel>
        <DialogFooter>
          <DialogClose class={buttonVariants({ variant: 'ghost' })}>Cancel</DialogClose>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </Form>
    {/if}
  </DialogPopup>
</Dialog>
