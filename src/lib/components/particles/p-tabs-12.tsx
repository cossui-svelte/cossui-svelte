import { HouseIcon, InboxIcon, SettingsIcon } from "lucide-react";
import { Badge } from "@/registry/default/ui/badge";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/default/ui/tabs";

export default function Particle() {
  return (
    <Tabs className="items-center" defaultValue="tab-1">
      <TabsList>
        <TabsTab aria-label="Overview" className="size-10!" value="tab-1">
          <HouseIcon aria-hidden="true" />
        </TabsTab>
        <TabsTab aria-label="Inbox" className="size-10!" value="tab-2">
          <InboxIcon aria-hidden="true" />
          <Badge
            className="absolute end-0 top-0 rounded-full not-in-data-active:opacity-64"
            size="sm"
          >
            5
          </Badge>
        </TabsTab>
        <TabsTab aria-label="Settings" className="size-10!" value="tab-3">
          <SettingsIcon aria-hidden="true" />
        </TabsTab>
      </TabsList>
      <TabsPanel value="tab-1">
        <p className="p-4 text-center text-muted-foreground text-xs">
          Overview content
        </p>
      </TabsPanel>
      <TabsPanel value="tab-2">
        <p className="p-4 text-center text-muted-foreground text-xs">
          Inbox content
        </p>
      </TabsPanel>
      <TabsPanel value="tab-3">
        <p className="p-4 text-center text-muted-foreground text-xs">
          Settings content
        </p>
      </TabsPanel>
    </Tabs>
  );
}
