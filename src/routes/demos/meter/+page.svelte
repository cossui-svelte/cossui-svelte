<script>
    import {
        Meter,
        MeterIndicator,
        MeterLabel,
        MeterTrack,
        MeterValue,
    } from "$lib/components/ui/meter";
</script>

<Meter value={75}>
    <div class="flex items-center justify-between gap-2">
        <MeterLabel>Storage usage</MeterLabel>
        <MeterValue />
    </div>
    <MeterTrack>
        <MeterIndicator />
    </MeterTrack>
</Meter>
