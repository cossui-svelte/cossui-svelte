<script lang="ts">
  import { SidebarInset, SidebarProvider } from '#lib/components/ui/sidebar/index.js';
  import AppSidebar from './components/app-sidebar.svelte';
  import SiteHeader from './components/site-header.svelte';
</script>

<div class="[--header-height:calc(--spacing(14))]">
  <SidebarProvider class="flex flex-col">
    <SiteHeader />
    <div class="flex flex-1">
      <AppSidebar />
      <SidebarInset>
        <div class="flex flex-1 flex-col gap-4 p-4">
          <div class="grid auto-rows-min gap-4 md:grid-cols-3">
            <div class="aspect-video rounded-xl bg-muted/50"></div>
            <div class="aspect-video rounded-xl bg-muted/50"></div>
            <div class="aspect-video rounded-xl bg-muted/50"></div>
          </div>
          <div class="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min"></div>
        </div>
      </SidebarInset>
    </div>
  </SidebarProvider>
</div>
