<script lang="ts">
  import HouseIcon from "@lucide/svelte/icons/house";
  import PanelsTopLeftIcon from "@lucide/svelte/icons/panels-top-left";
  import SettingsIcon from "@lucide/svelte/icons/settings";
  import { Tabs, TabsList, TabsPanel, TabsTab } from "$lib/components/ui/tabs";
  import { Tooltip, TooltipPopup, TooltipProvider, TooltipTrigger } from "$lib/components/ui/tooltip";
</script>

<TooltipProvider>
  <Tabs class="items-center" defaultValue="tab-1">
    <TabsList>
      <Tooltip>
        <TooltipTrigger>
          {#snippet child({ props })}
            <TabsTab aria-label="Overview" value="tab-1" {...props}>
              <HouseIcon aria-hidden="true" />
            </TabsTab>
          {/snippet}
        </TooltipTrigger>
        <TooltipPopup>Overview</TooltipPopup>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          {#snippet child({ props })}
            <TabsTab aria-label="Projects" value="tab-2" {...props}>
              <PanelsTopLeftIcon aria-hidden="true" />
            </TabsTab>
          {/snippet}
        </TooltipTrigger>
        <TooltipPopup>Projects</TooltipPopup>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          {#snippet child({ props })}
            <TabsTab aria-label="Settings" value="tab-3" {...props}>
              <SettingsIcon aria-hidden="true" />
            </TabsTab>
          {/snippet}
        </TooltipTrigger>
        <TooltipPopup>Settings</TooltipPopup>
      </Tooltip>
    </TabsList>
    <TabsPanel value="tab-1">
      <p class="p-4 text-center text-muted-foreground text-xs">Overview content</p>
    </TabsPanel>
    <TabsPanel value="tab-2">
      <p class="p-4 text-center text-muted-foreground text-xs">Projects content</p>
    </TabsPanel>
    <TabsPanel value="tab-3">
      <p class="p-4 text-center text-muted-foreground text-xs">Settings content</p>
    </TabsPanel>
  </Tabs>
</TooltipProvider>
