<script lang="ts">
  import Volume2Icon from "@lucide/svelte/icons/volume-2";
  import VolumeXIcon from "@lucide/svelte/icons/volume-x";
  import { Slider } from "$lib/components/ui/slider";

  let value = $state(25);
</script>

<div class="grid grid-cols-[auto_1fr_auto] items-center gap-x-2">
  <div class="col-span-3 mb-2 flex items-center justify-between gap-1">
    <span class="font-medium text-sm">Volume</span>
    <span class="tabular-nums text-sm">{value}</span>
  </div>
  <VolumeXIcon aria-hidden="true" class="size-4 shrink-0 opacity-80" />
  <Slider aria-label="Volume slider" bind:value />
  <Volume2Icon aria-hidden="true" class="size-4 shrink-0 opacity-80" />
</div>
