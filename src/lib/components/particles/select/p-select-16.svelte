<script lang="ts">
  import { Select, SelectItem, SelectPopup, SelectTrigger } from "$lib/components/ui/select";

  const items = [
    { label: "JavaScript", value: "javascript" },
    { label: "TypeScript", value: "typescript" },
    { label: "Python", value: "python" },
    { label: "Go", value: "go" },
  ];

  let selected = $state("javascript");
  const selectedLabel = $derived(items.find((i) => i.value === selected)?.label ?? "");
</script>

<Select value={selected} onValueChange={(v) => { selected = v; }}>
  <SelectTrigger aria-label="Select language">
    <span>
      <span class="text-muted-foreground">Language:</span>
      {selectedLabel}
    </span>
  </SelectTrigger>
  <SelectPopup>
    {#each items as item (item.value)}
      <SelectItem value={item.value}>{item.label}</SelectItem>
    {/each}
  </SelectPopup>
</Select>
