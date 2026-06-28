<script lang="ts">
    import {
        Progress,
        ProgressIndicator,
        ProgressLabel,
        ProgressTrack,
        ProgressValue,
    } from "$lib/components/ui/progress";

    let value = $state(60);
</script>

<Progress {value}>
    <div class="flex items-center justify-between gap-2">
        <ProgressLabel>Uploading files</ProgressLabel>
        <ProgressValue />
    </div>
    <ProgressTrack>
        <ProgressIndicator />
    </ProgressTrack>
</Progress>
