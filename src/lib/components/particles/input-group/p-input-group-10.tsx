import { Badge } from "@/registry/default/ui/badge";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/default/ui/input-group";

export default function Particle() {
  return (
    <InputGroup>
      <InputGroupInput placeholder="Type to search…" type="search" />
      <InputGroupAddon align="inline-end">
        <Badge variant="info">Badge</Badge>
      </InputGroupAddon>
    </InputGroup>
  );
}
