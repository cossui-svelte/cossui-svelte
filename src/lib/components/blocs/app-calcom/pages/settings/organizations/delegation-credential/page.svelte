<script lang="ts">
  import {
    AlertDialog,
    AlertDialogClose,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogPopup,
    AlertDialogTitle
  } from '#lib/components/ui/alert-dialog/index.js';
  import { buttonVariants } from '#lib/components/ui/button/index.js';
  import { Card, CardPanel } from '#lib/components/ui/card/index.js';
  import { toastManager } from '#lib/components/ui/toast/index.js';
  import {
    AppHeader,
    AppHeaderContent,
    AppHeaderDescription
  } from '../../../../components/app-header/index.js';
  import AddDelegationCredentialDialog from './add-delegation-credential-dialog.svelte';
  import DelegationCredentialEmpty from './delegation-credential-empty.svelte';
  import DelegationCredentialList from './delegation-credential-list.svelte';
  import {
    DEFAULT_CALENDAR_SCOPE_URL,
    type DelegationCredentialItem,
    type EditDelegationCredentialSavePayload,
    generateDelegationSubjectId
  } from './delegation-credential-types.js';
  import EditDelegationCredentialDialog from './edit-delegation-credential-dialog.svelte';

  let { params: _params }: { params?: Record<string, string> } = $props();

  const DELEGATION_CREDENTIAL_DESCRIPTION =
    'Delegation credential allows you to manage access to Google Workspace calendars for your organization.';

  let credentials = $state<DelegationCredentialItem[]>([]);
  let dialogOpen = $state(false);
  let editDialogOpen = $state(false);
  let editingCredential = $state<DelegationCredentialItem | null>(null);
  let enabledById = $state<Record<string, boolean>>({});
  let removeDialogOpen = $state(false);
  let credentialToRemove = $state<DelegationCredentialItem | null>(null);

  const hasItems = $derived(credentials.length > 0);

  function handleCreate(data: {
    domain: string;
    platformLabel: string;
    platformValue: string;
    serviceAccountKeyJson: string;
  }) {
    if (credentials.length >= 1) return;
    const id = `dc_${Date.now().toString(36)}`;
    const domainBadge = data.domain.trim().replace(/^https?:\/\//i, '');
    const newCredential: DelegationCredentialItem = {
      domain: domainBadge || '—',
      id,
      platformLabel: data.platformLabel,
      platformValue: data.platformValue,
      scopeUrl: DEFAULT_CALENDAR_SCOPE_URL,
      serviceAccountKeyJson: data.serviceAccountKeyJson || undefined,
      subjectId: generateDelegationSubjectId()
    };
    enabledById = { ...enabledById, [newCredential.id]: true };
    credentials = [...credentials, newCredential];
  }

  function handleEditRequest(item: DelegationCredentialItem) {
    editingCredential = item;
    editDialogOpen = true;
  }

  function handleEditDialogOpenChange(open: boolean) {
    editDialogOpen = open;
    if (!open) {
      editingCredential = null;
    }
  }

  function handleSaveEdit(id: string, data: EditDelegationCredentialSavePayload) {
    const domainBadge = data.domain.trim().replace(/^https?:\/\//i, '');
    credentials = credentials.map((c) =>
      c.id === id
        ? {
            ...c,
            domain: domainBadge || '—',
            platformLabel: data.platformLabel,
            platformValue: data.platformValue
          }
        : c
    );
    toastManager.add({ title: 'Delegation credential updated successfully', type: 'success' });
  }

  function handleEnabledChange(id: string, checked: boolean) {
    enabledById = { ...enabledById, [id]: checked };
    toastManager.add({ title: 'Delegation credential updated successfully', type: 'success' });
  }

  function handleRemoveRequest(item: DelegationCredentialItem) {
    credentialToRemove = item;
    removeDialogOpen = true;
  }

  function handleRemoveDialogOpenChangeComplete(open: boolean) {
    if (!open) {
      credentialToRemove = null;
    }
  }

  function handleRemoveConfirm() {
    if (!credentialToRemove) return;
    const id = credentialToRemove.id;
    credentials = credentials.filter((c) => c.id !== id);
    removeDialogOpen = false;
  }
</script>

<AppHeader>
  <AppHeaderContent title="Delegation credential">
    <AppHeaderDescription>{DELEGATION_CREDENTIAL_DESCRIPTION}</AppHeaderDescription>
  </AppHeaderContent>
</AppHeader>

{#if hasItems}
  <Card>
    <CardPanel class="p-0">
      <DelegationCredentialList
        {credentials}
        {enabledById}
        onEditRequest={handleEditRequest}
        onEnabledChange={handleEnabledChange}
        onRemoveRequest={handleRemoveRequest}
      />
    </CardPanel>
  </Card>
{:else}
  <DelegationCredentialEmpty
    description={DELEGATION_CREDENTIAL_DESCRIPTION}
    onAddClick={() => (dialogOpen = true)}
  />
{/if}

<AddDelegationCredentialDialog bind:open={dialogOpen} onCreate={handleCreate} />

<EditDelegationCredentialDialog
  credential={editingCredential}
  onOpenChange={handleEditDialogOpenChange}
  onSave={handleSaveEdit}
  open={editDialogOpen}
/>

<AlertDialog
  bind:open={removeDialogOpen}
  onOpenChangeComplete={handleRemoveDialogOpenChangeComplete}
>
  <AlertDialogPopup>
    <AlertDialogHeader>
      <AlertDialogTitle>Remove delegation credential</AlertDialogTitle>
      <AlertDialogDescription>
        {credentialToRemove
          ? `Are you sure you want to remove the credential "${credentialToRemove.subjectId}"? This action cannot be undone.`
          : null}
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogClose class={buttonVariants({ variant: 'ghost' })}>Cancel</AlertDialogClose>
      <AlertDialogClose
        class={buttonVariants({ variant: 'destructive' })}
        onclick={handleRemoveConfirm}
      >
        Remove
      </AlertDialogClose>
    </AlertDialogFooter>
  </AlertDialogPopup>
</AlertDialog>
