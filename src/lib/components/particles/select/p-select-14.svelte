<script lang="ts">
  import { Select, SelectItem, SelectPopup, SelectTrigger } from "$lib/components/ui/select";

  const items = [
    { color: "bg-emerald-500", label: "Completed", value: "completed" },
    { color: "bg-blue-500", label: "In Progress", value: "in-progress" },
    { color: "bg-amber-500", label: "Pending", value: "pending" },
    { color: "bg-gray-500", label: "Cancelled", value: "cancelled" },
    { color: "bg-red-500", label: "Failed", value: "failed" },
  ];

  let selected = $state("completed");
  const selectedItem = $derived(items.find((i) => i.value === selected) ?? items[0]);
</script>

<Select aria-label="Select status" value={selected} onValueChange={(v) => { selected = v; }}>
  <SelectTrigger>
    <span class="flex items-center gap-2">
      <span aria-hidden="true" class={`size-2 rounded-full ${selectedItem.color}`}></span>
      <span class="truncate">{selectedItem.label}</span>
    </span>
  </SelectTrigger>
  <SelectPopup>
    {#each items as item (item.value)}
      <SelectItem value={item.value}>
        <span class="flex items-center gap-2">
          <span aria-hidden="true" class={`size-2 rounded-full ${item.color}`}></span>
          <span class="truncate">{item.label}</span>
        </span>
      </SelectItem>
    {/each}
  </SelectPopup>
</Select>
