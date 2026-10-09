<script lang="ts">
  import type { Snippet } from 'svelte';
  import { SidebarInset, SidebarProvider } from '../ui/index.js';
  import SettingsMobileHeader from './settings-mobile-header.svelte';
  import SettingsSidebar from './settings-sidebar.svelte';

  let { children }: { children?: Snippet } = $props();
</script>

<SidebarProvider>
  <SettingsMobileHeader />
  <SettingsSidebar />
  <SidebarInset class="max-md:pt-14">
    <div class="mx-auto max-w-3xl">
      {@render children?.()}
    </div>
  </SidebarInset>
</SidebarProvider>
