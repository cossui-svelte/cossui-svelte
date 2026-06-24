<script lang="ts">
  import {
    Progress,
    ProgressIndicator,
    ProgressLabel,
    ProgressTrack,
    ProgressValue,
  } from "$lib/components/ui/progress";
</script>

<Progress value={60}>
  <div class="flex items-center justify-between gap-2">
    <ProgressLabel>Export data</ProgressLabel>
    <ProgressValue />
  </div>
  <ProgressTrack>
    <ProgressIndicator />
  </ProgressTrack>
</Progress>
