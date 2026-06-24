<script lang="ts">
  import { Slider } from "$lib/components/ui/slider";

  const labels = ["Awful", "Poor", "Okay", "Good", "Amazing"];

  let value = $state(3);
</script>

<div class="grid grid-cols-[auto_1fr_auto] items-center gap-x-2">
  <div class="col-span-3 mb-2 flex items-center justify-between gap-1">
    <span class="font-medium text-sm">Rate your experience</span>
    <span class="text-sm">{labels[value - 1]}</span>
  </div>
  <span aria-hidden="true" class="text-2xl">😡</span>
  <Slider aria-label="Rate your experience" max={5} min={1} bind:value />
  <span aria-hidden="true" class="order-1 text-2xl">😍</span>
</div>
