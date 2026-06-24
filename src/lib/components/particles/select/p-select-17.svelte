<script lang="ts">
  import { Select, SelectGroup, SelectGroupLabel, SelectItem, SelectPopup, SelectSeparator, SelectTrigger } from "$lib/components/ui/select";

  const countries = [
    {
      continent: "America",
      items: [
        { flag: "🇺🇸", label: "United States", value: "us" },
        { flag: "🇨🇦", label: "Canada", value: "ca" },
        { flag: "🇲🇽", label: "Mexico", value: "mx" },
      ],
    },
    {
      continent: "Europe",
      items: [
        { flag: "🇬🇧", label: "United Kingdom", value: "gb" },
        { flag: "🇫🇷", label: "France", value: "fr" },
        { flag: "🇩🇪", label: "Germany", value: "de" },
      ],
    },
    {
      continent: "Asia",
      items: [
        { flag: "🇨🇳", label: "China", value: "cn" },
        { flag: "🇯🇵", label: "Japan", value: "jp" },
        { flag: "🇮🇳", label: "India", value: "in" },
      ],
    },
  ];

  const allItems = countries.flatMap((c) => c.items);

  let selected = $state("ca");
  const selectedItem = $derived(allItems.find((i) => i.value === selected) ?? allItems[0]);
</script>

<Select aria-label="Select country" value={selected} onValueChange={(v) => { selected = v; }}>
  <SelectTrigger>
    <span class="flex items-center gap-2">
      <span class="text-base leading-none">{selectedItem.flag}</span>
      <span class="truncate">{selectedItem.label}</span>
    </span>
  </SelectTrigger>
  <SelectPopup>
    {#each countries as group, index (group.continent)}
      <SelectGroup>
        {#if index > 0}
          <SelectSeparator />
        {/if}
        <SelectGroupLabel>{group.continent}</SelectGroupLabel>
        {#each group.items as item (item.value)}
          <SelectItem value={item.value}>
            <span class="flex items-center gap-2">
              <span class="text-base leading-none">{item.flag}</span>
              <span class="truncate">{item.label}</span>
            </span>
          </SelectItem>
        {/each}
      </SelectGroup>
    {/each}
  </SelectPopup>
</Select>
