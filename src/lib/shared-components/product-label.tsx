"use client";

import { Badge } from "@coss/ui/components/badge";
import { usePathname } from "next/navigation";

interface ProductsDropdownProps {
  items: { href: string; label: string; upcoming?: boolean }[];
  currentProduct?: string;
}

export function ProductLabel({ items, currentProduct }: ProductsDropdownProps) {
  const pathname = usePathname();

  // If currentProduct is explicitly provided, use it
  if (currentProduct) {
    const matchingItem = items.find(
      (item) => item.label.toLowerCase() === currentProduct.toLowerCase(),
    );

    if (!matchingItem) {
      return null;
    }

    return (
      <>
        <span className="text-muted-foreground/64">{matchingItem.label}</span>
        {matchingItem.upcoming && (
          <Badge className="-mt-1 ms-2 font-sans max-sm:hidden" variant="info">
            Upcoming
          </Badge>
        )}
      </>
    );
  }

  // Don't display anything on home page
  if (pathname === "/") {
    return null;
  }

  // Get the first segment of the pathname (remove leading slash)
  const firstSegment = pathname.slice(1).split("/")[0];

  // Check if the first segment matches any of the item labels
  const matchingItem = firstSegment
    ? items.find(
        (item) => item.label.toLowerCase() === firstSegment.toLowerCase(),
      )
    : undefined;

  // Only display if we have a match
  if (!matchingItem) {
    return null;
  }

  return (
    <>
      <span className="text-muted-foreground/64">{matchingItem.label}</span>
      {matchingItem.upcoming && (
        <Badge className="-mt-1 ms-2 font-sans max-sm:hidden" variant="info">
          Upcoming
        </Badge>
      )}
    </>
  );
}
