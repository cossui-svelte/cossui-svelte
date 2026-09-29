<script lang="ts">
  import ChevronUpIcon from '@lucide/svelte/icons/chevron-up';
  import { Menu, MenuItem, MenuPopup, MenuTrigger } from '$lib/components/ui/menu';
  import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger
  } from '$lib/components/ui/sidebar';
  import { cn } from '$lib/utils';
</script>

<!-- transform-gpu makes this box the containing block for the sidebar's `fixed`
     panel, so the demo stays inside the preview card instead of the viewport. -->
<div class="relative h-100 w-full transform-gpu overflow-hidden rounded-xl border">
  <SidebarProvider class="h-full min-h-full">
    <Sidebar class="h-full">
      <SidebarHeader />
      <SidebarContent />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Menu>
              <SidebarMenuButton>
                {#snippet child({ props })}
                  <MenuTrigger
                    {...props}
                    class={cn(
                      props.class as string,
                      'data-popup-open:bg-sidebar-accent data-popup-open:text-sidebar-accent-foreground'
                    )}
                  >
                    Username
                    <ChevronUpIcon class="ms-auto" />
                  </MenuTrigger>
                {/snippet}
              </SidebarMenuButton>
              <MenuPopup align="start" side="top" class="w-(--anchor-width)">
                <MenuItem>
                  <span>Account</span>
                </MenuItem>
                <MenuItem>
                  <span>Billing</span>
                </MenuItem>
                <MenuItem>
                  <span>Sign out</span>
                </MenuItem>
              </MenuPopup>
            </Menu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
    <SidebarInset class="h-full">
      <header class="flex h-12 shrink-0 items-center gap-2 border-b px-3">
        <SidebarTrigger />
        <span class="font-medium text-sm">Account</span>
      </header>
      <div class="p-4 text-muted-foreground text-sm">Content area</div>
    </SidebarInset>
  </SidebarProvider>
</div>
