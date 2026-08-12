<script lang="ts">
  import Home from '@lucide/svelte/icons/house';
  import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
  } from '$lib/components/ui/breadcrumb';
</script>

<Breadcrumb>
  <BreadcrumbList class="rounded-md border bg-background px-3 py-2 shadow-xs">
    <BreadcrumbItem>
      <BreadcrumbLink href="#">
        <Home aria-hidden="true" size={16} />
        <span class="sr-only">Home</span>
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="#">Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
