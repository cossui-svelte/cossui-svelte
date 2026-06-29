<script lang="ts">
  import { Meter, MeterIndicator, MeterLabel, MeterTrack } from '$lib/components/ui/meter';
</script>

<Meter max={1000} min={500} value={700}>
  <div class="flex items-center justify-between gap-2">
    <MeterLabel>Bandwidth (Mbps)</MeterLabel>
    <span class="text-foreground text-sm tabular-nums" data-slot="meter-value">700</span>
  </div>
  <MeterTrack>
    <MeterIndicator />
  </MeterTrack>
</Meter>
