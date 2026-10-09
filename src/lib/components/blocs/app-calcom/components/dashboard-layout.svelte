<script lang="ts">
  import type { Snippet } from 'svelte';
  import { SidebarInset, SidebarProvider } from '../ui/index.js';
  import AppMobileFooter from './app-mobile-footer.svelte';
  import AppMobileHeader from './app-mobile-header.svelte';
  import AppSidebar from './app-sidebar.svelte';

  let { children }: { children?: Snippet } = $props();
</script>

<SidebarProvider>
  <AppMobileHeader />
  <AppSidebar />
  <SidebarInset class="max-md:pt-14">
    {@render children?.()}
  </SidebarInset>
  <AppMobileFooter />
</SidebarProvider>
