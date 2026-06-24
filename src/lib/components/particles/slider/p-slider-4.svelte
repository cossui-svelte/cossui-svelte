<script lang="ts">
  import { Slider } from "$lib/components/ui/slider";
</script>

<div>
  <Slider aria-label="Storage size in GB" defaultValue={15} max={35} min={5} />
  <div
    aria-label="Storage size reference values"
    class="mt-4 flex w-full items-center justify-between gap-1 font-medium text-muted-foreground text-xs"
    role="group"
  >
    <span>5 GB</span>
    <span>20 GB</span>
    <span>35 GB</span>
  </div>
</div>
