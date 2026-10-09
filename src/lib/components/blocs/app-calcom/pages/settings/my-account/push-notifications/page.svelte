<script lang="ts">
  import {
    AppHeader,
    AppHeaderContent,
    AppHeaderDescription
  } from '../../../../components/app-header/index.js';
  import { SettingsToggle } from '../../../../components/particles/index.js';

  let { params: _params }: { params?: Record<string, string> } = $props();
</script>

<AppHeader>
  <AppHeaderContent title="Push notifications">
    <AppHeaderDescription>
      Receive push notifications when booker submits instant meeting booking.
    </AppHeaderDescription>
  </AppHeaderContent>
</AppHeader>
<SettingsToggle description="Allow browser notifications" title="Enable push notifications" />
