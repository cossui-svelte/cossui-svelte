import { Button } from "@/registry/default/ui/button";
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
        <Button size="xs" variant="secondary">
          Search
        </Button>
      </InputGroupAddon>
    </InputGroup>
  );
}
