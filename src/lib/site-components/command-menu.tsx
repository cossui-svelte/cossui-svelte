"use client";

import { CommandPanel } from "@coss/ui/components/command";
import {
  ArrowTurnBackwardIcon,
  Atom01Icon,
  BookOpen02Icon,
  Search01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import type { ComponentProps } from "react";
import * as React from "react";
import { useConfig } from "@/hooks/use-config";
import { useIsMac } from "@/hooks/use-is-mac";
import type { source } from "@/lib/source";
import { useCopyToClipboard } from "@/registry/default/hooks/use-copy-to-clipboard";
import { Button } from "@/registry/default/ui/button";
import {
  Command,
  CommandCollection,
  CommandDialog,
  CommandDialogPopup,
  CommandDialogTrigger,
  CommandEmpty,
  CommandFooter,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/registry/default/ui/command";
import { Kbd, KbdGroup } from "@/registry/default/ui/kbd";

interface PageItem {
  value: string;
  label: string;
  url: string;
  isComponent: boolean;
  keywords?: string[];
}

interface PageGroup {
  value: string;
  items: PageItem[];
}

export function CommandMenu({
  tree,
  navItems,
  ...props
}: ComponentProps<typeof CommandDialog> & {
  tree: typeof source.pageTree;
  navItems?: { href: string; label: string }[];
}) {
  const isMac = useIsMac();
  const [config] = useConfig();
  const { copyToClipboard } = useCopyToClipboard();
  const [open, setOpen] = React.useState(false);
  const [selectedType, setSelectedType] = React.useState<
    "page" | "component" | null
  >(null);
  const [copyPayload, setCopyPayload] = React.useState("");
  const packageManager = config.packageManager || "pnpm";

  // Convert tree structure to grouped items
  const groupedItems = React.useMemo<PageGroup[]>(() => {
    const groups: PageGroup[] = [];

    // Add nav items group
    if (navItems && navItems.length > 0) {
      groups.push({
        items: navItems.map((item) => ({
          isComponent: false,
          keywords: ["nav", "navigation", item.label.toLowerCase()],
          label: item.label,
          url: item.href,
          value: `Navigation ${item.label}`,
        })),
        value: "Pages",
      });
    }

    // Add tree groups
    tree.children.forEach((group) => {
      if (group.type === "folder") {
        const items: PageItem[] = [];
        group.children.forEach((item) => {
          if (item.type === "page") {
            const isComponent = item.url.includes("/components/");
            const itemName = item.name?.toString() || "";
            items.push({
              isComponent,
              keywords: isComponent ? ["component"] : undefined,
              label: itemName,
              url: item.url,
              value: itemName ? `${group.name} ${itemName}` : "",
            });
          }
        });
        if (items.length > 0) {
          groups.push({
            items,
            value:
              typeof group.name === "string" ? group.name : String(group.name),
          });
        }
      }
    });

    return groups;
  }, [tree, navItems]);

  const handlePageHighlight = React.useCallback(
    (item: PageItem) => {
      if (item.isComponent) {
        const componentName = item.url.split("/").pop();
        setSelectedType("component");
        const registryItem = `@coss/${componentName}`;
        let cmd: string;
        switch (packageManager) {
          case "pnpm":
            cmd = `pnpm dlx shadcn@latest add ${registryItem}`;
            break;
          case "bun":
            cmd = `bunx --bun shadcn@latest add ${registryItem}`;
            break;
          case "yarn":
            cmd = `yarn dlx shadcn@latest add ${registryItem}`;
            break;
          default:
            cmd = `npx shadcn@latest add ${registryItem}`;
        }

        setCopyPayload(cmd);
      } else {
        setSelectedType("page");
        setCopyPayload("");
      }
    },
    [packageManager],
  );

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((open) => !open);
      }

      if (e.key === "c" && (e.metaKey || e.ctrlKey)) {
        if (selectedType === "page" || selectedType === "component") {
          copyToClipboard(copyPayload);
        }
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [copyPayload, selectedType, copyToClipboard]);

  return (
    <CommandDialog onOpenChange={setOpen} open={open} {...props}>
      <CommandDialogTrigger render={<Button variant="outline" />}>
        <HugeiconsIcon icon={Search01Icon} strokeWidth={2} />
        <KbdGroup className="gap-1">
          <Kbd>{isMac ? "⌘" : "Ctrl"}</Kbd>
          <Kbd className="aspect-square">K</Kbd>
        </KbdGroup>
      </CommandDialogTrigger>
      <CommandDialogPopup>
        <Command
          items={groupedItems}
          onItemHighlighted={(highlightedValue) => {
            const item = highlightedValue as PageItem | null;
            if (item) {
              handlePageHighlight(item);
            }
          }}
        >
          <CommandInput placeholder="Search documentation…" />
          <CommandPanel>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandList>
              {(group: PageGroup, _index: number) => (
                <CommandGroup items={group.items} key={group.value}>
                  <CommandGroupLabel>{group.value}</CommandGroupLabel>
                  <CommandCollection>
                    {(item: PageItem) => (
                      <CommandItem
                        className="flex w-full items-center"
                        key={item.value}
                        render={
                          <Link
                            href={item.url}
                            onNavigate={() => setOpen(false)}
                          />
                        }
                      >
                        <HugeiconsIcon
                          className="mr-2 h-4 w-4 opacity-80"
                          icon={item.isComponent ? Atom01Icon : BookOpen02Icon}
                          strokeWidth={2}
                        />
                        <span className="flex-1">{item.label}</span>
                      </CommandItem>
                    )}
                  </CommandCollection>
                </CommandGroup>
              )}
            </CommandList>
          </CommandPanel>
          <CommandFooter>
            <div className="flex items-center gap-2">
              <span className="whitespace-nowrap">Go to Page</span>
              <Kbd>
                <HugeiconsIcon icon={ArrowTurnBackwardIcon} strokeWidth={2} />
              </Kbd>
            </div>
            {copyPayload && (
              <div className="flex min-w-0 items-center gap-2">
                <span className="truncate font-mono">{copyPayload}</span>
                <KbdGroup>
                  <Kbd>{isMac ? "⌘" : "Ctrl"}</Kbd>
                  <Kbd>C</Kbd>
                </KbdGroup>
              </div>
            )}
          </CommandFooter>
        </Command>
      </CommandDialogPopup>
    </CommandDialog>
  );
}
