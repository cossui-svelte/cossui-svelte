<script lang="ts">
  import {
    AppHeader,
    AppHeaderContent,
    AppHeaderDescription
  } from '../../../../components/app-header/index.js';
  import TwoFactorAuthSection from './two-factor-auth-section.svelte';

  let { params: _params }: { params?: Record<string, string> } = $props();
</script>

<AppHeader>
  <AppHeaderContent title="Two-factor authentication">
    <AppHeaderDescription>Set up your two-factor authentication.</AppHeaderDescription>
  </AppHeaderContent>
</AppHeader>
<TwoFactorAuthSection />
