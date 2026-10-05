<script lang="ts">
  import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
  } from '#lib/components/ui/breadcrumb/index.js';
  import { Separator } from '#lib/components/ui/separator/index.js';
  import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger
  } from '#lib/components/ui/sidebar/index.js';
  import AppSidebar from './components/app-sidebar.svelte';
</script>

<SidebarProvider>
  <AppSidebar />
  <SidebarInset>
    <header class="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
      <SidebarTrigger class="-ms-1" />
      <Separator orientation="vertical" class="me-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem class="hidden md:block">
            <BreadcrumbLink href="##">Build Your Application</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator class="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage>Data Fetching</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </header>
    <div class="flex flex-1 flex-col gap-4 p-4">
      {#each Array.from({ length: 24 }) as _, index (index)}
        <div class="aspect-video h-12 w-full rounded-lg bg-muted/50"></div>
      {/each}
    </div>
  </SidebarInset>
</SidebarProvider>
