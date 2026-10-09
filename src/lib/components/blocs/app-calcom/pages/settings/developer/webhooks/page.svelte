<script lang="ts">
  import {
    AppHeader,
    AppHeaderContent,
    AppHeaderDescription
  } from '../../../../components/app-header/index.js';
  import WebhooksEmpty from './webhooks-empty.svelte';

  let { params: _params }: { params?: Record<string, string> } = $props();

  const webhooks: { id: string; url: string; events: string }[] = [];
</script>

<AppHeader>
  <AppHeaderContent title="Webhooks">
    <AppHeaderDescription>
      Receive meeting data in real-time when something happens in Cal.com.
    </AppHeaderDescription>
  </AppHeaderContent>
</AppHeader>
<WebhooksEmpty {webhooks} />
