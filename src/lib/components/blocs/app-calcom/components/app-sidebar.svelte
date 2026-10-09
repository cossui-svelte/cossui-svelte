<script lang="ts">
  import { navFooterItems, navMainItems } from '../lib/navigation-data.js';
  import { Sidebar, SidebarContent, SidebarHeader, SidebarMenuButton } from '../ui/index.js';
  import DebugPopover from './debug-popover.svelte';
  import HeaderActions from './header-actions.svelte';
  import Logo from './logo.svelte';
  import NavMain from './nav-main.svelte';
  import NavSecondary from './nav-secondary.svelte';
</script>

<Sidebar>
  <SidebarHeader>
    <div class="flex flex-col items-center justify-between gap-0.5 px-1 lg:flex-row">
      <SidebarMenuButton class="w-fit justify-center md:max-lg:p-0">
        {#snippet child({ props })}
          <Logo {...props} />
        {/snippet}
      </SidebarMenuButton>
      <HeaderActions />
    </div>
  </SidebarHeader>
  <SidebarContent>
    <NavMain items={navMainItems} />
    <NavSecondary class="mt-auto" items={navFooterItems} />
    <div class="px-3 pb-4 text-[0.625rem] text-sidebar-foreground/50 max-lg:hidden">
      © 2025 Cal.com, Inc. v.5.9.6-h-2701b4d -
      <DebugPopover />
    </div>
  </SidebarContent>
</Sidebar>
