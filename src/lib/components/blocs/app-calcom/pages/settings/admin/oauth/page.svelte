<script lang="ts">
  import KeyRoundIcon from '@lucide/svelte/icons/key-round';
  import {
    Card,
    CardFrame,
    CardFrameHeader,
    CardFrameTitle,
    CardPanel
  } from '#lib/components/ui/card/index.js';
  import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle
  } from '#lib/components/ui/empty/index.js';
  import {
    AppHeader,
    AppHeaderContent,
    AppHeaderDescription
  } from '../../../../components/app-header/index.js';
  import OAuthClientsList, {
    type OAuthClientItem
  } from '../../developer/oauth/oauth-clients-list.svelte';

  let { params: _params }: { params?: Record<string, string> } = $props();

  const STATUS_GROUPS = ['pending', 'rejected', 'approved'] as const;

  const STATUS_LABELS: Record<(typeof STATUS_GROUPS)[number], string> = {
    approved: 'Approved',
    pending: 'Pending',
    rejected: 'Rejected'
  };

  const OAUTH_CLIENTS: OAuthClientItem[] = [
    {
      clientId: 'cl_admin_1',
      clientSecret: 'cs_admin_1',
      id: '1',
      name: 'another',
      status: 'pending'
    },
    {
      clientId: 'cl_admin_2',
      clientSecret: 'cs_admin_2',
      id: '2',
      name: 'test',
      status: 'pending'
    }
  ];

  let clients = $state(OAUTH_CLIENTS);

  const grouped = $derived(
    STATUS_GROUPS.map((status) => ({
      clients: clients.filter((c) => c.status === status),
      label: STATUS_LABELS[status],
      status
    }))
  );

  function handleEditClick(_client: OAuthClientItem) {
    // TODO: open edit dialog
  }

  function handleRemoveClick(client: OAuthClientItem) {
    clients = clients.filter((c) => c.id !== client.id);
  }
</script>

<AppHeader>
  <AppHeaderContent title="OAuth Clients">
    <AppHeaderDescription>Manage and approve OAuth client submissions</AppHeaderDescription>
  </AppHeaderContent>
</AppHeader>
<div class="flex flex-col gap-4">
  {#each grouped as group (group.status)}
    <CardFrame>
      <CardFrameHeader>
        <CardFrameTitle>{group.label}</CardFrameTitle>
      </CardFrameHeader>
      <Card>
        <CardPanel class="p-0">
          {#if group.clients.length > 0}
            <OAuthClientsList
              clients={group.clients}
              onEditClick={handleEditClick}
              onRemoveClick={handleRemoveClick}
            />
          {:else}
            <Empty class="py-0">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <KeyRoundIcon />
                </EmptyMedia>
                <EmptyTitle>No {group.label.toLowerCase()} clients</EmptyTitle>
                <EmptyDescription>
                  There are no {group.label.toLowerCase()} OAuth client submissions.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          {/if}
        </CardPanel>
      </Card>
    </CardFrame>
  {/each}
</div>
