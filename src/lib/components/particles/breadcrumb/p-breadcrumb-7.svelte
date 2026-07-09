<script lang="ts">
  import Database from "@lucide/svelte/icons/database";
  import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
  } from "$lib/components/ui/breadcrumb";
  import {
    Select,
    SelectItem,
    SelectPopup,
    SelectTrigger,
    SelectValue,
  } from "$lib/components/ui/select";

  const items = [
    { label: "Orion", value: "Orion" },
    { label: "Sigma", value: "Sigma" },
    { label: "Dorado", value: "Dorado" },
  ];
</script>

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Databases</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <Select value="Orion">
        <SelectTrigger aria-label="Select database" size="sm">
          <Database />
          <SelectValue />
        </SelectTrigger>
        <SelectPopup>
          {#each items as { label, value } (value)}
            <SelectItem {value} {label} />
          {/each}
        </SelectPopup>
      </Select>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
