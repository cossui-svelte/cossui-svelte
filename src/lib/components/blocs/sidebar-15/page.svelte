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
  import SidebarLeft from './components/sidebar-left.svelte';
  import SidebarRight from './components/sidebar-right.svelte';
</script>

<SidebarProvider>
  <SidebarLeft />
  <SidebarInset>
    <header class="sticky top-0 flex h-14 shrink-0 items-center gap-2 bg-background">
      <div class="flex flex-1 items-center gap-2 px-3">
        <SidebarTrigger />
        <Separator orientation="vertical" class="me-2 data-[orientation=vertical]:h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage class="line-clamp-1">
                Project Management & Task Tracking
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
    <div class="flex flex-1 flex-col gap-4 p-4">
      <div class="mx-auto h-24 w-full max-w-3xl rounded-xl bg-muted/50"></div>
      <div class="mx-auto h-[100vh] w-full max-w-3xl rounded-xl bg-muted/50"></div>
    </div>
  </SidebarInset>
  <SidebarRight />
</SidebarProvider>
