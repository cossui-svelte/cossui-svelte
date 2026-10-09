<script lang="ts">
  import {
    AppHeader,
    AppHeaderContent,
    AppHeaderDescription
  } from '../../../../components/app-header/index.js';
  import ComplianceDocuments from './compliance-documents.svelte';

  let { params: _params }: { params?: Record<string, string> } = $props();
</script>

<AppHeader>
  <AppHeaderContent title="Compliance">
    <AppHeaderDescription>Download and manage your compliance documents</AppHeaderDescription>
  </AppHeaderContent>
</AppHeader>
<ComplianceDocuments />
