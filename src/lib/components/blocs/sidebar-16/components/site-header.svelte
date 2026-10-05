<script lang="ts">
  import SidebarIcon from '@lucide/svelte/icons/sidebar';
  import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
  } from '#lib/components/ui/breadcrumb/index.js';
  import { Button } from '#lib/components/ui/button/index.js';
  import { Separator } from '#lib/components/ui/separator/index.js';
  import { useSidebar } from '#lib/components/ui/sidebar/index.js';
  import SearchForm from './search-form.svelte';

  const sidebar = useSidebar();
</script>

<header class="sticky top-0 z-50 flex w-full items-center border-b bg-background">
  <div class="flex h-(--header-height) w-full items-center gap-2 px-4">
    <Button class="size-8" variant="ghost" size="icon" onclick={sidebar.toggle}>
      <SidebarIcon />
    </Button>
    <Separator orientation="vertical" class="me-2 h-4" />
    <Breadcrumb class="hidden sm:block">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="##">Build Your Application</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Data Fetching</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <SearchForm class="w-full sm:ms-auto sm:w-auto" />
  </div>
</header>
