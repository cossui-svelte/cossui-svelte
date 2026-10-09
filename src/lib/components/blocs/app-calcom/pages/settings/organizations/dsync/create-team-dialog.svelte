<script lang="ts">
  import PlusIcon from '@lucide/svelte/icons/plus';
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
    InputGroupInput,
    InputGroupText
  } from '#lib/components/ui/input-group/index.js';
  import { Input } from '#lib/components/ui/input/index.js';

  let { onCreate }: { onCreate?: (data: { teamName: string; teamSlug: string }) => void } =
    $props();

  let open = $state(false);
  let teamName = $state('');
  let teamSlug = $state('');

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    onCreate?.({ teamName: teamName.trim(), teamSlug: teamSlug.trim() });
    open = false;
    teamName = '';
    teamSlug = '';
  }
</script>

<Dialog bind:open>
  <DialogTrigger class={buttonVariants({ variant: 'outline' })} type="button">
    <PlusIcon aria-hidden="true" />
    Create team
  </DialogTrigger>
  <DialogPopup class="max-w-xl" showCloseButton={false}>
    <DialogHeader>
      <DialogTitle>Create a new team</DialogTitle>
      <DialogDescription>New teams will be under your organization</DialogDescription>
    </DialogHeader>
    <Form class="contents" onsubmit={handleSubmit}>
      <DialogPanel class="grid gap-4">
        <Field>
          <FieldLabel>Team name</FieldLabel>
          <Input bind:value={teamName} name="teamName" placeholder="Acme Inc." type="text" />
        </Field>
        <Field>
          <FieldLabel>Team URL</FieldLabel>
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText>dunder-mifflin.localhost:3000/</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput
              bind:value={teamSlug}
              aria-label="Team URL slug"
              class="*:[input]:ps-0!"
              name="teamSlug"
              placeholder="acme"
              type="text"
            />
          </InputGroup>
        </Field>
      </DialogPanel>
      <DialogFooter>
        <DialogClose class={buttonVariants({ variant: 'ghost' })} type="button">Cancel</DialogClose>
        <Button type="submit">Create</Button>
      </DialogFooter>
    </Form>
  </DialogPopup>
</Dialog>
