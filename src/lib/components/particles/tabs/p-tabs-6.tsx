import { HouseIcon, PanelsTopLeftIcon, SettingsIcon } from "lucide-react";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/default/ui/tabs";

export default function Particle() {
  return (
    <Tabs defaultValue="tab-1">
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
