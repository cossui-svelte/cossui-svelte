<script lang="ts">
  import { Slider } from "$lib/components/ui/slider";
  import { cn } from "$lib/utils";

  const max = 12;
  const skipInterval = 2;
  const ticks = Array.from({ length: max + 1 }, (_, i) => i);
</script>

<div>
  <Slider aria-label="Value selector" defaultValue={5} {max} />
  <div
    aria-label="Value scale from 0 to 12"
    class="mt-3 flex w-full items-center justify-between gap-1 px-2.5 font-medium text-muted-foreground text-xs"
    role="group"
  >
    {#each ticks as i (i)}
      <span class="flex w-0 flex-col items-center justify-center gap-2">
        <span class={cn("h-1 w-px bg-muted-foreground/72", i % skipInterval !== 0 && "h-0.5")} />
        <span class={cn(i % skipInterval !== 0 && "opacity-0")}>{i}</span>
      </span>
    {/each}
  </div>
</div>
