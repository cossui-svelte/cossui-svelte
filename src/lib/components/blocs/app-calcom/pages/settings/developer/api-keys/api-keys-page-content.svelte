<script lang="ts">
  import PlusIcon from '@lucide/svelte/icons/plus';
  import {
    AlertDialog,
    AlertDialogClose,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogPopup,
    AlertDialogTitle
  } from '#lib/components/ui/alert-dialog/index.js';
  import { Button, buttonVariants } from '#lib/components/ui/button/index.js';
  import { Card, CardPanel } from '#lib/components/ui/card/index.js';
  import {
    AppHeader,
    AppHeaderActions,
    AppHeaderContent,
    AppHeaderDescription
  } from '../../../../components/app-header/index.js';
  import ApiKeysEmpty from './api-keys-empty.svelte';
  import ApiKeysList, { type ApiKeyItem } from './api-keys-list.svelte';
  import EditApiKeyDialog from './edit-api-key-dialog.svelte';
  import NewApiKeyDialog from './new-api-key-dialog.svelte';

  const initialMockApiKeys: ApiKeyItem[] = [
    {
      createdAt: '2025-11-15T10:30:00Z',
      expiresAt: null,
      id: '1',
      key: 'cal_live_mock_key_1',
      neverExpires: true,
      note: 'Production API'
    },
    {
      createdAt: '2026-01-20T14:00:00Z',
      expiresAt: '2026-07-20T14:00:00Z',
      id: '2',
      key: 'cal_live_mock_key_2',
      neverExpires: false,
      note: 'Development testing'
    }
  ];

  let apiKeys = $state<ApiKeyItem[]>(initialMockApiKeys);
  let createDialogOpen = $state(false);
  let editDialogOpen = $state(false);
  let editingKey = $state<ApiKeyItem | null>(null);
  let revokeDialogOpen = $state(false);
  let keyToRevoke = $state<ApiKeyItem | null>(null);

  const hasApiKeys = $derived(apiKeys.length > 0);

  function handleEditClick(apiKey: ApiKeyItem) {
    editingKey = apiKey;
    editDialogOpen = true;
  }

  function handleRemoveClick(apiKey: ApiKeyItem) {
    keyToRevoke = apiKey;
    revokeDialogOpen = true;
  }

  function handleRevokeConfirm() {
    if (keyToRevoke) {
      const id = keyToRevoke.id;
      apiKeys = apiKeys.filter((k) => k.id !== id);
      keyToRevoke = null;
    }
    revokeDialogOpen = false;
  }

  function handleRevokeDialogOpenChange(open: boolean) {
    if (!open) {
      keyToRevoke = null;
    }
    revokeDialogOpen = open;
  }
</script>

<AppHeader>
  <AppHeaderContent title="API Keys">
    <AppHeaderDescription>
      Create and manage API keys for authenticating with the Cal.com API
    </AppHeaderDescription>
  </AppHeaderContent>
  {#if hasApiKeys}
    <AppHeaderActions>
      <Button onclick={() => (createDialogOpen = true)} variant="outline">
        <PlusIcon />
        New
      </Button>
    </AppHeaderActions>
  {/if}
</AppHeader>
{#if hasApiKeys}
  <Card>
    <CardPanel class="p-0">
      <ApiKeysList {apiKeys} onEditClick={handleEditClick} onRemoveClick={handleRemoveClick} />
    </CardPanel>
  </Card>
{:else}
  <ApiKeysEmpty onNewClick={() => (createDialogOpen = true)} />
{/if}

<NewApiKeyDialog bind:open={createDialogOpen} />

<EditApiKeyDialog apiKey={editingKey} bind:open={editDialogOpen} />

<AlertDialog bind:open={revokeDialogOpen} onOpenChange={handleRevokeDialogOpenChange}>
  <AlertDialogPopup>
    <AlertDialogHeader>
      <AlertDialogTitle>Permanently remove this API key from your account?</AlertDialogTitle>
      <AlertDialogDescription>
        This will permanently delete the API key. Any applications using this key will immediately
        lose access to your account. This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogClose class={buttonVariants({ variant: 'ghost' })}>Cancel</AlertDialogClose>
      <AlertDialogClose
        class={buttonVariants({ variant: 'destructive' })}
        onclick={handleRevokeConfirm}
      >
        Revoke this API key
      </AlertDialogClose>
    </AlertDialogFooter>
  </AlertDialogPopup>
</AlertDialog>
