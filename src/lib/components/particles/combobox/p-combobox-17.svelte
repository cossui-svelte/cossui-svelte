<script lang="ts">
  import Search from "@lucide/svelte/icons/search";
  import {
    Combobox,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
    ComboboxPopup,
    ComboboxTrigger,
    ComboboxValue,
  } from "$lib/components/ui/combobox";
  import { selectTriggerVariants } from "$lib/components/ui/select";

  const timezones = Intl.supportedValuesOf("timeZone");

  const formattedTimezones = timezones
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

  const flatItems = formattedTimezones.map((tz) => ({ label: tz.label, value: tz.value }));

  let value = $state<string | undefined>(undefined);
  const selectedLabel = $derived(formattedTimezones.find((tz) => tz.value === value)?.label);
</script>

<Combobox autoHighlight bind:value items={flatItems}>
  <ComboboxTrigger class={selectTriggerVariants()}>
    <ComboboxValue value={selectedLabel} placeholder="Select timezone" />
  </ComboboxTrigger>
  <ComboboxPopup aria-label="Select timezone">
    <div class="border-b p-2">
      <ComboboxInput
        class="rounded-md before:rounded-[calc(var(--radius-md)-1px)]"
        placeholder="e.g. Europe/London"
        showTrigger={false}
      >
        {#snippet startAddon()}<Search />{/snippet}
      </ComboboxInput>
    </div>
    <ComboboxEmpty>No timezones found.</ComboboxEmpty>
    <ComboboxList>
      {#each formattedTimezones as tz (tz.value)}
        <ComboboxItem value={tz.value} label={tz.label}>{tz.label}</ComboboxItem>
      {/each}
    </ComboboxList>
  </ComboboxPopup>
</Combobox>
