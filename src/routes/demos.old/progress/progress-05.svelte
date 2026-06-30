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

<div class="flex flex-col gap-3">
    <Progress {value}>
        <div class="flex items-center justify-between gap-2">
            <ProgressLabel>Interactive</ProgressLabel>
            <ProgressValue />
        </div>
        <ProgressTrack>
            <ProgressIndicator />
        </ProgressTrack>
    </Progress>
    <input
        type="range"
        min="0"
        max="100"
        bind:value
        class="w-full accent-primary"
    />
</div>
