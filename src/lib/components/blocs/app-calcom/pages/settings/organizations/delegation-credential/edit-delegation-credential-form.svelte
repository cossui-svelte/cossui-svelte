<script lang="ts">
  import { Button, buttonVariants } from '#lib/components/ui/button/index.js';
  import {
    DialogClose,
    DialogFooter,
    DialogHeader,
    DialogPanel,
    DialogTitle
  } from '#lib/components/ui/dialog/index.js';
  import { Field, FieldLabel } from '#lib/components/ui/field/index.js';
  import { Form } from '#lib/components/ui/form/index.js';
  import { Input } from '#lib/components/ui/input/index.js';
  import type {
    DelegationCredentialItem,
    EditDelegationCredentialSavePayload
  } from './delegation-credential-types.js';
  import { findWorkspacePlatformItem } from './delegation-credential-workspace-platforms.js';
  import WorkspacePlatformField from './workspace-platform-field.svelte';
  let {
    credential,
    onSave,
    onDone
  }: {
    credential: DelegationCredentialItem;
    onSave: (id: string, data: EditDelegationCredentialSavePayload) => void;
    onDone: () => void;
  } = $props();

  // svelte-ignore state_referenced_locally
  let domain = $state(credential.domain);
  // svelte-ignore state_referenced_locally
  let platform = $state<string | undefined>(credential.platformValue);

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    const item = platform ? findWorkspacePlatformItem(platform) : null;
    onSave(credential.id, {
      domain: domain.trim() || 'Untitled domain',
      platformLabel: item?.label ?? '—',
      platformValue: item?.value ?? ''
    });
    onDone();
  }
</script>

<DialogHeader>
  <DialogTitle>Edit delegation credential</DialogTitle>
</DialogHeader>
<Form class="contents" onsubmit={handleSubmit}>
  <DialogPanel class="grid gap-4">
    <Field>
      <FieldLabel>Domain</FieldLabel>
      <Input bind:value={domain} name="domain" type="text" />
    </Field>
    <WorkspacePlatformField bind:value={platform} />
  </DialogPanel>
  <DialogFooter>
    <DialogClose class={buttonVariants({ variant: 'ghost' })} type="button">Cancel</DialogClose>
    <Button type="submit">Save</Button>
  </DialogFooter>
</Form>
