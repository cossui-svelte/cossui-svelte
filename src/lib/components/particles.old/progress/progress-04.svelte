<script lang="ts">
    import {
        Progress,
        ProgressIndicator,
        ProgressLabel,
        ProgressTrack,
        ProgressValue,
    } from "$lib/components/ui/progress";
</script>

<Progress value={40}>
    <div class="flex items-center justify-between gap-2">
        <ProgressLabel>Storage usage</ProgressLabel>
        <ProgressValue />
    </div>
    <ProgressTrack class="h-3">
        <ProgressIndicator />
    </ProgressTrack>
</Progress>
