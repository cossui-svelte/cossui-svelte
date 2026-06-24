<script lang="ts">
  import MinusIcon from "@lucide/svelte/icons/minus";
  import PlusIcon from "@lucide/svelte/icons/plus";
  import { Button } from "$lib/components/ui/button";
  import { Slider } from "$lib/components/ui/slider";

  const min = 0;
  const max = 200;
  const step = 5;

  let value = $state(100);
</script>

<div class="flex flex-col gap-1.5">
  <span class="tabular-nums text-sm font-medium">{value} credits/mo</span>
  <div class="flex items-center gap-2">
    <Button
      aria-label="Decrease value"
      disabled={value === min}
      onclick={() => { value = Math.max(min, value - step); }}
      size="icon"
      variant="outline"
    >
      <MinusIcon aria-hidden="true" />
    </Button>
    <Slider
      aria-label="Credits slider"
      class="flex-1"
      {max}
      {min}
      {step}
      bind:value
    />
    <Button
      aria-label="Increase value"
      disabled={value === max}
      onclick={() => { value = Math.min(max, value + step); }}
      size="icon"
      variant="outline"
    >
      <PlusIcon aria-hidden="true" />
    </Button>
  </div>
</div>
