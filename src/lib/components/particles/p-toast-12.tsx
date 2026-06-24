"use client";

import { SaveIcon } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/registry/default/ui/button";
import { anchoredToastManager } from "@/registry/default/ui/toast";
import {
  Tooltip,
  TooltipPopup,
  TooltipTrigger,
} from "@/registry/default/ui/tooltip";

const ANCHORED_SAVE_TOAST_ID = "coss-demo-anchored-save-toast";

export default function Particle() {
  const saveButtonRef = useRef<HTMLButtonElement>(null);
  const toastTimeout = 2000;

  function handleSave() {
    if (!saveButtonRef.current) return;
    anchoredToastManager.add({
      data: {
        tooltipStyle: true,
      },
      id: ANCHORED_SAVE_TOAST_ID,
      positionerProps: {
        anchor: saveButtonRef.current,
        sideOffset: 6,
      },
      timeout: toastTimeout,
      title: "Draft saved",
    });
  }

  return (
    <Tooltip>
      <TooltipTrigger
        delay={0}
        render={
          <Button
            aria-label="Save"
            onClick={handleSave}
            ref={saveButtonRef}
            size="icon"
            variant="outline"
          />
        }
      >
        <SaveIcon aria-hidden="true" />
      </TooltipTrigger>
      <TooltipPopup>
        <p>Save</p>
      </TooltipPopup>
    </Tooltip>
  );
}
