<script lang="ts">
  import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
  import { Button } from '#lib/components/ui/button/index.js';
  import {
    AppHeader,
    AppHeaderActions,
    AppHeaderContent,
    AppHeaderDescription
  } from '../../../../components/app-header/index.js';
  import type { WebhookItem } from './webhooks-list-content.svelte';
  import WebhooksListContent from './webhooks-list-content.svelte';

  let { webhooks }: { webhooks: WebhookItem[] } = $props();

  const selectedUserIds: string[] = [];
</script>

<AppHeader>
  <AppHeaderContent title="Webhooks">
    <AppHeaderDescription>
      Receive meeting data in real-time when something happens in Cal.com.
    </AppHeaderDescription>
  </AppHeaderContent>
  <AppHeaderActions>
    <Button variant="outline">
      New
      <ChevronDownIcon />
    </Button>
  </AppHeaderActions>
</AppHeader>
<WebhooksListContent {selectedUserIds} {webhooks} />
