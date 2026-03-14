"use client";

import { Button } from "@coss/ui/components/button";
import { Sheet, SheetPopup, SheetTrigger } from "@coss/ui/components/sheet";
import { cn } from "@coss/ui/lib/utils";
import { Menu09Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link, { type LinkProps } from "next/link";
import * as React from "react";

export type PageNode = {
  type: "page";
  name: string;
  url: string;
};

export type FolderNode = {
  type: "folder";
  name: string;
  children: (PageNode | FolderNode)[];
};

export type NavTree = {
  children: FolderNode[];
};

export function MobileNav({
  tree,
  items,
  className,
}: {
  tree?: NavTree;
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
            <div className="flex flex-col gap-2">
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
          {tree ? (
            <div className="flex flex-col gap-8">
              {tree?.children?.map((group: FolderNode, index: number) => {
                if (group.type === "folder") {
                  return (
                    <div className="flex flex-col gap-3" key={group.name}>
                      <div className="font-medium text-sm">{group.name}</div>
                      <div className="flex flex-col gap-2">
                        {group.children.map((item) => {
                          if (item.type === "page") {
                            return (
                              <MobileLink
                                href={item.url}
                                key={`${item.url}-${index}`}
                                onOpenChange={setOpen}
                              >
                                {item.name}
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
          ) : null}
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
  return (
    <Link
      className={cn("text-muted-foreground", className)}
      href={href}
      onClick={() => {
        onOpenChange?.(false);
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
