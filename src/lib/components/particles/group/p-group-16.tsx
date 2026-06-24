import { PlusIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import { Group, GroupSeparator } from "@/registry/default/ui/group";
import { Input } from "@/registry/default/ui/input";

export default function Particle() {
  return (
    <Group aria-label="Add item">
      <Button aria-label="Add" size="icon" variant="outline">
        <PlusIcon aria-hidden="true" />
      </Button>
      <GroupSeparator />
      <Input aria-label="Item name" placeholder="Enter item name" type="text" />
    </Group>
  );
}
