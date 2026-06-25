<script lang="ts">
  import BoxIcon from "@lucide/svelte/icons/box";
  import HouseIcon from "@lucide/svelte/icons/house";
  import PanelsTopLeftIcon from "@lucide/svelte/icons/panels-top-left";
  import { Tabs, TabsList, TabsPanel, TabsTab } from "$lib/components/ui/tabs";
</script>

<Tabs class="items-center" value="tab-1">
  <div class="border-b">
    <TabsList variant="underline">
      <TabsTab class="h-auto! flex-col gap-1.5 py-[calc(--spacing(2)-1px)]" value="tab-1">
        <HouseIcon aria-hidden="true" class="opacity-60" size={16} />
        Overview
      </TabsTab>
      <TabsTab class="h-auto! flex-col gap-1.5 py-[calc(--spacing(2)-1px)]" value="tab-2">
        <PanelsTopLeftIcon aria-hidden="true" class="opacity-60" size={16} />
        Projects
      </TabsTab>
      <TabsTab class="h-auto! flex-col gap-1.5 py-[calc(--spacing(2.5)-1px)]" value="tab-3">
        <BoxIcon aria-hidden="true" class="opacity-60" size={16} />
        Packages
      </TabsTab>
    </TabsList>
  </div>
  <TabsPanel value="tab-1">
    <p class="p-4 text-center text-muted-foreground text-xs">Overview content</p>
  </TabsPanel>
  <TabsPanel value="tab-2">
    <p class="p-4 text-center text-muted-foreground text-xs">Projects content</p>
  </TabsPanel>
  <TabsPanel value="tab-3">
    <p class="p-4 text-center text-muted-foreground text-xs">Packages content</p>
  </TabsPanel>
</Tabs>
