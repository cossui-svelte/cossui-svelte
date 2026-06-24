<script lang="ts">
  import { ScrollArea } from "$lib/components/ui/scroll-area";

  const items = Array.from({ length: 20 }, (_, i) => i);
</script>

<ScrollArea class="max-w-96 rounded-lg border" scrollbarGutter>
  <div class="flex w-max gap-4 p-4">
    {#each items as i (i)}
      <div class="flex h-20 w-32 shrink-0 items-center justify-center rounded-md bg-muted">
        <span class="font-medium text-sm">Item {i + 1}</span>
      </div>
    {/each}
  </div>
</ScrollArea>
