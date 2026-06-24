<script lang="ts">
  import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "$lib/components/ui/select";

  const items = [
    { label: "Next.js", value: "next" },
    { label: "Vite", value: "vite" },
    { label: "Astro", value: "astro" },
  ];
</script>

<Select aria-label="Select framework">
  <SelectTrigger>
    <SelectValue placeholder="Select framework" />
  </SelectTrigger>
  <SelectPopup>
    {#each items as { label, value } (value)}
      <SelectItem {value}>{label}</SelectItem>
    {/each}
  </SelectPopup>
</Select>
