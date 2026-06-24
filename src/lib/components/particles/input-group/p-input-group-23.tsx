"use client";

import { LoaderCircleIcon, MicIcon, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
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
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (inputValue) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
    setIsLoading(false);
  }, [inputValue]);

  return (
    <InputGroup>
      <InputGroupAddon>
        {isLoading ? (
          <LoaderCircleIcon
            aria-label="Loading..."
            className="animate-spin"
            role="status"
          />
        ) : (
          <SearchIcon aria-hidden="true" />
        )}
      </InputGroupAddon>
      <InputGroupInput
        aria-label="Search"
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search..."
        type="search"
        value={inputValue}
      />
      <InputGroupAddon align="inline-end">
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                aria-label="Voice search"
                size="icon-xs"
                variant="ghost"
              />
            }
          >
            <MicIcon aria-hidden="true" />
          </TooltipTrigger>
          <TooltipPopup>Voice search</TooltipPopup>
        </Tooltip>
      </InputGroupAddon>
    </InputGroup>
  );
}
