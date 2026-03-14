"use client";

import { Badge } from "@coss/ui/components/badge";
import { Button } from "@coss/ui/components/button";
import {
  Menu,
  MenuItem,
  MenuPopup,
  MenuTrigger,
} from "@coss/ui/components/menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

interface ProductsDropdownProps {
  items: { href: string; label: string; upcoming?: boolean }[];
}

export function ProductsDropdown({ items }: ProductsDropdownProps) {
  const gatewayOrigin = process.env.NEXT_PUBLIC_COSS_URL || "";
  const uiGatewayOrigin = process.env.NEXT_PUBLIC_COSS_UI_URL || "";

  const getLinkProps = (item: {
    href: string;
    label: string;
    upcoming?: boolean;
  }) => {
    const isHomePage = item.href === "/";

    // Determine if this should be an external link and construct the URL
    if (gatewayOrigin && !isHomePage) {
      // Non-homepage links go to the main gateway
      return {
        href: `${gatewayOrigin}${item.href}`,
        isExternal: true,
      };
    }

    if (uiGatewayOrigin && isHomePage) {
      // Homepage links go to the UI gateway
      return {
        href: uiGatewayOrigin,
        isExternal: true,
      };
    }

    // Default: internal link
    return {
      href: item.href,
      isExternal: false,
    };
  };

  return (
    <Menu>
      <MenuTrigger render={<Button variant="ghost" />}>
        Products
        <ChevronDown />
      </MenuTrigger>
      <MenuPopup align="center" sideOffset={4}>
        {items.map((item) => {
          const { href, isExternal } = getLinkProps(item);

          return (
            <MenuItem
              className="group justify-between"
              key={item.href}
              // biome-ignore lint/a11y/useAnchorContent: This is intentional
              render={isExternal ? <a href={href} /> : <Link href={href} />}
            >
              <span className="font-heading in-data-highlighted:text-foreground text-muted-foreground">
                {item.label}
              </span>
              {item.upcoming && (
                <Badge
                  className="-me-0.5 font-medium opacity-0 group-hover:opacity-100"
                  size="sm"
                  variant="info"
                >
                  Upcoming
                </Badge>
              )}
            </MenuItem>
          );
        })}
      </MenuPopup>
    </Menu>
  );
}
