<script lang="ts">
  import { Button } from '#lib/components/ui/button/index.js';
  import { Card, CardFrame, CardFrameFooter, CardPanel } from '#lib/components/ui/card/index.js';
  import {
    AppHeader,
    AppHeaderContent,
    AppHeaderDescription
  } from '../../../../../components/app-header/index.js';
  import { DangerZone } from '../../../../../components/particles/index.js';
  import TeamProfileFields from './team-profile-form.svelte';

  let { params: _params }: { params?: Record<string, string> } = $props();
</script>

<AppHeader>
  <AppHeaderContent title="Profile">
    <AppHeaderDescription>Manage settings for your team profile</AppHeaderDescription>
  </AppHeaderContent>
</AppHeader>
<div class="flex flex-col gap-4">
  <CardFrame>
    <Card class="rounded-b-none!">
      <CardPanel>
        <TeamProfileFields />
      </CardPanel>
    </Card>

    <CardFrameFooter class="flex justify-end">
      <Button>Update</Button>
    </CardFrameFooter>
  </CardFrame>

  <DangerZone
    buttonLabel="Disband team"
    description="Be careful. Team deletion cannot be undone."
  />
</div>
