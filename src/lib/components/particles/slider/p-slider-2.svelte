<script lang="ts">
  import { Slider } from "$lib/components/ui/slider";

  let value = $state(50);
</script>

<div>
  <div class="mb-2 flex items-center justify-between gap-1">
    <span class="font-medium text-sm">Opacity</span>
    <span class="tabular-nums text-sm">{value}</span>
  </div>
  <Slider bind:value aria-label="Opacity" />
</div>
