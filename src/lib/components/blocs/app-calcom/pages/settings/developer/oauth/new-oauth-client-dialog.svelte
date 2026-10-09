<script lang="ts">
  import TriangleAlertIcon from '@lucide/svelte/icons/triangle-alert';
  import { Alert, AlertDescription } from '#lib/components/ui/alert/index.js';
  import { Badge } from '#lib/components/ui/badge/index.js';
  import { Button, buttonVariants } from '#lib/components/ui/button/index.js';
  import {
    Dialog,
    DialogClose,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogPanel,
    DialogPopup,
    DialogTitle
  } from '#lib/components/ui/dialog/index.js';
  import { Field, FieldLabel } from '#lib/components/ui/field/index.js';
  import { Form } from '#lib/components/ui/form/index.js';
  import { Input } from '#lib/components/ui/input/index.js';
  import CopyableField from '../../../../components/copyable-field.svelte';
  import OAuthClientFormFields from './oauth-client-form-fields.svelte';

  interface OAuthClientSubmittedData {
    clientId: string;
    clientSecret: string;
    name: string;
  }

  type Step = 'form' | 'submitted';

  let { open = $bindable(false) }: { open?: boolean } = $props();

  let step = $state<Step>('form');
  let submittedData = $state<OAuthClientSubmittedData | null>(null);

  $effect(() => {
    if (open) {
      step = 'form';
      submittedData = null;
    }
  });

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const name = (formData.get('clientName') as string) || 'My OAuth App';
    submittedData = {
      clientId: 'cl_mock_1',
      clientSecret: 'cs_mock_1',
      name
    };
    step = 'submitted';
    form.reset();
  }
</script>

<Dialog bind:open>
  <DialogPopup class="max-w-xl" showCloseButton={false}>
    {#if step === 'form'}
      <DialogHeader>
        <DialogTitle>Create OAuth client</DialogTitle>
        <DialogDescription>
          Create a new OAuth client to allow third-party applications to access Cal.com on behalf of
          your users.
        </DialogDescription>
      </DialogHeader>
      <Form class="contents" onsubmit={handleSubmit}>
        <DialogPanel class="grid gap-6">
          <OAuthClientFormFields />
        </DialogPanel>
        <DialogFooter>
          <DialogClose class={buttonVariants({ variant: 'ghost' })}>Cancel</DialogClose>
          <Button type="submit">Create</Button>
        </DialogFooter>
      </Form>
    {:else if submittedData}
      <DialogHeader>
        <DialogTitle>OAuth Client Submitted</DialogTitle>
        <DialogDescription>
          Your OAuth client has been submitted for approval. You will receive an email if it is
          approved or rejected. The OAuth client can't be used unless approved.
        </DialogDescription>
      </DialogHeader>
      <DialogPanel class="flex flex-col gap-6">
        <div>
          <Badge variant="warning">Pending</Badge>
        </div>
        <Field>
          <FieldLabel>Name</FieldLabel>
          <Input disabled value={submittedData.name} />
        </Field>
        <CopyableField
          aria-label="Client ID"
          label="Client ID"
          monospace
          value={submittedData.clientId}
        />
        <CopyableField
          aria-label="Client secret"
          label="Client Secret"
          monospace
          value={submittedData.clientSecret}
        />
        <Alert variant="warning">
          <TriangleAlertIcon />
          <AlertDescription>
            This client secret is shown only once. Copy it now — you won't be able to view it again
            after closing this dialog.
          </AlertDescription>
        </Alert>
      </DialogPanel>
      <DialogFooter>
        <DialogClose class={buttonVariants()}>Done</DialogClose>
      </DialogFooter>
    {/if}
  </DialogPopup>
</Dialog>
