import { Button } from "@/registry/default/ui/button";
import {
  Menu,
  MenuItem,
  MenuPopup,
  MenuTrigger,
} from "@/registry/default/ui/menu";

export default function Particle() {
  return (
    <Menu>
      <MenuTrigger openOnHover render={<Button variant="outline" />}>
        Hover me
      </MenuTrigger>
      <MenuPopup>
        <MenuItem>Item one</MenuItem>
        <MenuItem>Item two</MenuItem>
      </MenuPopup>
    </Menu>
  );
}
