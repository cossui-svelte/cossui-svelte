<script lang="ts">
    import {
        Progress,
        ProgressIndicator,
        ProgressLabel,
        ProgressTrack,
        ProgressValue,
    } from "$lib/components/ui/progress";
</script>

<Progress value={null}>
    <div class="flex items-center justify-between gap-2">
        <ProgressLabel>Processing…</ProgressLabel>
        <ProgressValue />
    </div>
    <ProgressTrack>
        <ProgressIndicator />
    </ProgressTrack>
</Progress>
