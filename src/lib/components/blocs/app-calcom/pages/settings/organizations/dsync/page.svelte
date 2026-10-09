<script lang="ts">
  import { Button } from '#lib/components/ui/button/index.js';
  import {
    Card,
    CardFrame,
    CardFrameAction,
    CardFrameDescription,
    CardFrameHeader,
    CardFrameTitle,
    CardPanel
  } from '#lib/components/ui/card/index.js';
  import {
    AppHeader,
    AppHeaderContent,
    AppHeaderDescription
  } from '../../../../components/app-header/index.js';
  import CopyableField from '../../../../components/copyable-field.svelte';
  import ConfigureDirectorySyncDialog from './configure-directory-sync-dialog.svelte';
  import CreateTeamDialog from './create-team-dialog.svelte';
  import DirectorySyncTeamMapping from './directory-sync-team-mapping.svelte';
  import type { TeamDirectoryRow } from './directory-sync-types.js';

  let { params: _params }: { params?: Record<string, string> } = $props();

  const MOCK_SCIM_BASE_URL =
    'http://localhost:3000/api/scim/v2.0/7e676752-55b4-4cdc-8f45-9a82e060df12';
  const MOCK_SCIM_BEARER_TOKEN = 'lsM4BTx47bqaL70530CSJg';

  const INITIAL_TEAM_ROWS: TeamDirectoryRow[] = [
    { groupNames: [], id: '1', teamName: 'Dream Team' },
    { groupNames: [], id: '2', teamName: 'Another Team' }
  ];

  let configureOpen = $state(false);
  let scimConfigured = $state(false);
</script>

<AppHeader>
  <AppHeaderContent title="Directory sync">
    <AppHeaderDescription>
      Provision and de-provision users with your directory provider.
    </AppHeaderDescription>
  </AppHeaderContent>
</AppHeader>
<div class="flex flex-col gap-4">
  {#if !scimConfigured}
    <Card>
      <CardPanel>
        <div class="flex items-center justify-between gap-4">
          <div>
            <CardFrameDescription>
              Configure an identity provider to get started with SCIM.
            </CardFrameDescription>
          </div>
          <Button onclick={() => (configureOpen = true)} type="button">Configure</Button>
        </div>
      </CardPanel>
    </Card>
  {:else}
    <CardFrame>
      <CardFrameHeader>
        <CardFrameTitle>SCIM credentials</CardFrameTitle>
        <CardFrameDescription>
          Your Identity Provider will ask for the following information to configure SCIM. Follow
          the instructions to finish the setup.
        </CardFrameDescription>
      </CardFrameHeader>
      <Card class="rounded-b-none!">
        <CardPanel class="flex flex-col gap-6">
          <CopyableField
            aria-label="SCIM base URL"
            label="SCIM Base URL"
            value={MOCK_SCIM_BASE_URL}
          />
          <CopyableField
            aria-label="SCIM bearer token"
            label="SCIM Bearer Token"
            value={MOCK_SCIM_BEARER_TOKEN}
          />
        </CardPanel>
      </Card>
    </CardFrame>

    <CardFrame>
      <CardFrameHeader>
        <CardFrameTitle>Teams</CardFrameTitle>
        <CardFrameAction>
          <CreateTeamDialog />
        </CardFrameAction>
      </CardFrameHeader>
      <Card class="w-full rounded-b-none!">
        <CardPanel class="p-0">
          <DirectorySyncTeamMapping initialRows={INITIAL_TEAM_ROWS} />
        </CardPanel>
      </Card>
    </CardFrame>
  {/if}
</div>
<ConfigureDirectorySyncDialog
  bind:open={configureOpen}
  onConfigured={() => (scimConfigured = true)}
/>
