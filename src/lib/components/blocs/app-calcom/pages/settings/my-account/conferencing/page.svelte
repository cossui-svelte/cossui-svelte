<script lang="ts">
  import PlusIcon from '@lucide/svelte/icons/plus';
  import { Button } from '#lib/components/ui/button/index.js';
  import { Card, CardPanel } from '#lib/components/ui/card/index.js';
  import {
    AppHeader,
    AppHeaderActions,
    AppHeaderContent,
    AppHeaderDescription
  } from '../../../../components/app-header/index.js';
  import ConferencingEmpty, {
    type ConferencingApp,
    initialConferencingApps
  } from './conferencing-empty.svelte';

  let { params: _params }: { params?: Record<string, string> } = $props();

  let apps = $state<ConferencingApp[]>(initialConferencingApps);
</script>

<AppHeader>
  <AppHeaderContent title="Conferencing">
    <AppHeaderDescription>
      Add your favourite video conferencing apps for your meetings
    </AppHeaderDescription>
  </AppHeaderContent>
  <AppHeaderActions>
    <Button variant="outline">
      <PlusIcon />
      Add
    </Button>
  </AppHeaderActions>
</AppHeader>

{#if apps.length > 0}
  <Card>
    <CardPanel class="p-0">
      <ConferencingEmpty {apps} onAppsChange={(next) => (apps = next)} />
    </CardPanel>
  </Card>
{:else}
  <ConferencingEmpty {apps} onAppsChange={(next) => (apps = next)} />
{/if}
