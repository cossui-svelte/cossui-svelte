<script lang="ts">
  import { Slider } from "$lib/components/ui/slider";
</script>

<div>
  <div
    aria-hidden="true"
    class="mb-3 flex w-full items-center justify-between gap-2 font-medium text-muted-foreground text-xs"
  >
    <span>Low</span>
    <span>High</span>
  </div>
  <Slider aria-label="Intensity level from low to high" value={50} step={10} />
</div>
