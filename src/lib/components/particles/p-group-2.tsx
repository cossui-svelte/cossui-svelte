"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useRef } from "react";
import { useCopyToClipboard } from "@/registry/default/hooks/use-copy-to-clipboard";
import { Button } from "@/registry/default/ui/button";
import { Group, GroupSeparator } from "@/registry/default/ui/group";
import { Input } from "@/registry/default/ui/input";
import {
  Tooltip,
  TooltipPopup,
  TooltipTrigger,
} from "@/registry/default/ui/tooltip";

export default function Particle() {
  const { copyToClipboard, isCopied } = useCopyToClipboard();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Group aria-label="Url input">
      <Input
        aria-label="Url"
        defaultValue="https://coss.com"
        ref={inputRef}
        type="text"
      />
      <GroupSeparator />
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              aria-label="Copy"
              onClick={() => {
                if (inputRef.current) {
                  copyToClipboard(inputRef.current.value);
                }
              }}
              size="icon"
              variant="outline"
            />
          }
        >
          {isCopied ? <CheckIcon /> : <CopyIcon />}
        </TooltipTrigger>
        <TooltipPopup>
          <p>Copy to clipboard</p>
        </TooltipPopup>
      </Tooltip>
    </Group>
  );
}
