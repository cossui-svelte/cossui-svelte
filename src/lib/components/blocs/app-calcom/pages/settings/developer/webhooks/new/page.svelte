<script lang="ts">
  import ActivityIcon from '@lucide/svelte/icons/activity';
  import { Button } from '#lib/components/ui/button/index.js';
  import {
    Card,
    CardFrame,
    CardFrameDescription,
    CardFrameFooter,
    CardFrameHeader,
    CardFrameTitle,
    CardPanel
  } from '#lib/components/ui/card/index.js';
  import {
    AppHeader,
    AppHeaderContent,
    AppHeaderDescription
  } from '../../../../../components/app-header/index.js';
  import { href } from '../../../../../lib/router.svelte.js';
  import NewWebhookFormFields from './new-webhook-form-fields.svelte';
  import WebhookTestSection from './webhook-test-section.svelte';

  let { params: _params }: { params?: Record<string, string> } = $props();
</script>

<AppHeader>
  <AppHeaderContent title="New webhook">
    <AppHeaderDescription>
      Receive meeting data in real-time when something happens in Cal.com.
    </AppHeaderDescription>
  </AppHeaderContent>
</AppHeader>
<div class="flex flex-col gap-4">
  <CardFrame>
    <Card class="rounded-b-none!">
      <CardPanel>
        <NewWebhookFormFields />
      </CardPanel>
    </Card>
    <CardFrameFooter class="flex justify-end gap-2">
      <Button href={href('/settings/developer/webhooks')} variant="outline">Cancel</Button>
      <Button>Save</Button>
    </CardFrameFooter>
  </CardFrame>

  <CardFrame>
    <CardFrameHeader>
      <div class="flex items-center justify-between gap-4">
        <div>
          <CardFrameTitle>Webhook test</CardFrameTitle>
          <CardFrameDescription>Please ping test before creating.</CardFrameDescription>
        </div>
        <Button size="sm" variant="outline">
          <ActivityIcon />
          Ping test
        </Button>
      </div>
    </CardFrameHeader>
    <Card>
      <CardPanel>
        <WebhookTestSection />
      </CardPanel>
    </Card>
  </CardFrame>
</div>
