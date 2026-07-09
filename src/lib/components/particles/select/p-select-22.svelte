<script lang="ts">
  import { Select, SelectItem, SelectPopup, SelectTrigger } from "$lib/components/ui/select";

  const items = [
    { label: "Next.js", value: "next" },
    { label: "Vite", value: "vite" },
    { label: "Astro", value: "astro" },
  ];

  let selected = $state("next");
  const selectedLabel = $derived(items.find((i) => i.value === selected)?.label ?? "");
</script>

<Select value={selected} onValueChange={(v) => { selected = v; }}>
  <SelectTrigger aria-label="Select framework" class="border-transparent bg-muted shadow-none before:hidden">
    <span class="flex-1 truncate">{selectedLabel}</span>
  </SelectTrigger>
  <SelectPopup>
    {#each items as { label, value } (value)}
      <SelectItem {value}>{label}</SelectItem>
    {/each}
  </SelectPopup>
</Select>
