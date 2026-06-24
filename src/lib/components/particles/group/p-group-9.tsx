import { ZoomInIcon, ZoomOutIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import { Group, GroupSeparator } from "@/registry/default/ui/group";

export default function Particle() {
  return (
    <Group aria-label="Zoom controls" orientation="vertical">
      <Button aria-label="Zoom in" size="icon" variant="outline">
        <ZoomInIcon />
      </Button>
      <GroupSeparator orientation="horizontal" />
      <Button aria-label="Zoom Out" size="icon" variant="outline">
        <ZoomOutIcon />
      </Button>
    </Group>
  );
}
