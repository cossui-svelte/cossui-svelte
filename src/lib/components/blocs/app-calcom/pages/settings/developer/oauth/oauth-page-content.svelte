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
  import EditOAuthClientDialog from './edit-oauth-client-dialog.svelte';
  import NewOAuthClientDialogRoot from './new-oauth-client-dialog.svelte';
  import OAuthClientsList, { type OAuthClientItem } from './oauth-clients-list.svelte';
  import OAuthEmpty from './oauth-empty.svelte';

  const initialMockClients: OAuthClientItem[] = [
    {
      clientId: 'cl_mock_1',
      clientSecret: 'cs_mock_1',
      id: '1',
      name: 'Slack Integration',
      purpose: 'Sync availability and book meetings from Slack',
      redirectUri: 'https://example.com/callback',
      status: 'approved',
      usePkce: false,
      websiteUrl: 'https://example.com'
    },
    {
      clientId: 'cl_mock_2',
      clientSecret: 'cs_mock_2',
      id: '2',
      name: 'Cal.com Mobile App',
      purpose: 'Native mobile app for iOS and Android',
      redirectUri: 'http://localhost:3000/callback',
      status: 'pending',
      usePkce: true,
      websiteUrl: 'http://localhost:3000'
    }
  ];

  let clients = $state<OAuthClientItem[]>(initialMockClients);
  let createDialogOpen = $state(false);
  let editDialogOpen = $state(false);
  let editingClient = $state<OAuthClientItem | null>(null);
  let removeDialogOpen = $state(false);
  let clientToRemove = $state<OAuthClientItem | null>(null);

  const hasClients = $derived(clients.length > 0);

  function handleEditClick(client: OAuthClientItem) {
    editingClient = client;
    editDialogOpen = true;
  }

  function handleRemoveClick(client: OAuthClientItem) {
    clientToRemove = client;
    removeDialogOpen = true;
  }

  function handleRemoveConfirm() {
    if (clientToRemove) {
      const id = clientToRemove.id;
      clients = clients.filter((c) => c.id !== id);
      clientToRemove = null;
    }
    removeDialogOpen = false;
  }

  function handleRemoveDialogOpenChange(open: boolean) {
    if (!open) {
      clientToRemove = null;
    }
    removeDialogOpen = open;
  }
</script>

<AppHeader>
  <AppHeaderContent title="OAuth Clients">
    <AppHeaderDescription>
      Create and manage OAuth clients for third-party integrations
    </AppHeaderDescription>
  </AppHeaderContent>
  {#if hasClients}
    <AppHeaderActions>
      <Button onclick={() => (createDialogOpen = true)} variant="outline">
        <PlusIcon />
        New
      </Button>
    </AppHeaderActions>
  {/if}
</AppHeader>
{#if hasClients}
  <Card>
    <CardPanel class="p-0">
      <OAuthClientsList {clients} onEditClick={handleEditClick} onRemoveClick={handleRemoveClick} />
    </CardPanel>
  </Card>
{:else}
  <OAuthEmpty onNewClick={() => (createDialogOpen = true)} />
{/if}

<NewOAuthClientDialogRoot bind:open={createDialogOpen} />

<EditOAuthClientDialog client={editingClient} bind:open={editDialogOpen} />

<AlertDialog bind:open={removeDialogOpen} onOpenChange={handleRemoveDialogOpenChange}>
  <AlertDialogPopup>
    <AlertDialogHeader>
      <AlertDialogTitle>Remove OAuth client</AlertDialogTitle>
      <AlertDialogDescription>
        Are you sure you want to remove this OAuth client? This action cannot be undone.
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
