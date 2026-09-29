<script lang="ts">
  import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
  import LifeBuoyIcon from '@lucide/svelte/icons/life-buoy';
  import SendIcon from '@lucide/svelte/icons/send';
  import {
    Collapsible,
    CollapsiblePanel,
    CollapsibleTrigger
  } from '$lib/components/ui/collapsible';
  import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger
  } from '$lib/components/ui/sidebar';
</script>

<!-- transform-gpu makes this box the containing block for the sidebar's `fixed`
     panel, so the demo stays inside the preview card instead of the viewport. -->
<div class="relative h-100 w-full transform-gpu overflow-hidden rounded-xl border">
  <SidebarProvider class="h-full min-h-full">
    <Sidebar class="h-full">
      <SidebarContent>
        <Collapsible open class="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel
              class="text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              {#snippet child({ props })}
                <CollapsibleTrigger {...props}>
                  Help
                  <ChevronDownIcon
                    class="ms-auto transition-transform group-data-open/collapsible:rotate-180"
                  />
                </CollapsibleTrigger>
              {/snippet}
            </SidebarGroupLabel>
            <CollapsiblePanel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <LifeBuoyIcon />
                      Support
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <SendIcon />
                      Feedback
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsiblePanel>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>
    </Sidebar>
    <SidebarInset class="h-full">
      <header class="flex h-12 shrink-0 items-center gap-2 border-b px-3">
        <SidebarTrigger />
        <span class="font-medium text-sm">Help</span>
      </header>
      <div class="p-4 text-muted-foreground text-sm">Content area</div>
    </SidebarInset>
  </SidebarProvider>
</div>
