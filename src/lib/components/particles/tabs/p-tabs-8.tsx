import { HouseIcon, PanelsTopLeftIcon, SettingsIcon } from "lucide-react";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/default/ui/tabs";

export default function Particle() {
  return (
    <Tabs className="items-center" defaultValue="tab-1">
      <TabsList>
        <TabsTab aria-label="Overview" value="tab-1">
          <HouseIcon aria-hidden="true" />
        </TabsTab>
        <TabsTab aria-label="Projects" value="tab-2">
          <PanelsTopLeftIcon aria-hidden="true" />
        </TabsTab>
        <TabsTab aria-label="Settings" value="tab-3">
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
          Projects content
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
