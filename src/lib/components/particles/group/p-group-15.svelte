<script lang="ts">
  import Search from "@lucide/svelte/icons/search";
  import { Button } from "$lib/components/ui/button";
  import { Group, GroupSeparator } from "$lib/components/ui/group";
  import { Input } from "$lib/components/ui/input";
  import {
    Select,
    SelectItem,
    SelectPopup,
    SelectTrigger,
    SelectValue,
  } from "$lib/components/ui/select";

  const protocols = [
    { label: "http", value: "http" },
    { label: "https", value: "https" },
    { label: "http + https", value: "both" },
  ];

  const subdomains = [
    { label: "Subdomains", value: "none" },
    { label: "www", value: "www" },
    { label: "api", value: "api" },
    { label: "cdn", value: "cdn" },
  ];

  let protocol = $state("both");
  let subdomain = $state("none");
</script>

<Group aria-label="URL search">
  <Select bind:value={protocol}>
    <SelectTrigger class="w-fit min-w-none">
      <SelectValue />
    </SelectTrigger>
    <SelectPopup>
      {#each protocols as p (p.value)}
        <SelectItem value={p.value}>{p.label}</SelectItem>
      {/each}
    </SelectPopup>
  </Select>
  <GroupSeparator />
  <Input aria-label="URL" class="flex-1" value="coss.com" type="text" />
  <GroupSeparator />
  <Select bind:value={subdomain}>
    <SelectTrigger class="w-fit min-w-none">
      <SelectValue />
    </SelectTrigger>
    <SelectPopup>
      {#each subdomains as s (s.value)}
        <SelectItem value={s.value}>{s.label}</SelectItem>
      {/each}
    </SelectPopup>
  </Select>
  <GroupSeparator />
  <Button aria-label="Search" size="icon" variant="outline">
    <Search aria-hidden />
  </Button>
</Group>
