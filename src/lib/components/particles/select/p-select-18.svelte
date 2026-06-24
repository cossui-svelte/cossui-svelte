<script lang="ts">
  import { Select, SelectItem, SelectPopup, SelectTrigger } from "$lib/components/ui/select";

  const items = [
    { description: "Ideal for individuals", label: "Standard Plan", value: "standard" },
    { description: "For professional users", label: "Pro Plan", value: "pro" },
    { description: "Built for large teams", label: "Enterprise Plan", value: "enterprise" },
  ];

  let selected = $state("pro");
  const selectedItem = $derived(items.find((i) => i.value === selected) ?? items[1]);
</script>

<Select aria-label="Select plan" value={selected} onValueChange={(v) => { selected = v; }}>
  <SelectTrigger>
    <span class="flex-1 truncate">{selectedItem.label}</span>
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
