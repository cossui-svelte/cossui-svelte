<script lang="ts">
  import HouseIcon from "@lucide/svelte/icons/house";
  import PanelsTopLeftIcon from "@lucide/svelte/icons/panels-top-left";
  import SettingsIcon from "@lucide/svelte/icons/settings";
  import { Tabs, TabsList, TabsPanel, TabsTab } from "$lib/components/ui/tabs";
</script>

<Tabs value="tab-1">
  <TabsList>
    <TabsTab value="tab-1">
      <HouseIcon aria-hidden="true" />
      Overview
    </TabsTab>
    <TabsTab value="tab-2">
      <PanelsTopLeftIcon aria-hidden="true" />
      Projects
    </TabsTab>
    <TabsTab value="tab-3">
      <SettingsIcon aria-hidden="true" />
      Settings
    </TabsTab>
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
