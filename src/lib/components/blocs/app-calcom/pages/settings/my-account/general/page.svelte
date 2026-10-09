<script lang="ts">
  import { Button } from '#lib/components/ui/button/index.js';
  import { Card, CardFrame, CardFrameFooter, CardPanel } from '#lib/components/ui/card/index.js';
  import {
    AppHeader,
    AppHeaderContent,
    AppHeaderDescription
  } from '../../../../components/app-header/index.js';
  import { SettingsToggle } from '../../../../components/particles/index.js';
  import GeneralSettingsFields from './general-settings-form.svelte';

  let { params: _params }: { params?: Record<string, string> } = $props();
</script>

<AppHeader>
  <AppHeaderContent title="General">
    <AppHeaderDescription>Manage settings for your language and timezone</AppHeaderDescription>
  </AppHeaderContent>
</AppHeader>
<div class="flex flex-col gap-4">
  <CardFrame>
    <Card class="rounded-b-none!">
      <CardPanel>
        <GeneralSettingsFields />
      </CardPanel>
    </Card>

    <CardFrameFooter class="flex justify-end">
      <Button>Update</Button>
    </CardFrameFooter>
  </CardFrame>

  <SettingsToggle
    checked
    description="Allow attendees to book you through dynamic group bookings"
    title="Dynamic group links"
  />

  <SettingsToggle
    checked
    description="Allow search engines to access your public content"
    title="Allow search engine indexing"
  />

  <SettingsToggle
    checked
    description="Monthly digest email for teams"
    title="Monthly digest email"
  />

  <SettingsToggle
    description="When enabled, anyone trying to book events using your email address must verify they own it via a one time code or be logged in to prevent impersonation"
    title="Prevent impersonation on bookings"
  />
</div>
