<script>
    import ComponentPreviewTabs from "$lib/components/app/component-preview-tabs.svelte";
    import {
        Progress,
        ProgressIndicator,
        ProgressLabel,
        ProgressTrack,
        ProgressValue,
    } from "$lib/components/ui/progress";

    let value = $state(60);
</script>

<!-- Simple progress bar -->
<ComponentPreviewTabs>
    <Progress value={60} />
</ComponentPreviewTabs>

<!-- With label and value -->
<ComponentPreviewTabs>
    <Progress {value}>
        <div class="flex items-center justify-between gap-2">
            <ProgressLabel>Uploading files</ProgressLabel>
            <ProgressValue />
        </div>
        <ProgressTrack>
            <ProgressIndicator />
        </ProgressTrack>
    </Progress>
</ComponentPreviewTabs>

<!-- Indeterminate -->
<ComponentPreviewTabs>
    <Progress value={null}>
        <div class="flex items-center justify-between gap-2">
            <ProgressLabel>Processing…</ProgressLabel>
            <ProgressValue />
        </div>
        <ProgressTrack>
            <ProgressIndicator />
        </ProgressTrack>
    </Progress>
</ComponentPreviewTabs>

<!-- Thicker track -->
<ComponentPreviewTabs>
    <Progress value={40}>
        <div class="flex items-center justify-between gap-2">
            <ProgressLabel>Storage usage</ProgressLabel>
            <ProgressValue />
        </div>
        <ProgressTrack class="h-3">
            <ProgressIndicator />
        </ProgressTrack>
    </Progress>
</ComponentPreviewTabs>

<!-- Interactive slider -->
<ComponentPreviewTabs>
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
</ComponentPreviewTabs>
