<script lang="ts">
  import {
    AppHeader,
    AppHeaderContent,
    AppHeaderDescription
  } from '../../../../components/app-header/index.js';
  import FlagAdminList from './flag-admin-list.svelte';

  let { params: _params }: { params?: Record<string, string> } = $props();
</script>

<AppHeader>
  <AppHeaderContent title="Feature flags">
    <AppHeaderDescription
      >Manage killswitches and feature flags for your instance</AppHeaderDescription
    >
  </AppHeaderContent>
</AppHeader>
<FlagAdminList />
