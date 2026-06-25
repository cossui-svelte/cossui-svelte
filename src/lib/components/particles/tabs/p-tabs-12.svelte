<script lang="ts">
  import HouseIcon from "@lucide/svelte/icons/house";
  import InboxIcon from "@lucide/svelte/icons/inbox";
  import SettingsIcon from "@lucide/svelte/icons/settings";
  import { Badge } from "$lib/components/ui/badge";
  import { Tabs, TabsList, TabsPanel, TabsTab } from "$lib/components/ui/tabs";
</script>

<Tabs class="items-center" value="tab-1">
  <TabsList>
    <TabsTab aria-label="Overview" class="size-10!" value="tab-1">
      <HouseIcon aria-hidden="true" />
    </TabsTab>
    <TabsTab aria-label="Inbox" class="size-10!" value="tab-2">
      <InboxIcon aria-hidden="true" />
      <Badge class="absolute end-0 top-0 rounded-full not-in-data-active:opacity-64" size="sm">
        5
      </Badge>
    </TabsTab>
    <TabsTab aria-label="Settings" class="size-10!" value="tab-3">
      <SettingsIcon aria-hidden="true" />
    </TabsTab>
  </TabsList>
  <TabsPanel value="tab-1">
    <p class="p-4 text-center text-muted-foreground text-xs">Overview content</p>
  </TabsPanel>
  <TabsPanel value="tab-2">
    <p class="p-4 text-center text-muted-foreground text-xs">Inbox content</p>
  </TabsPanel>
  <TabsPanel value="tab-3">
    <p class="p-4 text-center text-muted-foreground text-xs">Settings content</p>
  </TabsPanel>
</Tabs>
