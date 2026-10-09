<script lang="ts">
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
  import {
    type OAuthClientItem,
    statusLabelMap,
    statusVariantMap
  } from './oauth-clients-list.svelte';

  let { open = $bindable(false), client }: { open?: boolean; client: OAuthClientItem | null } =
    $props();
</script>

<Dialog open={open && !!client} onOpenChange={(next) => (open = next)}>
  <DialogPopup class="max-w-xl" showCloseButton={false}>
    {#if client}
      <DialogHeader>
        <DialogTitle>Edit OAuth client</DialogTitle>
        <DialogDescription>View and manage your OAuth client settings.</DialogDescription>
      </DialogHeader>
      <Form
        class="contents"
        onsubmit={(e: SubmitEvent) => {
          e.preventDefault();
          open = false;
        }}
      >
        <DialogPanel class="grid gap-6">
          <div>
            <Badge variant={statusVariantMap[client.status]}>
              {statusLabelMap[client.status]}
            </Badge>
          </div>

          <CopyableField
            aria-label="Client ID"
            label="Client ID"
            monospace
            value={client.clientId}
          />

          <Field>
            <FieldLabel>Client name</FieldLabel>
            <Input name="clientName" type="text" value={client.name} />
          </Field>

          <OAuthClientFormFields
            defaultValues={{
              purpose: client.purpose,
              redirectUri: client.redirectUri,
              usePkce: client.usePkce,
              websiteUrl: client.websiteUrl
            }}
            includeClientName={false}
          />
        </DialogPanel>
        <DialogFooter>
          <DialogClose class={buttonVariants({ variant: 'ghost' })}>Cancel</DialogClose>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </Form>
    {/if}
  </DialogPopup>
</Dialog>
