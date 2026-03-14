"use client";

import { useCopyToClipboard } from "@coss/ui/hooks/use-copy-to-clipboard";
import {
  ComputerTerminal02Icon,
  Copy01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import * as React from "react";

import { useConfig } from "@/hooks/use-config";
import { Button } from "@/registry/default/ui/button";
import { ScrollArea } from "@/registry/default/ui/scroll-area";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/default/ui/tabs";
import {
  Tooltip,
  TooltipPopup,
  TooltipTrigger,
} from "@/registry/default/ui/tooltip";

export function CodeBlockCommand({
  __npm__,
  __yarn__,
  __pnpm__,
  __bun__,
}: React.ComponentProps<"pre"> & {
  __npm__?: string;
  __yarn__?: string;
  __pnpm__?: string;
  __bun__?: string;
}) {
  const [config, setConfig] = useConfig();
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  const packageManager = config.packageManager || "pnpm";
  const tabs = React.useMemo(() => {
    return {
      bun: __bun__,
      npm: __npm__,
      pnpm: __pnpm__,
      yarn: __yarn__,
    };
  }, [__npm__, __pnpm__, __yarn__, __bun__]);

  const copyCommand = React.useCallback(() => {
    const command = tabs[packageManager];

    if (!command) {
      return;
    }

    copyToClipboard(command);
  }, [packageManager, tabs, copyToClipboard]);

  return (
    <div>
      <Tabs
        className="gap-0"
        onValueChange={(value) => {
          setConfig({
            ...config,
            packageManager: value as "pnpm" | "npm" | "yarn" | "bun",
          });
        }}
        value={packageManager}
      >
        <div className="flex items-center gap-2 border-border/64 border-b px-4 py-1 font-mono">
          <HugeiconsIcon
            className="size-5 text-code-foreground sm:size-4"
            icon={ComputerTerminal02Icon}
            strokeWidth={2}
          />
          <TabsList className="bg-transparent p-0 *:data-[slot=tab-indicator]:rounded-lg *:data-[slot=tab-indicator]:bg-accent *:data-[slot=tab-indicator]:shadow-none">
            {Object.entries(tabs).map(([key]) => {
              return (
                <TabsTab className="rounded-lg" key={key} value={key}>
                  {key}
                </TabsTab>
              );
            })}
          </TabsList>
        </div>
        <ScrollArea className="**:data-[slot=scroll-area-scrollbar]:data-[orientation=horizontal]:mx-2 **:data-[slot=scroll-area-scrollbar]:data-[orientation=vertical]:my-2">
          {Object.entries(tabs).map(([key, value]) => {
            return (
              <TabsPanel
                className="mt-0 w-max px-4 py-3.5"
                key={key}
                value={key}
              >
                <pre>
                  <code
                    className="relative font-mono text-[.8125rem] leading-none"
                    data-language="bash"
                  >
                    {value}
                  </code>
                </pre>
              </TabsPanel>
            );
          })}
        </ScrollArea>
      </Tabs>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              className="absolute top-1.5 right-1.5 z-3 size-9 opacity-70 hover:opacity-100 focus-visible:opacity-100 sm:size-8"
              data-slot="copy-button"
              onClick={copyCommand}
              size="icon"
              variant="ghost"
            >
              <span className="sr-only">Copy</span>
              {isCopied ? (
                <HugeiconsIcon icon={Tick02Icon} strokeWidth={2} />
              ) : (
                <HugeiconsIcon icon={Copy01Icon} strokeWidth={2} />
              )}
            </Button>
          }
        />
        <TooltipPopup>{isCopied ? "Copied" : "Copy to Clipboard"}</TooltipPopup>
      </Tooltip>
    </div>
  );
}
