<script lang="ts">
  import { Select, SelectItem, SelectPopup, SelectTrigger } from "$lib/components/ui/select";

  const items = [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Orange", value: "orange" },
  ];

  let selected = $state("apple");
  const selectedLabel = $derived(items.find((i) => i.value === selected)?.label ?? "");
</script>

<div class="flex flex-col gap-1.5">
  <span class="text-sm font-medium">Fruits</span>
  <Select value={selected} onValueChange={(v) => { selected = v; }}>
    <SelectTrigger aria-label="Select fruit">
      <span class="flex-1 truncate">{selectedLabel}</span>
    </SelectTrigger>
    <SelectPopup>
      {#each items as item (item.value)}
        <SelectItem value={item.value}>{item.label}</SelectItem>
      {/each}
    </SelectPopup>
  </Select>
</div>
