<script lang="ts">
  import AnalyticsAppsContent from './analytics-apps-content.svelte';

  let { params: _params }: { params?: Record<string, string> } = $props();
</script>

<AnalyticsAppsContent />
