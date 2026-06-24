import {
  ChevronDownIcon,
  DownloadIcon,
  EditIcon,
  ShareIcon,
} from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import { Group, GroupSeparator } from "@/registry/default/ui/group";
import {
  Menu,
  MenuItem,
  MenuPopup,
  MenuTrigger,
} from "@/registry/default/ui/menu";

export default function Particle() {
  return (
    <Group aria-label="Subscription actions">
      <Button>Subscribe</Button>
      <GroupSeparator className="bg-primary/72" />
      <Menu>
        <MenuTrigger render={<Button aria-label="Copy options" size="icon" />}>
          <ChevronDownIcon aria-hidden="true" className="size-4" />
        </MenuTrigger>
        <MenuPopup align="end">
          <MenuItem>
            <ShareIcon aria-hidden="true" />
            Share link
          </MenuItem>
          <MenuItem>
            <DownloadIcon aria-hidden="true" />
            Download
          </MenuItem>
          <MenuItem>
            <EditIcon aria-hidden="true" />
            Duplicate
          </MenuItem>
        </MenuPopup>
      </Menu>
    </Group>
  );
}
