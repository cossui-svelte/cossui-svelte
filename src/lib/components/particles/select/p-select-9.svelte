<script lang="ts">
  import Code2Icon from "@lucide/svelte/icons/code-2";
  import GlobeIcon from "@lucide/svelte/icons/globe";
  import LayersIcon from "@lucide/svelte/icons/layers";
  import ZapIcon from "@lucide/svelte/icons/zap";
  import { Select, SelectItem, SelectPopup, SelectTrigger } from "$lib/components/ui/select";

  const items = [
    { icon: LayersIcon, label: "Components", value: "components" },
    { icon: ZapIcon, label: "Performance", value: "performance" },
    { icon: GlobeIcon, label: "Network", value: "network" },
    { icon: Code2Icon, label: "Development", value: "development" },
  ];

  let selected = $state("components");
  const selectedItem = $derived(items.find((i) => i.value === selected) ?? items[0]);
</script>

<Select aria-label="Select category" value={selected} onValueChange={(v) => { selected = v; }}>
  <SelectTrigger>
    <span class="flex items-center gap-2">
      <svelte:component this={selectedItem.icon} />
      <span class="truncate">{selectedItem.label}</span>
    </span>
  </SelectTrigger>
  <SelectPopup>
    {#each items as item (item.value)}
      <SelectItem value={item.value}>
        <span class="flex items-center gap-2">
          <svelte:component this={item.icon} />
          <span class="truncate">{item.label}</span>
        </span>
      </SelectItem>
    {/each}
  </SelectPopup>
</Select>
