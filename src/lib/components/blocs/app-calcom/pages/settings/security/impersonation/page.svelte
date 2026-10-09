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
  <AppHeaderContent title="Impersonation">
    <AppHeaderDescription>Settings to manage user impersonation</AppHeaderDescription>
  </AppHeaderContent>
</AppHeader>
<SettingsToggle
  description="Allows our support team to temporarily sign in as you to help us quickly resolve any issues you report to us."
  title="User impersonation"
/>
