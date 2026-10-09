<script lang="ts">
  import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
  import { href } from '../lib/router.svelte.js';
  import { Sidebar, SidebarContent, SidebarHeader, SidebarMenuButton } from '../ui/index.js';
  import SettingsDrawer from './settings-drawer.svelte';
  import SettingsNavContent from './settings-nav-content.svelte';
</script>

<Sidebar>
  <SidebarHeader>
    <div class="flex flex-col gap-1 px-2 lg:px-1">
      <SidebarMenuButton aria-label="Back" href={href('/event-types')} tooltip="Back">
        <ArrowLeftIcon />
        <span class="max-lg:sr-only">Back</span>
      </SidebarMenuButton>
      <div class="max-md:hidden lg:hidden">
        <SettingsDrawer />
      </div>
    </div>
  </SidebarHeader>
  <SidebarContent class="gap-0 max-lg:hidden">
    <SettingsNavContent />
  </SidebarContent>
</Sidebar>
