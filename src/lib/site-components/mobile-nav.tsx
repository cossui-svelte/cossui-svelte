"use client";

import { Menu09Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";

import { PAGES_NEW } from "@/lib/docs";
import type { source } from "@/lib/source";
import { cn } from "@/lib/utils";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import { Sheet, SheetPopup, SheetTrigger } from "@/registry/default/ui/sheet";

export function MobileNav({
  tree,
  items,
  className,
}: {
  tree: typeof source.pageTree;
  items: { href: string; label: string }[];
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger
        render={
          <Button
            className={cn("-ms-1.5 relative size-8", className)}
            size="icon"
            variant="ghost"
          >
            <HugeiconsIcon
              className="size-5"
              icon={Menu09Icon}
              strokeWidth={2}
            />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        }
      />
      <SheetPopup side="left">
        <div className="flex flex-col gap-12 overflow-auto p-6 pt-8">
          <div className="flex flex-col gap-3">
            <div className="font-medium text-sm">Menu</div>
            <div className="flex flex-col gap-1">
              <MobileLink href="/" onOpenChange={setOpen}>
                Home
              </MobileLink>
              {items.map((item) => (
                <MobileLink
                  href={item.href}
                  key={item.label}
                  onOpenChange={setOpen}
                >
                  {item.label}
                </MobileLink>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-8">
            {tree?.children?.map((group, index) => {
              if (group.type === "folder") {
                return (
                  <div className="flex flex-col gap-3" key={group.$id}>
                    <div className="font-medium text-sm">{group.name}</div>
                    <div className="flex flex-col gap-0.5">
                      {group.children.map((item) => {
                        if (item.type === "page") {
                          return (
                            <MobileLink
                              href={item.url}
                              key={`${item.url}-${index}`}
                              onOpenChange={setOpen}
                            >
                              {item.name}
                              {PAGES_NEW.length > 0 &&
                                PAGES_NEW.includes(item.url as never) && (
                                  <Badge variant="info">New</Badge>
                                )}
                            </MobileLink>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </SheetPopup>
    </Sheet>
  );
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: LinkProps & {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}) {
  const router = useRouter();
  return (
    <Link
      className={cn(
        "flex items-center gap-2 py-1.5 text-muted-foreground",
        className,
      )}
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
