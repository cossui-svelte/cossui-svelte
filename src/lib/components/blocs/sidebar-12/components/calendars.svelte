<script lang="ts">
  import CheckIcon from '@lucide/svelte/icons/check';
  import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
  import {
    Collapsible,
    CollapsiblePanel,
    CollapsibleTrigger
  } from '#lib/components/ui/collapsible/index.js';
  import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator
  } from '#lib/components/ui/sidebar/index.js';

  let {
    calendars
  }: {
    calendars: {
      name: string;
      items: string[];
    }[];
  } = $props();
</script>

{#each calendars as calendar, index (calendar.name)}
  <SidebarGroup class="py-0">
    <Collapsible open={index === 0} class="group/collapsible">
      <SidebarGroupLabel
        class="group/label w-full text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      >
        {#snippet child({ props })}
          <CollapsibleTrigger {...props}>
            {calendar.name}
            <ChevronRightIcon
              class="ms-auto transition-transform group-data-open/collapsible:rotate-90"
            />
          </CollapsibleTrigger>
        {/snippet}
      </SidebarGroupLabel>
      <CollapsiblePanel>
        <SidebarGroupContent>
          <SidebarMenu>
            {#each calendar.items as item, itemIndex (item)}
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <div
                    data-active={itemIndex < 2}
                    class="group/calendar-item flex aspect-square size-4 shrink-0 items-center justify-center rounded-sm border border-sidebar-border text-sidebar-primary-foreground data-[active=true]:border-sidebar-primary data-[active=true]:bg-sidebar-primary"
                  >
                    <CheckIcon class="hidden size-3 group-data-[active=true]/calendar-item:block" />
                  </div>
                  {item}
                </SidebarMenuButton>
              </SidebarMenuItem>
            {/each}
          </SidebarMenu>
        </SidebarGroupContent>
      </CollapsiblePanel>
    </Collapsible>
  </SidebarGroup>
  <SidebarSeparator class="mx-0" />
{/each}
