<script lang="ts">
  import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
  import { Button } from '#lib/components/ui/button/index.js';
  import {
    Card,
    CardFrameDescription,
    CardFrameTitle,
    CardPanel
  } from '#lib/components/ui/card/index.js';
  import {
    AppHeader,
    AppHeaderContent,
    AppHeaderDescription
  } from '../../../components/app-header/index.js';

  let { params: _params }: { params?: Record<string, string> } = $props();
</script>

<AppHeader>
  <AppHeaderContent title="Billing">
    <AppHeaderDescription>Manage all things billing</AppHeaderDescription>
  </AppHeaderContent>
</AppHeader>
<div class="flex flex-col gap-4">
  <Card>
    <CardPanel>
      <div class="flex items-center justify-between gap-4">
        <div>
          <CardFrameTitle>Manage billing</CardFrameTitle>
          <CardFrameDescription>View and manage your billing details</CardFrameDescription>
        </div>
        <Button>
          Billing portal
          <ExternalLinkIcon aria-hidden="true" />
        </Button>
      </div>
    </CardPanel>
  </Card>

  <div class="my-2 text-center text-muted-foreground/72 text-sm">
    Need help?
    <!-- svelte-ignore a11y_invalid_attribute -->
    <a
      class="text-muted-foreground underline hover:text-foreground"
      href="#"
      onclick={(e) => e.preventDefault()}
    >
      Contact support
    </a>
  </div>
</div>
