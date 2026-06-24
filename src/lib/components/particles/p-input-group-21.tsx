"use client";

import { InfoIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/default/ui/input-group";
import {
  Tooltip,
  TooltipPopup,
  TooltipTrigger,
} from "@/registry/default/ui/tooltip";

export default function Particle() {
  return (
    <InputGroup>
      <InputGroupAddon>
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                aria-label="More information"
                size="icon-xs"
                variant="ghost"
              />
            }
          >
            <InfoIcon />
          </TooltipTrigger>
          <TooltipPopup>Enter your username</TooltipPopup>
        </Tooltip>
      </InputGroupAddon>
      <InputGroupInput
        aria-label="Username"
        placeholder="Username"
        type="text"
      />
    </InputGroup>
  );
}
