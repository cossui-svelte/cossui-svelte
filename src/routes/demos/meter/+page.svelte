<script>
    import {
        Meter,
        MeterIndicator,
        MeterLabel,
        MeterTrack,
        MeterValue,
    } from "$lib/components/ui/meter";
    import ComponentPreviewTabs from "$lib/components/app/docs/component-preview-tabs.svelte";
</script>

<ComponentPreviewTabs>
    <Meter value={75}>
        <div class="flex items-center justify-between gap-2">
            <MeterLabel>Storage usage</MeterLabel>
            <MeterValue />
        </div>
        <MeterTrack>
            <MeterIndicator />
        </MeterTrack>
    </Meter>
</ComponentPreviewTabs>
