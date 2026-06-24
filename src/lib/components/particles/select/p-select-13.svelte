<script lang="ts">
  import { Select, SelectItem, SelectPopup, SelectTrigger } from "$lib/components/ui/select";

  interface TZItem {
    label: string;
    numericOffset: number;
    value: string;
  }

  const formattedTimezones: TZItem[] = Intl.supportedValuesOf("timeZone")
    .map((timezone) => {
      const formatter = new Intl.DateTimeFormat("en", {
        timeZone: timezone,
        timeZoneName: "shortOffset",
      });
      const parts = formatter.formatToParts(new Date());
      const offset = parts.find((part) => part.type === "timeZoneName")?.value || "";
      const modifiedOffset = offset === "GMT" ? "GMT+0" : offset;
      const offsetMatch = offset.match(/GMT([+-]?)(\d+)(?::(\d+))?/);
      const sign = offsetMatch?.[1] === "-" ? -1 : 1;
      const hours = Number.parseInt(offsetMatch?.[2] || "0", 10);
      const minutes = Number.parseInt(offsetMatch?.[3] || "0", 10);
      const totalMinutes = sign * (hours * 60 + minutes);
      return {
        label: `(${modifiedOffset}) ${timezone.replace(/_/g, " ")}`,
        numericOffset: totalMinutes,
        value: timezone,
      };
    })
    .sort((a, b) => a.numericOffset - b.numericOffset);

  let selected = $state("Europe/London");
  const selectedItem = $derived(formattedTimezones.find((tz) => tz.value === selected));
</script>

<Select aria-label="Select timezone" value={selected} onValueChange={(v) => { selected = v; }}>
  <SelectTrigger>
    <span class="flex-1 truncate">{selectedItem?.label ?? selected}</span>
  </SelectTrigger>
  <SelectPopup>
    {#each formattedTimezones as item (item.value)}
      <SelectItem value={item.value}>{item.label}</SelectItem>
    {/each}
  </SelectPopup>
</Select>
