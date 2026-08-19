<script lang="ts">
  import HouseIcon from '@lucide/svelte/icons/house';
  import PanelsTopLeftIcon from '@lucide/svelte/icons/panels-top-left';
  import SettingsIcon from '@lucide/svelte/icons/settings';
  import { Tabs, TabsList, TabsPanel, TabsTab } from '$lib/components/ui/tabs';
  import { Tooltip, TooltipPopup, TooltipProvider } from '$lib/components/ui/tooltip';

  let overviewRef = $state<HTMLElement | null>(null);
  let overviewTipOpen = $state(false);
  let projectsRef = $state<HTMLElement | null>(null);
  let projectsTipOpen = $state(false);
  let settingsRef = $state<HTMLElement | null>(null);
  let settingsTipOpen = $state(false);
</script>

<TooltipProvider>
  <Tabs class="items-center" value="tab-1">
    <TabsList>
      <Tooltip bind:open={overviewTipOpen}>
        <TabsTab
          aria-label="Overview"
          bind:ref={overviewRef}
          value="tab-1"
          onpointerenter={() => (overviewTipOpen = true)}
          onpointerleave={() => (overviewTipOpen = false)}
          onfocus={() => (overviewTipOpen = true)}
          onblur={() => (overviewTipOpen = false)}
        >
          <HouseIcon aria-hidden="true" />
        </TabsTab>
        <TooltipPopup customAnchor={overviewRef}>Overview</TooltipPopup>
      </Tooltip>
      <Tooltip bind:open={projectsTipOpen}>
        <TabsTab
          aria-label="Projects"
          bind:ref={projectsRef}
          value="tab-2"
          onpointerenter={() => (projectsTipOpen = true)}
          onpointerleave={() => (projectsTipOpen = false)}
          onfocus={() => (projectsTipOpen = true)}
          onblur={() => (projectsTipOpen = false)}
        >
          <PanelsTopLeftIcon aria-hidden="true" />
        </TabsTab>
        <TooltipPopup customAnchor={projectsRef}>Projects</TooltipPopup>
      </Tooltip>
      <Tooltip bind:open={settingsTipOpen}>
        <TabsTab
          aria-label="Settings"
          bind:ref={settingsRef}
          value="tab-3"
          onpointerenter={() => (settingsTipOpen = true)}
          onpointerleave={() => (settingsTipOpen = false)}
          onfocus={() => (settingsTipOpen = true)}
          onblur={() => (settingsTipOpen = false)}
        >
          <SettingsIcon aria-hidden="true" />
        </TabsTab>
        <TooltipPopup customAnchor={settingsRef}>Settings</TooltipPopup>
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
