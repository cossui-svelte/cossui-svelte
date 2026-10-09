<script lang="ts">
  import { Card, CardFrame, CardPanel } from '#lib/components/ui/card/index.js';
  import {
    AppHeader,
    AppHeaderContent,
    AppHeaderDescription
  } from '../../../../components/app-header/index.js';
  import AutoOptInToggle from './auto-opt-in-toggle.svelte';
  import FeaturesList from './features-list.svelte';

  let { params: _params }: { params?: Record<string, string> } = $props();
</script>

<AppHeader>
  <AppHeaderContent title="Features">
    <AppHeaderDescription>Manage experimental features for your account</AppHeaderDescription>
  </AppHeaderContent>
</AppHeader>
<div class="flex flex-col gap-4">
  <CardFrame>
    <Card>
      <CardPanel>
        <FeaturesList />
      </CardPanel>
    </Card>
  </CardFrame>

  <AutoOptInToggle />
</div>
