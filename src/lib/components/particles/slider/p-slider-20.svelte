<script lang="ts">
  import { Slider } from "$lib/components/ui/slider";

  const bands = [
    { label: "60 Hz", value: 2 },
    { label: "250 Hz", value: 1 },
    { label: "1k", value: -1 },
    { label: "4k", value: -3 },
    { label: "16k", value: 2 },
  ];
</script>

<div class="flex h-48 justify-center gap-8">
  {#each bands as band (band.label)}
    <Slider
      aria-label={band.label}
      value={band.value}
      max={5}
      min={-5}
      orientation="vertical"
    />
  {/each}
</div>
