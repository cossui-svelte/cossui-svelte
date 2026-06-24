"use client";

import { ImageIcon, PaperclipIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupTextarea,
} from "@/registry/default/ui/input-group";
import {
  Tooltip,
  TooltipPopup,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/default/ui/tooltip";

export default function Particle() {
  return (
    <InputGroup>
      <InputGroupTextarea placeholder="Compose your message…" rows={4} />
      <InputGroupAddon align="block-end" className="justify-between">
        <TooltipProvider>
          <div className="flex gap-1">
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    aria-label="Attach file"
                    size="icon-sm"
                    variant="ghost"
                  />
                }
              >
                <PaperclipIcon />
              </TooltipTrigger>
              <TooltipPopup>Attach file</TooltipPopup>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    aria-label="Insert image"
                    size="icon-sm"
                    variant="ghost"
                  />
                }
              >
                <ImageIcon />
              </TooltipTrigger>
              <TooltipPopup>Insert image</TooltipPopup>
            </Tooltip>
          </div>
        </TooltipProvider>
        <Button size="sm">Send</Button>
      </InputGroupAddon>
    </InputGroup>
  );
}
