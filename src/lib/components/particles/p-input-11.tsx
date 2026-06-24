import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/default/ui/input-group";
import { Kbd } from "@/registry/default/ui/kbd";

export default function Particle() {
  return (
    <InputGroup>
      <InputGroupInput
        aria-label="Search"
        placeholder="Search…"
        type="search"
      />
      <InputGroupAddon align="inline-end">
        <Kbd>/</Kbd>
      </InputGroupAddon>
    </InputGroup>
  );
}
