<script lang="ts">
  import { Badge } from '#lib/components/ui/badge/index.js';
  import { Button } from '#lib/components/ui/button/index.js';
  import {
    Card,
    CardFrameDescription,
    CardFrameHeader,
    CardFrameTitle,
    CardPanel
  } from '#lib/components/ui/card/index.js';
  import Disable2FADialog from './disable-2fa-dialog.svelte';
  import Enable2FADialog from './enable-2fa-dialog.svelte';

  let enableDialogOpen = $state(false);
  let disableDialogOpen = $state(false);
  let enabled = $state(false);
</script>

<Card>
  <CardPanel>
    <div class="flex items-center justify-between gap-4">
      <CardFrameHeader class="p-0">
        <div class="flex flex-wrap items-center gap-2">
          <CardFrameTitle>Two factor authentication</CardFrameTitle>
          <Badge variant={enabled ? 'success' : 'warning'}>
            {enabled ? 'Enabled' : 'Disabled'}
          </Badge>
        </div>
        <CardFrameDescription>
          Add an extra layer of security to your account in case your password is stolen.
        </CardFrameDescription>
      </CardFrameHeader>
      {#if enabled}
        <Button onclick={() => (disableDialogOpen = true)} variant="outline">Disable</Button>
      {:else}
        <Button onclick={() => (enableDialogOpen = true)}>Enable</Button>
      {/if}
    </div>

    <Enable2FADialog bind:open={enableDialogOpen} onEnabled={() => (enabled = true)} />

    <Disable2FADialog bind:open={disableDialogOpen} onDisabled={() => (enabled = false)} />
  </CardPanel>
</Card>
