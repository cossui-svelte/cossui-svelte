<script lang="ts">
  import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage
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
      <Separator orientation="vertical" class="me-2 data-[orientation=vertical]:h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>October 2024</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </header>
    <div class="flex flex-1 flex-col gap-4 p-4">
      <div class="grid auto-rows-min gap-4 md:grid-cols-5">
        {#each Array.from({ length: 20 }) as _, index (index)}
          <div class="aspect-square rounded-xl bg-muted/50"></div>
        {/each}
      </div>
    </div>
  </SidebarInset>
</SidebarProvider>
