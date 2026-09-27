<script lang="ts">
  import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
  } from '$lib/components/ui/breadcrumb';
  import { Separator } from '$lib/components/ui/separator';
  import { SidebarInset, SidebarProvider, SidebarTrigger } from '$lib/components/ui/sidebar';
  import AppSidebar from './components/app-sidebar.svelte';
</script>

<SidebarProvider>
  <AppSidebar />
  <SidebarInset>
    <header class="flex h-16 shrink-0 items-center gap-2 border-b">
      <div class="flex items-center gap-2 px-3">
        <SidebarTrigger />
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
      </div>
    </header>
    <div class="flex flex-1 flex-col gap-4 p-4">
      <div class="grid auto-rows-min gap-4 md:grid-cols-3">
        <div class="aspect-video rounded-xl bg-muted/50"></div>
        <div class="aspect-video rounded-xl bg-muted/50"></div>
        <div class="aspect-video rounded-xl bg-muted/50"></div>
      </div>
      <div class="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min"></div>
    </div>
  </SidebarInset>
</SidebarProvider>
