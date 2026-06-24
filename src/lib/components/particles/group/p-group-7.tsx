import { Group, GroupSeparator, GroupText } from "@/registry/default/ui/group";
import { Input } from "@/registry/default/ui/input";
import { Label } from "@/registry/default/ui/label";

export default function Particle() {
  return (
    <Group aria-label="Domain input">
      <GroupText render={<Label aria-label="Domain" htmlFor="domain" />}>
        https://
      </GroupText>
      <GroupSeparator />
      <Input
        aria-label="Domain"
        defaultValue="coss.com"
        id="domain"
        type="text"
      />
    </Group>
  );
}
