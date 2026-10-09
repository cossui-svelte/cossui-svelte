<script lang="ts">
  import { Card, CardFrame, CardPanel } from '#lib/components/ui/card/index.js';
  import {
    AppHeader,
    AppHeaderContent,
    AppHeaderDescription
  } from '../../../../../../components/app-header/index.js';
  import CopyLink from './copy-link.svelte';

  let { params: _params }: { params?: Record<string, string> } = $props();
</script>

<AppHeader>
  <AppHeaderContent title="Profile">
    <AppHeaderDescription>Manage settings for your team profile</AppHeaderDescription>
  </AppHeaderContent>
</AppHeader>
<CardFrame>
  <Card>
    <CardPanel>
      <div class="flex flex-col gap-6">
        <div>
          <p class="font-semibold text-sm">Organization name</p>
          <p class="text-muted-foreground text-sm">Cal.com</p>
        </div>

        <div>
          <p class="font-semibold text-sm">Organization URL</p>
          <div class="flex items-center gap-1">
            <p class="text-muted-foreground text-sm">https://cal.com/org/cal-com</p>
            <CopyLink />
          </div>
        </div>

        <div>
          <p class="font-semibold text-sm">About</p>
          <p class="text-muted-foreground text-sm">Makers of time.</p>
        </div>
      </div>
    </CardPanel>
  </Card>
</CardFrame>
