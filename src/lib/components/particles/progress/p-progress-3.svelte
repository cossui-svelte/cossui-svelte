<script lang="ts">
  import {
    Progress,
    ProgressIndicator,
    ProgressLabel,
    ProgressTrack,
  } from "$lib/components/ui/progress";

  const value = 502;
  const max = 512;
</script>

<Progress {max} {value}>
  <div class="flex items-center justify-between gap-2">
    <ProgressLabel>Upload</ProgressLabel>
    <span class="text-foreground text-sm tabular-nums">{value} / {max}</span>
  </div>
  <ProgressTrack>
    <ProgressIndicator />
  </ProgressTrack>
</Progress>
