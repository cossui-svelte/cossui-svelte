import Link from "next/link";
import { Button } from "@/registry/default/ui/button";
import {
  Menu,
  MenuLinkItem,
  MenuPopup,
  MenuTrigger,
} from "@/registry/default/ui/menu";

export default function Particle() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>Open menu</MenuTrigger>
      <MenuPopup>
        <MenuLinkItem render={<Link href="/docs" />}>Docs</MenuLinkItem>
        <MenuLinkItem render={<Link href="/particles" />}>
          Particles
        </MenuLinkItem>
      </MenuPopup>
    </Menu>
  );
}
