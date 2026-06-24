<script lang="ts">
  import { Select, SelectItem, SelectPopup, SelectTrigger } from "$lib/components/ui/select";

  const items = [
    { disabled: false, label: "Next.js", value: "next" },
    { disabled: false, label: "Vite", value: "vite" },
    { disabled: true, label: "Astro (coming soon)", value: "astro" },
    { disabled: true, label: "Remix (coming soon)", value: "remix" },
    { disabled: false, label: "Nuxt", value: "nuxt" },
  ];

  let selected = $state("next");
  const selectedLabel = $derived(items.find((i) => i.value === selected)?.label ?? "");
</script>

<Select aria-label="Select framework" value={selected} onValueChange={(v) => { selected = v; }}>
  <SelectTrigger>
    <span class="flex-1 truncate">{selectedLabel}</span>
  </SelectTrigger>
  <SelectPopup>
    {#each items as { disabled, label, value } (value)}
      <SelectItem {disabled} {value}>{label}</SelectItem>
    {/each}
  </SelectPopup>
</Select>
