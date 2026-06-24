<script lang="ts">
  import Home from "@lucide/svelte/icons/house";
  import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "$lib/components/ui/breadcrumb";
</script>

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink aria-label="Home" href="/">
        <Home aria-hidden="true" class="size-4" />
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator> · </BreadcrumbSeparator>
    <BreadcrumbItem>
      <BreadcrumbLink href="/docs/">Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator> · </BreadcrumbSeparator>
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
