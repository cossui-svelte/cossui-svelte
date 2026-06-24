<script lang="ts">
  import { ScrollArea } from "$lib/components/ui/scroll-area";

  const tags = Array.from({ length: 50 }, (_, i) => `v1.0.0-alpha.${i}`);
</script>

<ScrollArea class="h-64 rounded-lg border" scrollFade>
  <div class="px-4 py-2">
    <h4 class="mb-2 font-medium text-sm">Tags</h4>
    <div class="flex flex-col gap-1">
      {#each tags as tag (tag)}
        <div class="text-sm">{tag}</div>
      {/each}
    </div>
  </div>
</ScrollArea>
