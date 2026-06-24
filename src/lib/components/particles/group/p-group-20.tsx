import { Button } from "@/registry/default/ui/button";
import { Group, GroupSeparator } from "@/registry/default/ui/group";
import { Input } from "@/registry/default/ui/input";

export default function Particle() {
  return (
    <Group aria-label="Email subscription">
      <Input aria-label="Email" placeholder="Email" type="email" />
      <GroupSeparator />
      <Button variant="outline">Subscribe</Button>
    </Group>
  );
}
