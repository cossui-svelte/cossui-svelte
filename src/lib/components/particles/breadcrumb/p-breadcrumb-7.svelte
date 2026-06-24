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
    { label: "Orion", value: "orion" },
    { label: "Sigma", value: "sigma" },
    { label: "Dorado", value: "dorado" },
  ];
</script>

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Databases</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <Select aria-label="Select database" value="orion">
        <SelectTrigger size="sm">
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
