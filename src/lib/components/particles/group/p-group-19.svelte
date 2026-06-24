<script lang="ts">
  import { Group, GroupSeparator } from "$lib/components/ui/group";
  import { Input } from "$lib/components/ui/input";
  import {
    Select,
    SelectItem,
    SelectPopup,
    SelectTrigger,
    SelectValue,
  } from "$lib/components/ui/select";

  const domains = [
    { label: ".com", value: "com" },
    { label: ".org", value: "org" },
    { label: ".net", value: "net" },
  ];

  let domain = $state("com");
</script>

<Group aria-label="Domain input">
  <Input aria-label="Domain name" placeholder="example" type="text" />
  <GroupSeparator />
  <Select bind:value={domain}>
    <SelectTrigger class="w-fit min-w-none">
      <SelectValue />
    </SelectTrigger>
    <SelectPopup>
      {#each domains as d (d.value)}
        <SelectItem value={d.value}>{d.label}</SelectItem>
      {/each}
    </SelectPopup>
  </Select>
</Group>
