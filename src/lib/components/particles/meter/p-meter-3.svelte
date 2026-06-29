<script lang="ts">
  import { Meter, MeterIndicator, MeterLabel, MeterTrack } from '$lib/components/ui/meter';
</script>

<Meter max={5} value={3}>
  <div class="flex items-center justify-between gap-2">
    <MeterLabel>Rating</MeterLabel>
    <span class="text-foreground text-sm tabular-nums" data-slot="meter-value">3 / 5</span>
  </div>
  <MeterTrack>
    <MeterIndicator />
  </MeterTrack>
</Meter>
