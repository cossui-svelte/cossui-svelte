<script lang="ts">
  import { Select, SelectItem, SelectPopup, SelectTrigger } from "$lib/components/ui/select";

  const items = [
    { description: "npx create-next-app", label: "Next.js", value: "next" },
    { description: "npm create vite@latest", label: "Vite", value: "vite" },
    { description: "npm create astro@latest", label: "Astro", value: "astro" },
    { description: "npx create-remix", label: "Remix", value: "remix" },
  ];

  let selected = $state("next");
  const selectedItem = $derived(items.find((i) => i.value === selected) ?? items[0]);
</script>

<Select value={selected} onValueChange={(v) => { selected = v; }}>
  <SelectTrigger aria-label="Select framework with command" class="py-1">
    <span class="flex flex-col">
      <span class="truncate">{selectedItem.label}</span>
      <span class="truncate text-muted-foreground text-xs">{selectedItem.description}</span>
    </span>
  </SelectTrigger>
  <SelectPopup>
    {#each items as item (item.value)}
      <SelectItem value={item.value}>
        <span class="flex flex-col">
          <span class="truncate">{item.label}</span>
          <span class="truncate text-muted-foreground text-xs">{item.description}</span>
        </span>
      </SelectItem>
    {/each}
  </SelectPopup>
</Select>
