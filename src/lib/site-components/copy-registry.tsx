"use client";

import { useCopyToClipboard } from "@coss/ui/hooks/use-copy-to-clipboard";
import { Icons } from "@coss/ui/shared/icons";
import { Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/registry/default/ui/button";
import {
  Tooltip,
  TooltipPopup,
  TooltipTrigger,
} from "@/registry/default/ui/tooltip";

export function CopyRegistry({
  value,
  className,
  variant = "ghost",
  ...props
}: React.ComponentProps<typeof Button> & {
  value: string;
  src?: string;
}) {
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            className={cn(className)}
            data-slot="copy-button"
            onClick={() => copyToClipboard(value)}
            size="icon-sm"
            variant={variant}
            {...props}
          >
            <span className="sr-only">Copy</span>
            {isCopied ? (
              <HugeiconsIcon
                className="size-3.5"
                icon={Tick02Icon}
                strokeWidth={2}
              />
            ) : (
              <Icons.mcp />
            )}
          </Button>
        }
      />
      <TooltipPopup>{isCopied ? "Copied" : "Copy Registry URL"}</TooltipPopup>
    </Tooltip>
  );
}
