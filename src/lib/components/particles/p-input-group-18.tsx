import { EllipsisIcon } from "lucide-react";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/default/ui/input-group";
import {
  Menu,
  MenuItem,
  MenuPopup,
  MenuTrigger,
} from "@/registry/default/ui/menu";

export default function Particle() {
  return (
    <InputGroup>
      <InputGroupInput
        defaultValue="hello@coss.com"
        placeholder="Enter email"
        type="email"
      />
      <InputGroupAddon align="inline-end">
        <Badge variant="info">Primary</Badge>
        <Menu>
          <MenuTrigger
            render={
              <Button aria-label="Open menu" size="icon-xs" variant="ghost" />
            }
          >
            <EllipsisIcon />
          </MenuTrigger>
          <MenuPopup align="end" alignOffset={-4} sideOffset={8}>
            <MenuItem disabled>Make Primary</MenuItem>
            <MenuItem variant="destructive">Delete</MenuItem>
          </MenuPopup>
        </Menu>
      </InputGroupAddon>
    </InputGroup>
  );
}
